import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { usePlayer } from "@/providers/PlayerProvider";

import dummyBooks from "@/dummyBooks";
export default function FloatingPlayer() {
  const book = dummyBooks[0];
  const { player } = usePlayer();

  // const player = useAudioPlayer({
  //   uri: "https://demo.azuracast.com/listen/azuratest_radio/radio.mp3",
  // });
  const playerStatus = useAudioPlayerStatus(player);
  return (
    <Link href="/player" asChild>
      <Pressable className="flex-row gap-4 items-center p-2 bg-slate-900">
        <Image
          source={{ uri: book.thumbnail_url }}
          className="w-16 aspect-square rounded-md"
        />
        <View className="gap-1 flex-1">
          <Text className="text-2xl font-bold text-gray-100">{book.title}</Text>
          <Text className="text-gray-400">{book.author}</Text>
        </View>
        <AntDesign
          name={playerStatus.playing ? "pause" : "play-circle"}
          size={24}
          color="gainsboro"
          onPress={() =>
            playerStatus.playing ? player.pause() : player.play()
          }
        />
      </Pressable>
    </Link>
  );
}
