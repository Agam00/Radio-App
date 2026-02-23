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
  SONG_REQUEST: string;
  HISTORY: string;
  setStreamUrl: any;
  setImagePath: any;
  imagePath: string;
  play: () => void;
  pause: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [STREAM_URL, setStreamUrl] = useState("");
  const [API_URL, setApiUrl] = useState("");
  const [SONG_REQUEST, setSongRequest] = useState("");
  const [HISTORY, setHistory] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    if (selectedTitle === "Charcha") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_CHARCHA_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_CHARCHA_API);
      setSongRequest(process.env.EXPO_PUBLIC_STREAM_CHARCHA_REQUEST);
      setHistory(process.env.EXPO_PUBLIC_STREAM_CHARCHA_HISTORY);
    } else if (selectedTitle === "Bhajan") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_BHAJAN_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_BHAJAN_API);
      setSongRequest(process.env.EXPO_PUBLIC_STREAM_BHAJAN_REQUEST);
      setHistory(process.env.EXPO_PUBLIC_STREAM_BHAJAN_HISTORY);
    } else if (selectedTitle === "Kirantan") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_API);
      setSongRequest(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_REQUEST);
      setHistory(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_HISTORY);
    } else if (selectedTitle === "Shri Tartam Path") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_API);
      setSongRequest("");
      setHistory("");
    } else if (selectedTitle === "Shri Kuljam Swroop Sahib") {
      setStreamUrl(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_URL);
      setApiUrl(process.env.EXPO_PUBLIC_STREAM_KIRANTAN_API);
      setSongRequest("");
      setHistory("");
    }
  }, [selectedTitle]);

  const player = useAudioPlayer(STREAM_URL ? { uri: STREAM_URL } : null);

  // Enable background + silent mode
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
    // player.setActiveForLockScreen(true);
    // player.play();

    if (!STREAM_URL) return; // Prevent playing if no station is selected

    // 1. Append timestamp to bypass device cache and force the live edge
    const freshStreamUrl = `${STREAM_URL}?t=${Date.now()}`;

    // 2. Load the fresh stream into the player
    player.replace({ uri: freshStreamUrl });

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
        SONG_REQUEST,
        HISTORY,
        setStreamUrl,
        imagePath,
        setImagePath,
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
