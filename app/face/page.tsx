"use client";

import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";

export default function FacePage() {
  const { RiveComponent } = useRive({
    // You'll need to add your .riv file to the public directory
    src: "/animations/face.riv",
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center">
      <div className="w-full h-full max-w-2xl max-h-2xl">
        <RiveComponent className="w-full h-full" />
      </div>
    </div>
  );
}
