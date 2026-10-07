import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Download, Heart, RefreshCw, Search } from "lucide-react";
import type { Wish } from "../apis/wishes.api";
import "./wish-list-export.css";

const PAGE_SIZE = 1000;
const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabaseClient =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const vietnamDateFormatter = new Intl.DateTimeFormat("vi-VN", {
  timeZone: VIETNAM_TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function formatVietnamDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Thời gian không hợp lệ"
    : vietnamDateFormatter.format(date);
}

function escapeCsv(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

async function fetchAllWishes(): Promise<Wish[]> {
  if (!supabaseClient) {
    throw new Error(
      "Thiếu cấu hình VITE_SUPABASE_URL hoặc VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  const allWishes: Wish[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabaseClient
      .from("wishes")
      .select("id, name, note, created_at")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      throw error;
    }

    const page = (data ?? []) as Wish[];
    allWishes.push(...page);

    if (page.length < PAGE_SIZE) {
      break;
    }

    from += PAGE_SIZE;
  }

  return allWishes;
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Không thể tải danh sách Wish. Vui lòng thử lại.";
}

function exportWishes(wishes: Wish[]) {
  const rows = [
    ["ID", "Tên", "Lời chúc", "Thời gian (giờ Việt Nam, GMT+7)"],
    ...wishes.map((wish) => [
      wish.id,
      wish.name,
      wish.note,
      formatVietnamDate(wish.created_at),
    ]),
  ];
  const csv = `\uFEFF${rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n")}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: VIETNAM_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  link.href = url;
  link.download = `danh-sach-wish-${today}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function WishListExport() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadWishes = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      setWishes(await fetchAllWishes());
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchWishes = async () => {
      try {
        const allWishes = await fetchAllWishes();
        if (isMounted) setWishes(allWishes);
      } catch (error) {
        if (isMounted) setErrorMessage(getErrorMessage(error));
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void fetchWishes();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredWishes = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("vi");
    if (!keyword) return wishes;

    return wishes.filter(
      ({ name, note }) =>
        name.toLocaleLowerCase("vi").includes(keyword) ||
        note.toLocaleLowerCase("vi").includes(keyword),
    );
  }, [search, wishes]);

  return (
    <main className="wish-export">
      <div className="wish-export__glow wish-export__glow--top" />
      <div className="wish-export__glow wish-export__glow--bottom" />

      <section className="wish-export__shell" aria-labelledby="wish-title">
        <header className="wish-export__header">
          <div className="wish-export__heading">
            <span className="wish-export__eyebrow">
              <Heart size={14} aria-hidden="true" />
              Những lời thương gửi lại
            </span>
            <h1 id="wish-title">Danh sách lời chúc</h1>
            <p className="wish-export__description">
              Tất cả những lời chúc đáng nhớ, được lưu giữ tại đây.
            </p>
          </div>

          <div className="wish-export__actions">
            <button
              className="wish-export__button wish-export__button--secondary"
              type="button"
              onClick={() => void loadWishes()}
              disabled={isLoading}
            >
              <RefreshCw
                size={16}
                className={isLoading ? "wish-export__spin" : undefined}
                aria-hidden="true"
              />
              <span>Làm mới</span>
            </button>
            <button
              className="wish-export__button wish-export__button--primary"
              type="button"
              onClick={() => exportWishes(wishes)}
              disabled={isLoading || wishes.length === 0}
            >
              <Download size={17} aria-hidden="true" />
              <span>Xuất CSV</span>
            </button>
          </div>
        </header>

        <div className="wish-export__summary">
          <div className="wish-export__count">
            <span className="wish-export__count-icon">
              <Heart size={17} aria-hidden="true" />
            </span>
            <span>
              <strong>{isLoading ? "…" : wishes.length}</strong>
              <span className="wish-export__count-label">lời chúc</span>
            </span>
          </div>
          <label className="wish-export__search">
            <Search size={17} aria-hidden="true" />
            <span className="wish-export__visually-hidden">
              Tìm theo tên hoặc lời chúc
            </span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên hoặc lời chúc..."
            />
          </label>
        </div>

        <div className="wish-export__content" aria-live="polite">
          {isLoading ? (
            <div className="wish-export__state">
              <span className="wish-export__loader" aria-hidden="true" />
              <p>Đang gom những lời chúc...</p>
            </div>
          ) : errorMessage ? (
            <div className="wish-export__state wish-export__state--error">
              <p>Không thể tải danh sách Wish</p>
              <span>{errorMessage}</span>
              <button
                className="wish-export__button wish-export__button--secondary"
                type="button"
                onClick={() => void loadWishes()}
              >
                <RefreshCw size={16} aria-hidden="true" />
                Thử lại
              </button>
            </div>
          ) : filteredWishes.length === 0 ? (
            <div className="wish-export__state">
              <span className="wish-export__empty-icon">
                <Heart size={22} aria-hidden="true" />
              </span>
              <p>
                {wishes.length === 0
                  ? "Chưa có lời chúc nào."
                  : "Không tìm thấy lời chúc phù hợp."}
              </p>
              {search && <span>Thử tìm bằng tên hoặc nội dung khác nhé.</span>}
            </div>
          ) : (
            <>
              <div className="wish-export__table-wrap">
                <table className="wish-export__table">
                  <thead>
                    <tr>
                      <th scope="col">Người gửi</th>
                      <th scope="col">Lời chúc</th>
                      <th scope="col">Thời gian (GMT+7)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWishes.map((wish) => (
                      <tr key={wish.id}>
                        <td>
                          <span className="wish-export__name">
                            {wish.name || "Ẩn danh"}
                          </span>
                        </td>
                        <td className="wish-export__note">{wish.note}</td>
                        <td className="wish-export__date">
                          {formatVietnamDate(wish.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="wish-export__cards">
                {filteredWishes.map((wish) => (
                  <article className="wish-export__card" key={wish.id}>
                    <div className="wish-export__card-top">
                      <h2>{wish.name || "Ẩn danh"}</h2>
                      <span>#{wish.id}</span>
                    </div>
                    <p>{wish.note}</p>
                    <time dateTime={wish.created_at}>
                      {formatVietnamDate(wish.created_at)}
                    </time>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>

        {!isLoading && !errorMessage && filteredWishes.length > 0 && (
          <footer className="wish-export__footer">
            Đang hiển thị {filteredWishes.length}
            {search ? ` / ${wishes.length}` : ""} lời chúc
            <span> · Giờ Việt Nam (GMT+7)</span>
          </footer>
        )}
      </section>
    </main>
  );
}
