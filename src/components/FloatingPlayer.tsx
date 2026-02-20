import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useAudioPlayerStatus } from "expo-audio";
import { usePlayer } from "@/providers/PlayerProvider";

export default function FloatingPlayer() {
  const { player, selectedTitle, STREAM_URL, play, pause } = usePlayer();

  const playerStatus = useAudioPlayerStatus(player);

  const handleLiveToggle = async () => {
    try {
      if (playerStatus.playing) {
        // Pause only
        await pause();
      } else {
        // Force fresh LIVE stream connection
        await player.replace({
          uri: STREAM_URL,
        });

        await play();
      }
    } catch (err) {
      console.log("Playback Error:", err);
    }
  };
  return (
    <Link href="/player" asChild>
      <Pressable className="flex-row gap-4 items-center p-2 bg-slate-900">
        <Image
          source={require("../../assets/sarkarshri.jpg")}
          className="w-16 aspect-square rounded-md"
        />
        <View className="gap-1 flex-1">
          <Text className="text-2xl font-bold text-gray-100">
            {selectedTitle}
          </Text>
        </View>
        <AntDesign
          name={playerStatus.playing ? "pause" : "play-circle"}
          size={24}
          color="gainsboro"
          onPress={handleLiveToggle}
          // onPress={() => (playerStatus.playing ? pause() : play())}
        />
      </Pressable>
    </Link>
  );
}
