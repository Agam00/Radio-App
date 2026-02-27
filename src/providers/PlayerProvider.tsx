import { Text, TextInput } from "react-native";

import {
  AudioPlayer,
  useAudioPlayer,
  setAudioModeAsync,
  useAudioPlayerStatus,
} from "expo-audio";
import * as NavigationBar from "expo-navigation-bar";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import NetInfo from "@react-native-community/netinfo";

// 1. Better Types
type PlayerContextType = {
  player: AudioPlayer;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTitle: string | null;
  setSelectedTitle: React.Dispatch<React.SetStateAction<string | null>>;
  STREAM_URL: string;
  API_URL: string;
  SONG_REQUEST: string;
  HISTORY: string;
  imagePath: string;
  setImagePath: React.Dispatch<React.SetStateAction<string>>;
  play: () => void;
  pause: () => void;
  isOffline: boolean; // Added so we can use it in the UI!
};

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// 2. Configuration Dictionary
const STATION_CONFIG: Record<
  string,
  { stream: string; api: string; request: string; history: string }
> = {
  Charcha: {
    stream: process.env.EXPO_PUBLIC_STREAM_CHARCHA_URL || "",
    api: process.env.EXPO_PUBLIC_STREAM_CHARCHA_API || "",
    request: process.env.EXPO_PUBLIC_STREAM_CHARCHA_REQUEST || "",
    history: process.env.EXPO_PUBLIC_STREAM_CHARCHA_HISTORY || "",
  },
  Bhajan: {
    stream: process.env.EXPO_PUBLIC_STREAM_BHAJAN_URL || "",
    api: process.env.EXPO_PUBLIC_STREAM_BHAJAN_API || "",
    request: process.env.EXPO_PUBLIC_STREAM_BHAJAN_REQUEST || "",
    history: process.env.EXPO_PUBLIC_STREAM_BHAJAN_HISTORY || "",
  },
  Kirantan: {
    stream: process.env.EXPO_PUBLIC_STREAM_KIRANTAN_URL || "",
    api: process.env.EXPO_PUBLIC_STREAM_KIRANTAN_API || "",
    request: process.env.EXPO_PUBLIC_STREAM_KIRANTAN_REQUEST || "",
    history: process.env.EXPO_PUBLIC_STREAM_KIRANTAN_HISTORY || "",
  },
  "Shri Tartam Path": {
    stream: process.env.EXPO_PUBLIC_STREAM_TARTAM_URL || "",
    api: process.env.EXPO_PUBLIC_STREAM_TARTAM_API || "",
    request: "",
    history: "",
  },
  "Shri Kuljam Swroop Sahib": {
    stream: process.env.EXPO_PUBLIC_STREAM_VANI_URL || "",
    api: process.env.EXPO_PUBLIC_STREAM_VANI_API || "",
    request: "",
    history: "",
  },
};

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState("");
  const [isOffline, setIsOffline] = useState(false);

  // Use ref instead of state to prevent re-renders!
  const wasPlayingRef = useRef(false);

  // Derive URLs automatically based on selectedTitle
  const currentConfig = selectedTitle ? STATION_CONFIG[selectedTitle] : null;
  const STREAM_URL = currentConfig?.stream || "";
  const API_URL = currentConfig?.api || "";
  const SONG_REQUEST = currentConfig?.request || "";
  const HISTORY = currentConfig?.history || "";

  const player = useAudioPlayer(STREAM_URL ? { uri: STREAM_URL } : null);
  const playerStatus = useAudioPlayerStatus(player);

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  // Track if user was actively playing audio
  useEffect(() => {
    if (playerStatus?.playing || playerStatus?.isBuffering) {
      wasPlayingRef.current = true;
    } else if (playerStatus?.isLoaded && !playerStatus?.playing) {
      wasPlayingRef.current = false;
    }
  }, [
    playerStatus?.playing,
    playerStatus?.isBuffering,
    playerStatus?.isLoaded,
  ]);

  // Update loading state
  useEffect(() => {
    if (playerStatus?.isBuffering) {
      setLoading(true);
    } else if (playerStatus?.isLoaded && !playerStatus?.isBuffering) {
      setLoading(false);
    }
  }, [playerStatus?.isBuffering, playerStatus?.isLoaded]);

  // NEW: Clean Network Reconnection Logic
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const currentlyOffline = !(
        state.isConnected && state.isInternetReachable !== false
      );

      if (currentlyOffline && !isOffline) {
        setIsOffline(true);
        // We don't need to do anything else here, wasPlayingRef is already tracking the status!
      } else if (!currentlyOffline && isOffline) {
        setIsOffline(false);

        // If they were listening before the drop, reconnect them automatically
        if (wasPlayingRef.current && STREAM_URL) {
          const freshStreamUrl = `${STREAM_URL}?t=${Date.now()}`;

          setLoading(true);
          player.replace({ uri: freshStreamUrl });
          player.play();
        }
      }
    });

    // Clean dependencies! No playerStatus here.
    return () => unsubscribe();
  }, [isOffline, STREAM_URL, player]);

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
    if (!STREAM_URL) return;
    player.setActiveForLockScreen(true);
    player.play();
  };

  const pause = () => {
    player.setActiveForLockScreen(false);
    player.pause();
  };

  return (
    <PlayerContext.Provider
      value={{
        player,
        selectedTitle,
        setSelectedTitle,
        STREAM_URL,
        API_URL,
        SONG_REQUEST,
        HISTORY,
        imagePath,
        setImagePath,
        loading,
        setLoading,
        play,
        pause,
        isOffline, // Exported so we can show an offline banner
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
