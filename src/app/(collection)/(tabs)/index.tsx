import { View, ScrollView } from "react-native";

import BookListItem from "@/components/BookListItem";
export default function App() {
  return (
    <ScrollView className="flex-1 mt-10" showsVerticalScrollIndicator={false}>
      <View className="flex-row flex-wrap justify-between px-4 ">
        <BookListItem
          title="Charcha"
          path="https://res.cloudinary.com/duz3qstmd/image/upload/v1771809104/ChatGPT_Image_Feb_23_2026_06_38_56_AM_bgckcb.png"
        />
        <BookListItem
          title="Kirantan"
          path="https://res.cloudinary.com/duz3qstmd/image/upload/v1771809180/ChatGPT_Image_Feb_23_2026_06_37_59_AM_exgbvr.png"
        />
        <BookListItem
          title="Bhajan"
          path="https://res.cloudinary.com/duz3qstmd/image/upload/v1771809179/ChatGPT_Image_Feb_23_2026_06_37_56_AM_l0g278.png"
        />
      </View>
    </ScrollView>
  );
}
