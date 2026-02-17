import { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import dummyBooks from "@/dummyBooks";
import PlaybackBar from "@/components/PlayBackBar";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { usePlayer } from "@/providers/PlayerProvider";

export default function PlayerScreen() {
  // states defined
  const API_URL = "https://demo.azuracast.com/api/nowplaying";
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  //fetches api every 15 seconds
  useEffect(() => {
    fetchRadio(); // initial fetch

    const interval = setInterval(() => {
      fetchRadio(); // refetch every 15 sec
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  //controls the placyback bar
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => {
        if (prev < duration) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]);

  // fetch logic
  const fetchRadio = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const station = data[0]; // IMPORTANT
      setTitle(station.now_playing.song.title);
      setDuration(station.now_playing.duration);

      // Only update elapsed if difference is big (like new song)
      setElapsed((prev) => {
        const apiElapsed = station.now_playing.elapsed;

        if (Math.abs(apiElapsed - prev) > 5) {
          return apiElapsed; // resync
        }

        return prev; // keep smooth timer
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const book = dummyBooks[0];
  const { player } = usePlayer();
  // const player = useAudioPlayer({
  //   uri: "https://demo.azuracast.com/listen/azuratest_radio/radio.mp3",
  // });
  const playerStatus = useAudioPlayerStatus(player);

  return (
    <SafeAreaView className="flex-1  p-4 py-10 gap-4">
      <Pressable
        onPress={() => router.back()}
        className="absolute top-16 left-4 bg-gray-800 rounded-full
       p-2"
      >
        <Entypo name="chevron-down" size={24} color="white" />
      </Pressable>
      <Image
        source={{ uri: book.thumbnail_url }}
        className="w-[95%] aspect-square rounded-[30px] self-center mt-12"
      />

      <View className="gap-8 flex-1 justify-end">
        <Text className="text-white text-2xl font-bold  text-center">
          {title}
        </Text>
        <PlaybackBar currentTime={elapsed} duration={duration} />

        <View className="flex-row items-center justify-between">
          <Ionicons name="play-skip-back" size={24} color="white" />
          <Ionicons name="play-back" size={24} color="white" />
          <Ionicons
            onPress={() =>
              playerStatus.playing ? player.pause() : player.play()
            }
            name={playerStatus.playing ? "pause" : "play"}
            size={50}
            color="white"
          />
          <Ionicons name="play-forward" size={24} color="white" />
          <Ionicons name="play-skip-forward" size={24} color="white" />
        </View>
      </View>
    </SafeAreaView>
  );
}
