import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { usePlayer } from "@/providers/PlayerProvider";

type BookListItemProps = {
  title: string;
};

export default function BookListItem({ title }: BookListItemProps) {
  const { setSelectedTitle } = usePlayer();
  return (
    <Link href="/player" asChild>
      <Pressable
        onPress={() => setSelectedTitle(title)}
        className="flex-row gap-4 items-center bg-slate-800 rounded-lg p-4"
      >
        <Image
          source={require("../../assets/sarkarshri.jpg")}
          className="w-16 aspect-square rounded-md"
        />
        <View className="gap-1 flex-1">
          <Text className="text-2xl font-bold text-gray-100">{title}</Text>
        </View>
        <AntDesign name="play-circle" size={24} color="gainsboro" />
      </Pressable>
    </Link>
  );
}
