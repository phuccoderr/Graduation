import { useRef, useState } from "react";
import BorderBackground from "./components/border-background";
import FooterYear from "./components/footer-year";
import TextType from "./components/TextType";
import GraduationCap from "./components/ui/graduation-cap";
import AvatarWebp from "@/assets/NgocPhung.webp";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./components/animate-ui/components/radix/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./components/ui/input-group";
import { PartyPopper } from "./components/animate-ui/icons/party-popper";
import { StarsBackground } from "./components/animate-ui/components/backgrounds/stars";
import FadeContent from "./components/FadeContent";
import Scroll from "./components/scroll";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import music from "./assets/music-main.mp3";
import { CirclePlay } from "lucide-react";
import wibu from "./assets/wibu.gif";
import { motion } from "motion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WishListExport from "./components/wish-list-export";

function InvitationApp() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [openLetter, setOpenLetter] = useState(false);

  const handleOpenLetter = () => {
    if (name.trim() === "") {
      toast.info("Vui lòng nhập tên của bạn trước khi mở thiệp 🥰.", {
        style: {
          backgroundColor: "#e0f2fe", // Màu nền xanh trời nhạt (sky-100)
          color: "#0369a1", // Màu chữ xanh trời đậm (sky-700)
          border: "1px solid #7dd3fc", // Viền xanh trời (sky-300)
        },
      });
      setOpen(true);
      return;
    }
    setOpenLetter(true);
    toggleMusic();
  };

  // Music
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Quy đổi thời gian sang giây:
  // 2 phút 4 giây = (2 * 60) + 4 = 124 giây
  // 3 phút 36 giây = (3 * 60) + 36 = 216 giây
  const START_TIME = 124;
  const END_TIME = 216;

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    // Nếu chạy quá thời điểm kết thúc, tự động tua ngược lại điểm bắt đầu để lặp lại
    if (audioRef.current.currentTime >= END_TIME) {
      audioRef.current.currentTime = START_TIME;
      audioRef.current.play();
    }
  };
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Nếu vị trí hiện tại chưa nằm trong đoạn cần phát, đưa về điểm bắt đầu
      if (
        audioRef.current.currentTime < START_TIME ||
        audioRef.current.currentTime >= END_TIME
      ) {
        audioRef.current.currentTime = START_TIME;
      }
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Lỗi phát nhạc:", error);
        });
    }
  };

  // const bg_green = useRef(
  //   "bg-[image:linear-gradient(180deg,#22473E_0%,#1E3E36_18%,#13312D_32%,#13312D_100%)]",
  // );
  return (
    <>
      <StarsBackground
        starColor={openLetter ? "#39a9e8" : "#fff"}
        className={`min-h-screen relative bg-linear-to-b from-[#0F4265] via-[#1A5C8A] to-[#2B7CB1]`}
      >
        {!openLetter && (
          <div className="h-full w-full flex justify-center">
            <BorderBackground />
            <FooterYear />
            <main className="mx-auto my-12 flex flex-col gap-2 items-center">
              <div className="flex items-center gap-4">
                <p className="text-[#8bdcff]">Thiệp mời tốt nghiệp</p>
                <p className="w-12 h-px bg-[#8bdcff]/38"></p>
                <p className="text-white/70">2026</p>
              </div>
              <div className="h-56 relative w-57 flex items-center justify-center">
                {/* Khung Border chứa hình ảnh bên trong */}
                <div
                  className="absolute right-4 left-4
    border border-[#8bdcff]/38 pointer-events-none rounded-t-full h-full overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={AvatarWebp}
                    alt="Ngọc Phụng trong ảnh tốt nghiệp"
                    width={228}
                    height={224}
                    fetchPriority="high"
                    className="w-full h-full object-cover rounded-t-full p-2 pb-0"
                  />
                </div>

                {/* Nón nằm bên tay phải */}
                <GraduationCap size={"12rem"} />
              </div>

              <div className="flex flex-col gap-3 items-center">
                <h1 className="text-2xl text-[#8bdcff] font-bold">
                  Ngọc Phụng
                </h1>
                <p className="text-sm text-[rgb(240_250_255/0.86)]">
                  ĐẠI HỌC CẦN THƠ
                </p>
                <p className="text-sm text-[rgb(240_250_255/_0.66)]">
                  T6 · 06.11.2026 · 14:00
                </p>
              </div>
              <p className="w-[80%] h-[0.5px] bg-[#8bdcff]/38 mx-auto"></p>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[rgb(240_250_255/_0.66)]">
                  Trân trọng kính mời
                </p>
                <TextType
                  className="text-xl text-[#8bdcff] font-bold"
                  text={[name]}
                />
                <div className="w-80 sm:w-96 flex-wrap">
                  <p className="text-white/70 text-sm italic text-center">
                    Sự hiện diện của bạn là món quà lớn nhất để cùng mình khép
                    lại quãng đời sinh viên rực rỡ và mở ra một chương mới thật
                    đáng nhớ.
                  </p>
                </div>
              </div>
              <p className="w-[80%] h-[0.5px] bg-[#8bdcff]/38 mx-auto"></p>
              <Button
                type="button"
                size="lg"
                className="px-24 py-6 bg-(image:--gradient-cyan-orange) text-[#0c3450] rounded-full cursor-pointer z-10"
                onClick={() => handleOpenLetter()}
              >
                Chạm để mở thiệp
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                  className={"bg-[#87592129] border border-[#8bdcff]"}
                  showCloseButton={false}
                >
                  <DialogTitle className="text-white">
                    Tên người nhận
                  </DialogTitle>
                  <DialogDescription className="text-white/75">
                    Nhập tên để cá nhân hóa lời mời.
                  </DialogDescription>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setOpen(false);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <label htmlFor="guest-name" className="text-sm text-white">
                      Tên của bạn
                    </label>
                    <InputGroup className="border border-[#8bdcff]/38">
                      <InputGroupInput
                        id="guest-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        className="placeholder:text-[#8bdcff]/60 text-white"
                        placeholder="Ví dụ: Minh Anh"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <InputGroupAddon
                        className="text-[#8bdcff]"
                        aria-hidden="true"
                      >
                        <PartyPopper loop loopDelay={1000} animate />
                      </InputGroupAddon>
                    </InputGroup>
                    <Button
                      type="submit"
                      className="bg-(image:--gradient-cyan-orange) text-[#0c3450] rounded-full"
                    >
                      Lưu
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </main>
          </div>
        )}
        {openLetter && (
          <FadeContent
            duration={1000}
            ease="ease-out"
            initialOpacity={0}
            className={`w-full h-full flex flex-col items-center overflow-auto`}
          >
            <Scroll name={name} />
          </FadeContent>
        )}
        <audio
          ref={audioRef}
          src={music}
          loop
          onTimeUpdate={handleTimeUpdate}
        />
        {openLetter && (
          <motion.div
            initial={{ x: 60 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.25, ease: "easeOut" }}
            className="fixed bottom-6 right-6" // ← đưa fixed ra đây
          >
            <Button
              onClick={toggleMusic}
              className="w-12 h-12 bg-white border border-[#39a9e8] text-[#39a9e8] rounded-full hover:bg-white overflow-hidden"
            >
              {isPlaying ? (
                /* Icon Tạm dừng (Pause) */
                <img
                  src={wibu}
                  alt="Playing GIF"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Icon Phát nhạc (Play) */
                <CirclePlay strokeWidth={1.5} />
              )}
            </Button>
          </motion.div>
        )}
      </StarsBackground>

      <Toaster position="top-center" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/list" element={<WishListExport />} />
        <Route path="/*" element={<InvitationApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
