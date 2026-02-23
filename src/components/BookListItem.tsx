import { Text, View, Image, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { usePlayer } from "@/providers/PlayerProvider";

type BookListItemProps = {
  title: string;
  path: string;
};
export default function BookListItem({ title, path }: BookListItemProps) {
  const { setSelectedTitle, setImagePath } = usePlayer();

  return (
    <Link href="/player" asChild>
      <Pressable
        onPress={() => {
          setSelectedTitle(title);
          setImagePath(path);
        }}
        className="bg-slate-800 rounded-2xl p-3 mb-4 w-[48%] justify-around"
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        {/* Image on Top */}
        <Image
          source={{ uri: path }}
          className="w-full h-36 rounded-xl"
          resizeMode="cover"
        />

        {/* Title */}
        <Text className="text-white text-2xl font-semibold mt-5">{title}</Text>

        {/* Play Button */}
        <View className="mt-3 items-end  ">
          <AntDesign name="arrow-right" size={30} color="white" />
        </View>
      </Pressable>
    </Link>
  );
}
