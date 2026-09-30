import { useState } from "react";
// import Galaxy from "./components/Galaxy";
import BorderBackground from "./components/border-background";
import FooterYear from "./components/footer-year";
import TextType from "./components/TextType";
import GraduationCap from "./components/ui/graduation-cap";
import AvatarJpg from "@/assets/NgocPhung.jpg";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
} from "./components/animate-ui/components/radix/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./components/ui/input-group";
import { PartyPopper } from "./components/animate-ui/icons/party-popper";

function App() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");

  // const bg_green = useRef(
  //   "bg-[image:linear-gradient(180deg,#22473E_0%,#1E3E36_18%,#13312D_32%,#13312D_100%)]",
  // );
  return (
    <div className="h-screen relative bg-linear-to-b from-[#0F4265] via-[#1A5C8A] to-[#2B7CB1] overflow-hidden flex justify-center">
      {/* <Galaxy
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
      /> */}
      <BorderBackground />
      <FooterYear />
      <div className="mx-auto my-12 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-4">
          <p className="text-[#8bdcff]">Thiệp mời tốt nghiệp</p>
          <p className="w-12 h-px bg-[#C9A961]/38"></p>
          <p className="text-white/70">2026</p>
        </div>
        <div className="h-56 relative w-57 flex items-center justify-center">
          {/* Khung Border chứa hình ảnh bên trong */}
          <div
            className="absolute right-4 left-4 
    border border-[#8bdcff]/38 pointer-events-none rounded-t-full h-full overflow-hidden flex items-center justify-center"
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
          <p className="text-2xl text-[#8bdcff] font-bold">Ngọc Phụng</p>
          <p className="text-sm text-[rgb(240_250_255/0.86)]">
            ĐẠI HỌC CẦN THƠ
          </p>
          <p className="text-sm text-[rgb(240_250_255/_0.66)]">
            T6 · 06.11.2026 · 14:00
          </p>
        </div>
        <p className="w-[80%] h-[0.5px] bg-[#8bdcff]/38 mx-auto"></p>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-[rgb(240_250_255/_0.66)]">Trân trọng kính mời</p>
          <TextType
            className="text-xl text-[#8bdcff] font-bold"
            text={[name]}
          />
          <div className="w-80 sm:w-96 flex-wrap">
            <p className="text-white/70 text-sm italic text-center">
              Sự hiện diện của bạn là món quà lớn nhất để cùng mình khép lại
              quãng đời sinh viên rực rỡ và mở ra một chương mới thật đáng nhớ.
            </p>
          </div>
        </div>
        <p className="w-[80%] h-[0.5px] bg-[#8bdcff]/38 mx-auto"></p>
        <Button
          size="lg"
          className="px-24 py-6 bg-(image:--gradient-cyan-orange) text-[#0c3450] rounded-full cursor-pointer z-10"
        >
          Chạm để mở thiệp
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            className={"bg-[#ffcf5c29] border border-[#8bdcff]"}
            showCloseButton={false}
          >
            <InputGroup className="border border-[#8bdcff]/38 ">
              <InputGroupInput
                className="placeholder:text-[#8bdcff]/38"
                placeholder="Nhập tên của bạn :33"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <InputGroupAddon className="text-[#8bdcff]">
                <PartyPopper animateOnHover />
              </InputGroupAddon>
            </InputGroup>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              className="bg-(image:--gradient-cyan-orange) text-[#0c3450] rounded-full "
            >
              Lưu
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;
