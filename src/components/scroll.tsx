import { motion, type Variants } from "motion/react";
import NgocPhung2Webp from "@/assets/NgocPhung2.webp";
import GradientText from "./GradientText";
import { Player } from "@lordicon/react";
import giftAnimation from "@/assets/wired-gradient-412-gift-morph-open.json";
import { useEffect, useRef, useState } from "react";
import { Send } from "./animate-ui/icons/send";
import { GraduationCap, MapPin, Notebook } from "lucide-react";
import Countdown from "./count-down";
import FreeMapCard from "./map";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Users } from "./animate-ui/icons/users";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createWishes } from "@/apis/wishes.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./animate-ui/components/radix/alert-dialog";

function TextDrop({ text }: { text: string }) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.04,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: -20, // Rơi từ trên xuống
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className="font-mali text-[21px]/[1.6] text-[#6b4708] font-semibold inline-block"
      variants={container}
      initial="hidden"
      whileInView="visible"
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
          {/* Thêm khoảng trắng giữa các từ */}
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </motion.span>
  );
}

const CalendarNovember2026 = () => {
  // Tháng 11/2026: 1/11 là Chủ nhật
  // Tuần bắt đầu từ Thứ 2 (T2)
  const daysOfWeek = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  // Lưới ngày: hàng đầu có 6 ô trống + ngày 1 (Chủ nhật)
  const calendarDays = [
    null,
    null,
    null,
    null,
    null,
    null,
    1, // Hàng 1
    2,
    3,
    4,
    5,
    6,
    7,
    8, // Hàng 2
    9,
    10,
    11,
    12,
    13,
    14,
    15, // Hàng 3
    16,
    17,
    18,
    19,
    20,
    21,
    22, // Hàng 4
    23,
    24,
    25,
    26,
    27,
    28,
    29, // Hàng 5
    30,
    null,
    null,
    null,
    null,
    null,
    null, // Hàng 6
  ];

  const highlightedDay = 6;

  return (
    <motion.div
      className="w-79.5 mx-auto"
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.25 }}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-[linear-gradient(135deg,#39a9e8,color-mix(in_srgb,#39a9e8,#021b2c_62%))]  text-white px-5 py-3.5 flex justify-between items-center h-10">
          <span className="font-semibold text-[16px]">Tháng 11</span>
          <span className="font-semibold text-[16px]">Năm 2026</span>
        </div>

        {/* Body */}
        <div className="p-3">
          {/* Days of week */}
          <div className="grid grid-cols-7">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-[11px] text-[color-mix(in_srgb,#39a9e8,#021b2c_62%)] font-black py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-y-1">
            {calendarDays.map((day, index) => (
              <div key={index} className="flex items-center justify-center ">
                {day !== null ? (
                  <div
                    className={`
                       flex items-center justify-center rounded-full
                      text-[11px] font-medium w-9.5 h-7
                      ${
                        day === highlightedDay
                          ? "bg-[#39a9e8]  text-white shadow-md"
                          : "text-[#0f2e42]"
                      }
                    `}
                  >
                    {day}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
type Props = {
  name: string;
};
const Scroll = ({ name }: Props) => {
  const [note, setNote] = useState({
    name: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleCreateWish = async () => {
    setLoading(true);
    try {
      await createWishes({
        name: note.name,
        note: note.message,
        created_at: new Date().toISOString(),
      });
      setNote({ name: "", message: "" });
      alert("Tạo lời chúc thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const playerRef = useRef<Player>(null);
  useEffect(() => {
    playerRef.current?.playFromBeginning();
  }, []);
  return (
    <>
      <div
        className="w-full py-12 flex flex-col items-center gap-2 z-10"
        style={{
          backgroundImage: `
              radial-gradient(at 83.94% 55.7%, hsla(198.57, 100%, 56.27%, 1) 0%, hsla(198.57, 100%, 56.27%, 0) 100%),
              radial-gradient(at 26.08% 93.01%, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 100%, 0) 100%),
              radial-gradient(at 72.91% 65.4%, hsla(198.57, 100%, 56.27%, 1) 0%, hsla(198.57, 100%, 56.27%, 0) 100%),
              radial-gradient(at 62.95% 80.93%, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 100%, 0) 100%),
              radial-gradient(at 21.96% 24.3%, hsla(198.57, 100%, 56.27%, 1) 0%, hsla(198.57, 100%, 56.27%, 0) 100%)
            `,
        }}
      >
        <motion.figure
          className="bg-white -rotate-2 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            className="absolute w-12.5 h-5 bg-[#ffffffb3] -top-2.5 -right-2 rotate-36 shadow-lg"
            initial={{ y: -30, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 1.25,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          ></motion.span>
          <motion.span
            className="absolute w-12.5 h-5 bg-[#ffffffb3] -top-2.5 -left-2 -rotate-36 shadow-lg"
            initial={{ y: -30, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 1.25,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          ></motion.span>
          <div className="m-2 w-50 h-50 bg-red-200 ">
            <motion.img
              src={NgocPhung2Webp}
              alt="Ngọc Phụng trong ảnh tốt nghiệp"
              width={200}
              height={200}
              className="object-cover object-[0%_5%] w-full h-full"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.25, ease: "easeOut" }}
            />
          </div>
        </motion.figure>
        <motion.div
          className="bg-[#F5F0D5] flex gap-1.5 items-center rounded-[6px] py-2 px-4"
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25, ease: "easeOut" }}
        >
          <span className="inline-flex w-1.75 h-1.75 rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,#fff,#39a9e8_60%,color-mix(in_srgb,#39a9e8,#021b2c_62%))]"></span>
          <span className="text-[13px] text-[#0c3450]">Thân mời</span>
          <span className="text-[13px] text-[#39a9e8] font-bold">{name}</span>
        </motion.div>
        <motion.span
          className="uppercase text-xs font-bold font-quicksand tracking-[.16em] text-[color(srgb_0.0898039_0.31749_0.452706)]"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.25, ease: "easeOut" }}
        >
          Graduation Ceremony
        </motion.span>
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
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
        <span className="text-[#39a9e8] text-[40px] font-charm">
          Ngọc Phụng
        </span>
        <motion.div
          className="flex items-center justify-center gap-2 text-[rgba(16,58,82,.72)] text-[13px]"
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
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

      <div className="flex flex-col items-center justify-center w-full bg-white p-6">
        <div className="max-w-120 py-8.5 px-7.5 flex flex-col items-center gap-3 bg-[linear-gradient(160deg,#fff2d8,#ffe4b0)] -rotate-3 text-center">
          <Player
            ref={playerRef}
            icon={giftAnimation}
            onComplete={() => {
              // Khi đang ở trong màn hình mà chạy xong 1 vòng -> tự động lặp tiếp
              playerRef.current?.playFromBeginning();
            }}
          />
          <TextDrop text="Tương lai rực rỡ, ngày mai đây hiền hòa. Cảm ơn bạn đã là một phần trong hành trình thanh xuân của mình." />
        </div>
      </div>
      {/* Section 3 */}
      <div className="flex flex-col items-center justify-center gap-5 w-full p-6 bg-[#ffffffec]">
        <motion.div
          className="py-2 pr-3.5 pl-4.5 text-[11px] flex justify-center items-center border border-[#39a9e8] border-dashed rounded-4xl"
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          <span className="inline-flex w-1.75 h-1.75 rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,#fff,#39a9e8_60%,color-mix(in_srgb,#39a9e8,#021b2c_62%))] mr-2"></span>
          <span className="text-[color(srgb_0.0898039_0.31749_0.452706)] font-quicksand tracking-[.16em] font-bold">
            VÉ LÊN ĐƯỜNG ƯỚC MƠ
          </span>
        </motion.div>
        <motion.span
          className="font-black! font-baloo text-[#0f2e42] text-[40px]"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          Lễ tốt nghiệp
        </motion.span>
        <motion.div
          className="flex flex-col shadow-2xl w-110 rounded-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.25 }}
        >
          <div className="flex flex-col gap-1 items-center justify-center py-5.5 px-4.5 ">
            <span className="font-quicksand font-bold tracking-[.14em] text-[11px] text-[color(srgb_0.0898039_0.31749_0.452706)]">
              KHỞI HÀNH LÚC
            </span>
            <span className="text-[42px] text-[#39a9e8] font-bold">16:30</span>
            <span className="text-[13px] text-[color(srgb_0.0898039_0.31749_0.452706)]">
              ngày 06 tháng 11 năm 2026
            </span>
            <div className="flex items-center gap-1 font-quicksand text-[11px] text-[#39a9e8]">
              <span>BẠN</span>
              <Send size={11} loop animate />
              <span>ƯỚC MƠ</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-center justify-center bg-[linear-gradient(160deg,#39a9e8,color-mix(in_srgb,#39a9e8,#021b2c_62%))] text-white text-[11px] p-3">
            <GraduationCap size={20} />
            <span>TỐT NGHIỆP</span>
            <span>06/11</span>
          </div>
        </motion.div>

        <motion.span
          className="tracking-[.12em] uppercase font-extrabold font-quicksand text-xs text-[color-mix(in_srgb,#39a9e8,#021b2c_62%)]"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          Cùng đếm ngược đến giờ cất cánh
        </motion.span>
        <Countdown
          targetDate="2026-11-06T16:30:00" // ← Đây là giờ Việt Nam
          onComplete={() => alert("Chúc mừng năm mới!")}
        />
        <CalendarNovember2026 />

        <motion.div
          className="p-4 flex items-start gap-3 border border-[#2a9fd633] rounded-[18px] min-w-95"
          initial={{ x: 90, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          <MapPin size={17} className="text-[#39a9e8] mt-0.5" />
          <div className="flex flex-col items-start">
            <span className="text-[color-mix(in_srgb,#39a9e8,#021b2c_62%)] font-black text-[15px]/[1.4]">
              Hội trường rùa
            </span>
            <span className="mt-1 text-[rgba(16,58,82,.72)] text-[13px]/[1.55]">
              Đường 3/2, Ninh Kiều, Cần Thơ
            </span>
          </div>
        </motion.div>
      </div>

      {/* Section 4 */}
      {/* <div
        className={` flex flex-col justify-center items-center gap-5 w-full py-14 px-5 bg-gradient-to-b from-white to-[rgb(234,248,255)]`}
      >
        <motion.div
          className="py-2 pr-3.5 pl-4.5 text-[11px] flex justify-center items-center border border-[#39a9e8] border-dashed rounded-4xl"
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          <span className="inline-flex w-1.75 h-1.75 rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,#fff,#39a9e8_60%,color-mix(in_srgb,#39a9e8,#021b2c_62%))] mr-2"></span>
          <span className="text-[color(srgb_0.0898039_0.31749_0.452706)] font-quicksand tracking-[.16em] font-bold">
            HÀNH TRÌNH NGÀY VUI
          </span>
        </motion.div>
        <motion.span
          className="font-black! font-baloo text-[color(srgb_0.0898039_0.31749_0.452706)] text-[22px]"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          Timeline
        </motion.span>
        <div
          className={`relative flex flex-col self-start before:content-[""] before:absolute before:top-3 before:bottom-3 before:w-[1.5px] before:bg-[repeating-linear-gradient(rgba(42,159,214,0.4)_0px,rgba(42,159,214,0.4)_6px,transparent_6px,transparent_12px)] before:left-2.5 before:translate-x-[-50%]`}
        >
          <motion.div
            className="flex items-center gap-2 text-sm/normal py-3.5"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.25 }}
          >
            <span className="text-[#39a9e8] font-black">8:00</span>
            <span className="font-quicksand font-black  text-[rgba(16,58,82,.72)]">
              Check-in
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-sm/normal py-3.5"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.25 }}
          >
            <span className="text-[#39a9e8] font-black">8:00</span>
            <span className="font-quicksand font-black  text-[rgba(16,58,82,.72)]">
              Check-in
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-sm/normal py-3.5"
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.25 }}
          >
            <span className="text-[#39a9e8] font-black">8:00</span>
            <span className="font-quicksand font-black  text-[rgba(16,58,82,.72)]">
              Check-in
            </span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 text-sm/normal py-3.5"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.25 }}
          >
            <span className="text-[#39a9e8] font-black">8:00</span>
            <span className="font-quicksand font-black  text-[rgba(16,58,82,.72)]">
              Check-in
            </span>
          </motion.div>
        </div>
      </div> */}
      {/* Section 5 */}
      <div
        className={`flex flex-col justify-center items-center gap-5 w-full py-14 px-5 bg-[#E2F3FC]  `}
      >
        <motion.div
          className="py-2 pr-3.5 pl-4.5 text-[11px] flex justify-center items-center border border-[#39a9e8] border-dashed rounded-4xl"
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          <span className="inline-flex w-1.75 h-1.75 rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,#fff,#39a9e8_60%,color-mix(in_srgb,#39a9e8,#021b2c_62%))] mr-2"></span>
          <span className="text-[color(srgb_0.0898039_0.31749_0.452706)] font-quicksand tracking-[.16em] font-bold">
            ĐIỂM ĐẾN
          </span>
        </motion.div>
        <motion.div
          className="relative  rounded-xl overflow-hidden border border-dashed border-[#39a9e8] bg-white py-7.5 px-6.5 w-full"
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          <FreeMapCard placeName="Đại học Cần Thơ" />
        </motion.div>
      </div>
      {/* Section 6 */}
      <div
        className={`flex flex-col justify-center items-center gap-5 w-full py-14 px-5 bg-[#E2F3FC]  `}
      >
        <motion.div
          className="py-2 pr-3.5 pl-4.5 text-[11px] flex justify-center items-center border border-[#39a9e8] border-dashed rounded-4xl"
          initial={{ y: -60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          <span className="inline-flex w-1.75 h-1.75 rounded-[50%] bg-[radial-gradient(circle_at_30%_30%,#fff,#39a9e8_60%,color-mix(in_srgb,#39a9e8,#021b2c_62%))] mr-2"></span>
          <span className="text-[color(srgb_0.0898039_0.31749_0.452706)] font-quicksand tracking-[.16em] font-bold">
            SỔ LƯU BÚT
          </span>
        </motion.div>
        <motion.div
          className="relative border border-[#39a9e8] bg-white py-7.5 px-6.5 rounded-[10px] w-full"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.25 }}
        >
          <span className="absolute -top-4 w-7.5 h-10 left-[50%] translate-x-[-50%] border-4 border-b-0 rounded-[50%_50%_0_0/60%_60%_0_0] border-[#2a9fd680]"></span>
          <div className="flex items-center justify-start gap-3 mb-3.5">
            <div className="border border-[rgba(42,159,214,0.2)] rounded-[10px] bg-[rgba(42,159,214,0.08)] w-9.5 h-9.5 flex items-center justify-center">
              <Notebook className="text-[#39a9e8]" strokeWidth={0.5} />
            </div>
            <span className="text-[#39a9e8] font-black font-baloo text-[24px]">
              Gửi Lời Chúc
            </span>
          </div>
          <div className="flex flex-col gap-2.5 ">
            <InputGroup className="border border-[#8bdcff]/38">
              <InputGroupInput
                type="text"
                value={note.name}
                className="placeholder:text-[#8bdcff]/60 text-[#39a9e8]"
                placeholder="Tên của bạn"
                onChange={(e) =>
                  setNote((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <InputGroupAddon className="text-[#8bdcff]" aria-hidden="true">
                <Users loop loopDelay={1000} animate />
              </InputGroupAddon>
            </InputGroup>
            <Textarea
              className="border border-[#8bdcff]/38 text-[#39a9e8] placeholder:text-[#8bdcff]/60 focus-visible:ring-[#8bdcff]/30 h-30"
              placeholder="Nhập lời chúc ý nghĩa của bạn..."
              value={note.message}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, message: e.target.value }))
              }
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={!note.name.trim() || !note.message.trim()}
                  className="bg-[linear-gradient(135deg,#39a9e8,color-mix(in_srgb,#39a9e8,#021b2c_62%))] rounded-sm text-[13px] font-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Gửi lời chúc
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-baloo">
                    Gửi lời chúc tốt nghiệp 🎓
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Lời chúc ý nghĩa của bạn dành cho tân cử nhân
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={loading}
                    onClick={handleCreateWish}
                    className="bg-[linear-gradient(135deg,#39a9e8,color-mix(in_srgb,#39a9e8,#021b2c_62%))]"
                  >
                    Gửi lời chúc ✨
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
      </div>

      {/* Final Section */}
      <div className="w-full flex flex-col items-center justify-center gap-5 py-12 bg-[linear-gradient(180deg,#eaf6ff,#cfeaff_52%,#9fd4f5)]">
        <motion.figure
          className="rounded-full bg-white w-49 h-49"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          animate={{
            y: [-10, 10, -10], // Di chuyển lên -10px, xuống 10px, rồi quay về -10px
          }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.8, ease: "easeOut" },
            y: {
              duration: 4, // Thời gian cho 1 chu kỳ lên xuống
              repeat: Infinity, // Lặp lại vô hạn
              ease: "easeInOut", // Chuyển động mượt mà
            },
          }}
        >
          <img
            src={NgocPhung2Webp}
            alt="Ngọc Phụng trong ảnh tốt nghiệp"
            width={200}
            height={200}
            className="object-cover object-[0%_5%] w-full h-full rounded-full border-[6px] border-white"
          />
        </motion.figure>
        <span className="text-[17px]/[1.95] font-medium text-[color-mix(in_srgb,#39a9e8,#021b2c_62%)] text-center">
          Cảm ơn bạn đã luôn đồng hành và chia sẻ niềm vui này.
        </span>
        <span className="text-[28px] font-bold font-charm text-[#39a9e8]">
          - Ngọc Phụng
        </span>
      </div>
    </>
  );
};

export default Scroll;
