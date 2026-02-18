import { AudioPlayer, useAudioPlayer, setAudioModeAsync } from "expo-audio";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type PlayerContextType = {
  player: AudioPlayer;
  selectedTitle: any;
  setSelectedTitle: (book: any) => void;
  STREAM_URL: string;
  API_URL: string;
  play: () => void;
  pause: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [STREAM_URL, setStreamUrl] = useState("");
  const [API_URL, setApiUrl] = useState("");

  useEffect(() => {
    if (selectedTitle === "Charcha") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_CHARCHA_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_CHARCHA_API);
    } else if (selectedTitle === "Bhajan") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_BHAJAN_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_BHAJAN_API);
    } else if (selectedTitle === "Kirantan") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_BHAJAN_API);
    }
  }, [selectedTitle]);

  const player = useAudioPlayer({
    uri: STREAM_URL,
  });

  // ✅ Enable background + silent mode
  useEffect(() => {
    async function setupAudio() {
      await setAudioModeAsync({
        playsInSilentMode: true,
        shouldPlayInBackground: true,
        interruptionMode: "doNotMix",
      });
    }

    setupAudio();
  }, []);

  const play = () => {
    player.setActiveForLockScreen(true);

    player.play();
  };

  const pause = () => {
    player.pause();
    player.setActiveForLockScreen(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        selectedTitle,
        setSelectedTitle,
        STREAM_URL,
        API_URL,
        play,
        pause,
      }}
    >
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
