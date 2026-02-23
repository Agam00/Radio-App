import { View, ScrollView } from "react-native";

import BookListItem from "@/components/BookListItem";
import SinglePlayer from "@/components/SinglePlayer";
export default function App() {
  return (
    <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
      <View className="flex-row flex-wrap justify-between px-2 mt-5 ">
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
        <BookListItem
          title="Shri Tartam Path"
          path="https://res.cloudinary.com/duz3qstmd/image/upload/v1771873470/ChatGPT_Image_Feb_24_2026_12_33_36_AM_byjv5g.png"
        />
        <BookListItem
          title="Shri Kuljam Swroop Sahib"
          path="https://res.cloudinary.com/duz3qstmd/image/upload/v1771873552/ChatGPT_Image_Feb_24_2026_12_35_26_AM_slcub2.png"
        />
        <SinglePlayer
          title="Video Bhajans (Youtube Playlist)"
          path="https://res.cloudinary.com/duz3qstmd/image/upload/v1771809179/ChatGPT_Image_Feb_23_2026_06_37_56_AM_l0g278.png"
        />
      </View>
    </ScrollView>
  );
}
