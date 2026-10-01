import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import NgocPhung2Jpg from "@/assets/NgocPhung2.jpg";
import GradientText from "./GradientText";

const SlideOne = ({ canAnimate }: { canAnimate: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <motion.figure
      className="bg-white -rotate-2 relative"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={
        canAnimate ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }
      }
      transition={{ duration: 0.4 }}
    >
      <motion.span
        className="absolute w-12.5 h-5 bg-[#ffffffb3] -top-2.5 -right-2 rotate-36 shadow-lg"
        initial={{ y: -30, opacity: 0, scale: 0.8 }}
        animate={
          canAnimate
            ? { y: 0, opacity: 1, scale: 1 }
            : { y: -30, opacity: 0, scale: 0.8 }
        }
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
      ></motion.span>
      <motion.span
        className="absolute w-12.5 h-5 bg-[#ffffffb3] -top-2.5 -left-2 -rotate-36 shadow-lg"
        initial={{ y: -30, opacity: 0, scale: 0.8 }}
        animate={
          canAnimate
            ? { y: 0, opacity: 1, scale: 1 }
            : { y: -30, opacity: 0, scale: 0.8 }
        }
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
      ></motion.span>
      <div className="m-2 w-50 h-50 bg-red-200 ">
        <motion.img
          src={NgocPhung2Jpg}
          className="object-cover object-[0%_5%] w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={
            canAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }
          }
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.figure>
    <motion.div
      className="bg-[#F5F0D5] flex gap-1.5 items-center rounded-[6px] py-2 px-4 z-10"
      initial={{ y: -60, opacity: 0 }}
      animate={canAnimate ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ duration: 1.25, ease: "easeOut" }}
    >
      <span className="inline-flex w-1.75 h-1.75 rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,#fff,#39a9e8_60%,color-mix(in_srgb,#39a9e8,#021b2c_62%))]"></span>
      <span className="text-[13px] text-[#0c3450]">Thân mời</span>
      <span className="text-[13px] text-[#39a9e8] font-bold">Hoàng Phúc</span>
    </motion.div>
    <motion.span
      className="uppercase text-xs font-bold font-quicksand tracking-[.16em] text-[color:color(srgb_0.0898039_0.31749_0.452706)]"
      initial={{ x: -60, opacity: 0 }}
      animate={canAnimate ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
      transition={{ duration: 1.25, ease: "easeOut" }}
    >
      Graduation Ceremony
    </motion.span>
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={canAnimate ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 1.25, ease: "easeOut" }}
    >
      <GradientText
        colors={["#0f2e42", "#39a9e8", "#fff", "#39a9e8", "#0f2e42"]}
        animationSpeed={2}
        showBorder={false}
        className="text-[44px] font-black! font-baloo"
        yoyo={false}
        direction="horizontal"
      >
        Lễ Tốt Nghiệp
      </GradientText>
    </motion.div>
    <span className="text-[#39a9e8] text-[40px] font-charm">Ngọc Phụng</span>

    <motion.div
      className="flex items-center justify-center gap-2 text-[rgba(16,58,82,.72)] text-[13px]"
      initial={{ x: 60, opacity: 0 }}
      animate={canAnimate ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
      transition={{ duration: 1.25, ease: "easeOut" }}
    >
      <span className="">Đại học Cần Thơ</span>
      <span className="w-1 h-1 rounded-full bg-[rgba(16,58,82,.72)]"></span>
      <span className="">Khóa 2022</span>
    </motion.div>
    <span className="text-[rgba(16,58,82,.72)] text-[18px] font-mali font-semibold">
      ngày 06 tháng 11 năm 2026
    </span>
  </div>
);

const SlideTwo = () => (
  <>
    <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", margin: 0 }}>Slide 2</h1>
    <p style={{ fontSize: "1.25rem", opacity: 0.85, marginTop: 12 }}>
      Smooth transitions with Motion
    </p>
  </>
);

const SlideThree = () => (
  <>
    <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", margin: 0 }}>Slide 3</h1>
    <p style={{ fontSize: "1.25rem", opacity: 0.85, marginTop: 12 }}>
      Inspired by GSAP Observer
    </p>
  </>
);

