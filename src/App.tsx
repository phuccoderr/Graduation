import { useState } from "react";
import Galaxy from "./components/Galaxy";
import BorderBackground from "./components/border-background";
import FooterYear from "./components/footer-year";
import TextType from "./components/TextType";
import { GlowBorderButton } from "./components/glow-border-button";
import GraduationCap from "./components/ui/graduation-cap";
import AvatarJpg from "@/assets/NgocPhung.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

function App() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");

  // const bg_green = useRef(
  //   "bg-[image:linear-gradient(180deg,#22473E_0%,#1E3E36_18%,#13312D_32%,#13312D_100%)]",
  // );
  return (
    <div className="h-screen relative bg-sky-400 overflow-hidden flex justify-center">
      <Galaxy
        starSpeed={0.2}
        density={0.6}
        hueShift={40}
        speed={0.3}
        glowIntensity={0.1}
        saturation={0}
        mouseRepulsion={false}
        repulsionStrength={1}
        twinkleIntensity={0}
        rotationSpeed={0.05}
        transparent
      />
      <BorderBackground />
      <FooterYear />
      <div className="mx-auto my-12 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-4">
          <p className="text-[rgb(201_169_97/80%)]">Thiệp mời tốt nghiệp</p>
          <p className="w-12 h-px bg-[#C9A961]/38"></p>
          <p className="text-white/70">2026</p>
        </div>
        <div className="h-56 relative w-57 flex items-center justify-center">
          {/* Khung Border chứa hình ảnh bên trong */}
          <div
            className="absolute right-4 left-4 
    border border-[#C9A961]/38 pointer-events-none rounded-t-full h-full overflow-hidden flex items-center justify-center"
          >
            <img
              src={AvatarJpg}
              className="w-full h-full object-cover rounded-t-full p-2 pb-0"
            />
          </div>

          {/* Nón nằm bên tay phải */}
          <GraduationCap size={"12rem"} />
        </div>

        <div className="flex flex-col gap-3 items-center">
          <p className="text-2xl text-white">Ngọc Phụng</p>
          <p className="text-sm text-white/70">ĐẠI HỌC CẦN THƠ</p>
          <p className="text-sm text-white/70">T6 · 06.11.2026 · 14:00</p>
        </div>
        <p className="w-[80%] h-[0.5px] bg-[#C9A961]/38 mx-auto"></p>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-[rgb(201_169_97/80%)]">Trân trọng kính mời</p>
          <TextType className="bold text-xl text-white/70" text={[name]} />
          <div className="w-80 sm:w-96 flex-wrap">
            <p className="text-white/70 text-sm italic text-center">
              Sự hiện diện của bạn là món quà lớn nhất để cùng mình khép lại
              quãng đời sinh viên rực rỡ và mở ra một chương mới thật đáng nhớ.
            </p>
          </div>
        </div>
        <p className="w-[80%] h-[0.5px] bg-[#C9A961]/38 mx-auto"></p>
        <GlowBorderButton size="lg" className="px-24 py-6">
          Chạm để mở thiệp
        </GlowBorderButton>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className={"bg-transparent"}>
            <DialogHeader>
              <DialogTitle>Nhập tên của bạn?</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="nhập tên của bạn"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Nhập
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
