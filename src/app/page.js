import { HeroParallaxDemo } from "@/components/Home/Hero/page";
import Navbars from "@/components/Navbar/page";
import {NextUIProvider} from "@nextui-org/react";
export default function Home() {
  return (
    <div >
       <NextUIProvider>
      <Navbars/>
        <HeroParallaxDemo/>
        </NextUIProvider>
    </div>
  );
}
