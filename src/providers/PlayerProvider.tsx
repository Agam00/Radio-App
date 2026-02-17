import { AudioPlayer } from "expo-audio";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import dummyBooks from "@/dummyBooks";
import { useAudioPlayer } from "expo-audio";

type PlayerContextType = {
  player: AudioPlayer;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default function PlayerProvider({ children }: PropsWithChildren) {
  const player = useAudioPlayer({
    uri: "https://demo.azuracast.com/listen/azuratest_radio/radio.mp3",
  });

  return (
    <PlayerContext.Provider value={{ player }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
