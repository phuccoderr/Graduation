import { useId, useState, type CSSProperties } from "react";
type Props = {
  className?: string;
  size?: number | string;
};

const GraduationCap = ({ className, size = "22rem" }: Props) => {
  const gradientId = useId();
  const [strong, setStrong] = useState(false);

  const kick = () => {
    setStrong(true);
    setTimeout(() => setStrong(false), 2600);
  };
  return (
    <>
      <style>{`
        @keyframes tassel-swing {
          0%, 100% { transform: rotate(calc(var(--amp) * -3)); }
          50%      { transform: rotate(var(--amp)); }
        }
        @keyframes tassel-lag {
          0%, 100% { transform: rotate(calc(var(--amp) * 0.6)); }
          50%      { transform: rotate(calc(var(--amp) * -0.6)); }
        }
        @keyframes cap-bob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-6px) rotate(0deg); }
        }
        .tassel-top  { transform-origin: 232px 128px; animation: tassel-swing var(--dur) ease-in-out infinite; }
        .tassel-tail { transform-origin: 232px 196px; animation: tassel-lag   var(--dur) ease-in-out infinite; }
        .cap-bob     { animation: cap-bob 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .tassel-top, .tassel-tail, .cap-bob { animation: none; }
        }
      `}</style>

      <button
        onClick={kick}
        aria-label="Lắc dây tua nón tốt nghiệp"
        className={`absolute -right-8 -top-8 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#e8b84a] ${className ?? ""}`}
      >
        <svg
          viewBox="0 0 320 300"
          className="cap-bob block max-w-full drop-shadow-2xl"
          style={
            {
              width: size,
              height: "auto",
              "--amp": strong ? "18deg" : "7deg",
              "--dur": strong ? "0.9s" : "2.4s",
            } as CSSProperties
          }
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="160"
              y1="44"
              x2="160"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#0F4265" />
              <stop offset="50%" stopColor="#1A5C8A" />
              <stop offset="100%" stopColor="#2B7CB1" />
            </linearGradient>
          </defs>

          <g transform="translate(160 102) rotate(6) scale(.7 1) translate(-160 -102)">
            {/* Phần mũ (thân tròn dưới mặt phẳng) */}
            {/* <path d="M84 128 v52 c0 26 152 26 152 0 v-52 z" fill="#16161d" />
          <path
            d="M84 152 c0 26 152 26 152 0"
            fill="none"
            stroke="#000"
            strokeOpacity=".35"
            strokeWidth="6"
          /> */}

            {/* Mặt phẳng mũ (mortarboard) */}
            <polygon
              points="160,44 306,102 160,160 14,102"
              fill={`url(#${gradientId})`}
            />
            <polygon
              points="160,44 306,102 160,160 14,102"
              fill="none"
              stroke="rgb(201 169 97 / 80%)"
              strokeWidth="2"
            />
            <polygon
              points="160,52 288,102 160,152 32,102"
              fill="#0F4265"
              opacity=".18"
            />

            {/* Dây tua nối từ nút giữa ra cạnh phải */}
            <path
              d="M160 102 Q206 104 232 128"
              fill="none"
              stroke="#e8b84a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Nút giữa */}
            <circle cx="160" cy="102" r="7" fill="#e8b84a" />
            <circle cx="158" cy="100" r="2.5" fill="#fff4cf" />

            {/* Tua: đoạn dây trên đung đưa theo con lắc */}
            <g className="tassel-top">
              <line
                x1="232"
                y1="128"
                x2="232"
                y2="196"
                stroke="#e8b84a"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="232" cy="128" r="4" fill="#c99a2e" />

              {/* Phần tua phía dưới lắc trễ pha để tạo cảm giác mềm */}
              <g className="tassel-tail">
                <rect
                  x="226"
                  y="192"
                  width="12"
                  height="14"
                  rx="3"
                  fill="#c99a2e"
                />
                <g stroke="#e8b84a" strokeWidth="2.6" strokeLinecap="round">
                  <line x1="226" y1="206" x2="222" y2="252" />
                  <line x1="229" y1="206" x2="227" y2="256" />
                  <line x1="232" y1="206" x2="232" y2="258" />
                  <line x1="235" y1="206" x2="237" y2="256" />
                  <line x1="238" y1="206" x2="242" y2="252" />
                </g>
                <rect
                  x="221"
                  y="226"
                  width="22"
                  height="4"
                  rx="2"
                  fill="#c99a2e"
                />
              </g>
            </g>
          </g>
        </svg>
      </button>
    </>
  );
};

export default GraduationCap;
