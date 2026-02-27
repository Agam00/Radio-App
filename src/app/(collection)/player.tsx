import { useEffect, useState, useCallback } from "react";
import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import PlaybackBar from "@/components/PlayBackBar";
import { useAudioPlayerStatus } from "expo-audio";
import { usePlayer } from "@/providers/PlayerProvider";

import PopUp from "@/components/Popup";

export default function PlayerScreen() {
  // context variables

  const {
    player,
    play,
    pause,
    API_URL,
    selectedTitle,
    imagePath,

    loading,
  } = usePlayer();

  // states defined

  const [title, setTitle] = useState("Station offline");
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const fetchRadio = useCallback(async () => {
    if (!API_URL) return; // Don't fetch if no station is selected

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Offline");

      const station = await response.json();
      setTitle(station.now_playing.song.text);
      setDuration(station.now_playing.duration);

      setElapsed((prev) => {
        const apiElapsed = station.now_playing.elapsed;
        // Resync if the drift is larger than 5 seconds
        if (Math.abs(apiElapsed - prev) > 5) {
          return apiElapsed;
        }
        return prev;
      });
    } catch {
      setTitle("Station offline");
      setDuration(0);
      setElapsed(0);
    }
    // Removed setLoading(false) from here so it doesn't fight the audio buffer state!
  }, [API_URL]);

  // Handle the 15-second interval
  useEffect(() => {
    fetchRadio(); // Fetch immediately on mount or URL change

    const interval = setInterval(() => {
      fetchRadio();
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchRadio]); // Now depends on fetchRadio, which updates when API_URL changes

  // Controls the smooth playback bar locally
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => (prev < duration ? prev + 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]);

  const playerStatus = useAudioPlayerStatus(player);

  return (
    <SafeAreaView className="flex-1 p-4 py-10 gap-4">
      <Pressable
        onPress={() => router.back()}
        className="absolute top-16 left-4 bg-gray-800 rounded-full
       p-2"
      >
        <Entypo name="chevron-down" size={24} color="white" />
      </Pressable>
      <Text className="text-white text-2xl font-bold  text-center self-center">
        {selectedTitle}
      </Text>

      <Image
        source={{ uri: imagePath }}
        className="w-[70%] aspect-square rounded-[30px] self-center mt-7"
      />

      <View className="gap-8 flex-1 justify-end mb-2 ">
        <PopUp />

        {loading && <ActivityIndicator size="large" color="#FB923C" />}
        <Text className="text-white text-2xl font-bold  text-center">
          {title}
        </Text>
        <PlaybackBar currentTime={elapsed} duration={duration} />

        <View className="flex-row items-center justify-between">
          <Ionicons name="play-skip-back" size={24} color="white" />
          <Ionicons name="play-back" size={24} color="white" />
          <Ionicons
            onPress={() => (playerStatus.playing ? pause() : play())}
            name={playerStatus.playing ? "pause" : "play"}
            size={50}
            className="bg-orange-400 rounded-md overflow-hidden "
          />
          <Ionicons name="play-forward" size={24} color="white" />
          <Ionicons name="play-skip-forward" size={24} color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
}
