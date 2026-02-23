import { Text, View, Image, Pressable, Linking } from "react-native";
import { AntDesign } from "@expo/vector-icons";

type BookListItemProps = {
  title: string;
  path: string;
};
export default function SinglePlayer({ title, path }: BookListItemProps) {
  return (
    <Pressable
      onPress={() => {
        Linking.openURL(
          "https://www.youtube.com/playlist?list=PLtq_x5_iV0tqdKbcH_xZqHX9e3LIDJY9n",
        );
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
      <View className="mt-3 items-end ">
        <AntDesign name="arrow-right" size={30} color="white" />
      </View>
    </Pressable>
  );
}
