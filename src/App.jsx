import { useEffect, useRef } from "react";
import "./App.css";
import lottie from "lottie-web";
// import * as LottiePlayer from "@lottiefiles/lottie-player";
// import { create } from "@lottiefiles/lottie-interactivity";
import animationData from "./data.json";

function App() {
  const lottiee = useRef(null);

  useEffect(() => {
    var animDuration = 3100;
    const anim = lottie.loadAnimation({
      container: lottiee.current,
      renderer: "svg",
      loop: false,
      autoplay: false,

      animationData,
    });

    function animatebodymovin(duration) {
      const scrollPosition = window.scrollY;
      const maxFrames = anim.totalFrames;

      const frame = (maxFrames / 100) * (scrollPosition / (duration / 100));

      anim.goToAndStop(frame, true);
    }
    const onScroll = () => {
      // console.log("Scrolling");
      animatebodymovin(animDuration);
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      anim.destroy();
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <div style={{ position: "fixed" }} ref={lottiee}></div>;
}

export default App;
