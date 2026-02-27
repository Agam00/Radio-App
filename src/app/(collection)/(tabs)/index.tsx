import { View, ScrollView } from "react-native";

import BookListItem from "@/components/BookListItem";
import SinglePlayer from "@/components/SinglePlayer";
export default function App() {
  return (
    <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
      <View className="flex-row flex-wrap justify-between px-2 mt-5 ">
        <BookListItem
          title="Charcha"
          path="https://ratanpuri.in/storage/images/.Sarkar%20Shri%20Ji%20Yaaden/rt1772201101ChatGPT_Image_Feb_27_2026_06_39_06_AM_p9pa12.png"
        />
        <BookListItem
          title="Kirantan"
          path="https://ratanpuri.in/storage/images/.Sarkar%20Shri%20Ji%20Yaaden/rt1772201101ChatGPT_Image_Feb_27_2026_03_18_00_PM_gwsavw.png"
        />
        <BookListItem
          title="Bhajan"
          path="https://ratanpuri.in/storage/images/.Sarkar%20Shri%20Ji%20Yaaden/rt1772201101ChatGPT_Image_Feb_27_2026_03_20_12_PM_ar7txf.png"
        />
        <BookListItem
          title="Shri Tartam Path"
          path="https://ratanpuri.in/storage/images/.Sarkar%20Shri%20Ji%20Yaaden/rt1772201101ChatGPT_Image_Feb_27_2026_06_56_41_AM_big1ek.png"
        />
        <BookListItem
          title="Shri Kuljam Swroop Sahib"
          path="https://ratanpuri.in/storage/images/.Sarkar%20Shri%20Ji%20Yaaden/rt1772201101ChatGPT_Image_Feb_27_2026_06_53_26_AM_ptth0l.png"
        />
        <SinglePlayer
          title="Video Bhajans (Youtube Playlist)"
          path="https://ratanpuri.in/storage/images/.Sarkar%20Shri%20Ji%20Yaaden/rt1772201101ChatGPT_Image_Feb_27_2026_03_20_12_PM_ar7txf.png"
        />
      </View>
    </ScrollView>
  );
}
