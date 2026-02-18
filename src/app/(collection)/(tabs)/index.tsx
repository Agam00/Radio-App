import { View } from "react-native";

import BookListItem from "@/components/BookListItem";
export default function App() {
  return (
    <View className="mt-10 flex-1 gap-7 p-4 ">
      <BookListItem title="Charcha" />
      <BookListItem title="kirantan" />
      <BookListItem title="Bhajan" />
    </View>
  );
}
