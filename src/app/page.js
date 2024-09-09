// Example with Redux or any other global provider
import { HeroParallaxDemo } from "@/components/Home/page";
import Navbars from "@/components/Navbar/page";
import { NextUIProvider } from "@nextui-org/react";



export default function Home() {
  return (

      <NextUIProvider>
        <div>
          <Navbars />
          <HeroParallaxDemo />
        </div>
      </NextUIProvider>

  );
}