const SlideFour = () => (
  <>
    <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", margin: 0 }}>Slide 4</h1>
    <p style={{ fontSize: "1.25rem", opacity: 0.85, marginTop: 12 }}>
      Works with wheel + touch
    </p>
  </>
);

interface SlideItem {
  id: number;
  bg: string;
  component: ReactNode;
}

const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 1, // Giữ opacity = 1 để tránh chớp trắng
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    opacity: 1, // Giữ opacity = 1 tránh lộ nền
  }),
};

export default function SwipeSlider({ isOpen }: { isOpen: boolean }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const isAnimating = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [canAnimate, setCanAnimate] = useState(false);

  const slides: SlideItem[] = [
    {
      id: 1,
      bg: `
      radial-gradient(at 83.94% 55.7%, hsla(198.57, 100%, 56.27%, 1) 0%, hsla(198.57, 100%, 56.27%, 0) 100%),
      radial-gradient(at 26.08% 93.01%, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 100%, 0) 100%),
      radial-gradient(at 72.91% 65.4%, hsla(198.57, 100%, 56.27%, 1) 0%, hsla(198.57, 100%, 56.27%, 0) 100%),
      radial-gradient(at 62.95% 80.93%, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 100%, 0) 100%),
      radial-gradient(at 21.96% 24.3%, hsla(198.57, 100%, 56.27%, 1) 0%, hsla(198.57, 100%, 56.27%, 0) 100%)
    `,
      component: <SlideOne canAnimate={canAnimate} />,
    },
    {
      id: 2,
      bg: "linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
      component: <SlideTwo />,
    },
    {
      id: 3,
      bg: "linear-gradient(135deg, #134e5e, #71b280)",
      component: <SlideThree />,
    },
    {
      id: 4,
      bg: "linear-gradient(135deg, #4b6cb7, #182848)",
      component: <SlideFour />,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      // Đợi FadeContent fade-in xong (ví dụ khớp với duration=1000 của FadeContent)
      const timer = setTimeout(() => {
        setCanAnimate(true);
      }, 300); // Điều chỉnh độ trễ này (ms) cho phù hợp với FadeContent của bạn
      return () => clearTimeout(timer);
    } else {
      setCanAnimate(false);
    }
  }, [isOpen]);

  const paginate = useCallback(
    (newDirection: number) => {
      if (isAnimating.current) return;

      const next = page + newDirection;
      if (next < 0 || next >= slides.length) return;

      isAnimating.current = true;
      setPage([next, newDirection]);
    },
    [page],
  );

  // Wheel (mouse / trackpad) - Chống tràn event và chặn bounce mặc định của trình duyệt
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      if (e.deltaY > 80) paginate(1);
      else if (e.deltaY < -80) paginate(-1);
    };

    const el = containerRef.current;
    el?.addEventListener("wheel", handleWheel, { passive: false });
    return () => el?.removeEventListener("wheel", handleWheel);
  }, [paginate]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        paginate(1);
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        paginate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paginate]);

  const currentSlide = slides[page];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        touchAction: "none",
        backgroundColor: "#fff", // Khóa màu nền container trùng với slide để lỡ có khoảng trống không bị lộ màu trắng
      }}
    >
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="sync" // Dùng sync để slide mới và cũ chạy song song, che lấp nhau hoàn hảo
        onExitComplete={() => {
          isAnimating.current = false;
        }}
      >
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "tween", duration: 0.8, ease: [0.25, 1, 0.5, 1] },
          }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            if (info.offset.y < -50) paginate(1);
            else if (info.offset.y > 50) paginate(-1);
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: currentSlide.bg,
            color: "white",
            userSelect: "none",
            cursor: "grab",
            willChange: "transform", // Tối ưu GPU rendering giúp chuyển động mượt hơn, hết rung
          }}
        >
          {currentSlide.component}
          {/* Indicator dots */}
          <div
            style={{
              position: "absolute",
              right: 24,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              zIndex: 10,
            }}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i === page || isAnimating.current) return;
                  isAnimating.current = true;
                  setPage([i, i > page ? 1 : -1]);
                }}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  border: "none",
                  background: i === page ? "white" : "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
