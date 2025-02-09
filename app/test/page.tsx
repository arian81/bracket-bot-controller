"use client";

import {
  useRive,
  useStateMachineInput,
  Layout,
  Fit,
  Alignment,
} from "@rive-app/react-canvas";
import { useEffect, useState } from "react";

export default function FacePage() {
  const { RiveComponent, rive } = useRive({
    // You'll need to add your .riv file to the public directory
    src: "/animations/grassy_bot.riv",
    stateMachines: "State Machine 1",
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
    autoplay: true,
  });

  // Add state machine inputs with correct names

  //  sad
  const trigger1Input = useStateMachineInput(
    rive,
    "State Machine 1",
    "Trigger 1",
    false
  );

  // annya
  const trigger3Input = useStateMachineInput(
    rive,
    "State Machine 1",
    "Trigger 3",
    false
  );

  // Happy (Default)
  const trigger4Input = useStateMachineInput(
    rive,
    "State Machine 1",
    "Trigger 4",
    false
  );

  const boolean1Input = useStateMachineInput(
    rive,
    "State Machine 1",
    "Boolean 1",
    false
  );

  const [emotionChange, setEmotionChange] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (emotionChange) {
      interval = setInterval(() => {
        if (trigger4Input) trigger4Input.fire();
        setEmotionChange(false);
        console.log("this running");
      }, 5000);
    }

    // Cleanup interval on component unmount or when emotionChange becomes false
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [emotionChange]); // Removed trigger4Input from dependencies

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <div className="w-full h-full max-w-2xl max-h-2xl">
        <RiveComponent className="w-full h-full" />
      </div>
      <div className="absolute bottom-10 flex gap-4">
        <button
          onClick={() => {
            if (trigger1Input) {
              setEmotionChange(true);
              trigger1Input.fire();
            }
          }}
          className="px-4 py-2 bg-green-500 rounded-lg text-white"
        >
          Be sad
        </button>
        <button
          onClick={() => {
            if (trigger3Input) {
              setEmotionChange(true);
              trigger3Input.fire();
            }
          }}
          className="px-4 py-2 bg-green-500 rounded-lg text-white"
        >
          Be Happy
        </button>
        <button
          onClick={() => {
            if (boolean1Input) boolean1Input.value = !boolean1Input.value;
          }}
          className="px-4 py-2 bg-green-500 rounded-lg text-white"
        >
          Talk
        </button>
      </div>
    </div>
  );
}
