import { View, Text, ScrollView, Pressable, Linking } from "react-native";

export default function Discover() {
  return (
    <ScrollView>
      <View className="flex justify-center gap-2 p-5 ">
        {/* Hindi Section */}
        <Text className="text-white text-2xl leading-8 pt-1 ">
          प्रणाम जी, सुंदरसाथ जी 🙏, {"\n"}हम अभी
          <Text className="font-bold"> बीटा </Text>चरण में हैं, इसलिए ऐप का
          परीक्षण और सुधार जारी है। आपको कुछ छोटे बग या बफरिंग की समस्या हो सकती
          है। यदि आपको कोई समस्या आए या आपके पास कोई सुझाव हो, तो कृपया हमसे
          संपर्क करें—आपकी प्रतिक्रिया हमें ऐप को बेहतर बनाने में मदद करती है।
        </Text>
      </View>
      <View className="m-4 gap-4 bg-slate-800 p-3 rounded-lg">
        {/* Name Row */}
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-xl font-bold">Name :</Text>

          <View className="items-end">
            <Text className="text-white text-xl">Lovely Batra</Text>
            <Text className="text-white text-xl">Agam Arora (Developer)</Text>
          </View>
        </View>
        {/* Email Row */}
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-xl font-bold">Email :</Text>

          <View className="items-end">
            <Text className="text-white text-xl">lbatra72@gmail.com</Text>
            <Text className="text-white text-xl">agampy7@gmail.com</Text>
          </View>
        </View>

        {/* Contact Row */}
        <View className="flex-row justify-between items-start">
          <Text className="text-white text-xl font-bold">Contact :</Text>

          <Text className="text-white text-xl">+91-7986813896</Text>
        </View>
      </View>
      <View className="gap-4 m-4">
        {/* Download App */}
        <Pressable
          onPress={() =>
            Linking.openURL("market://details?id=com.vishal.web.rattanpuri")
          }
          className="bg-orange-400 p-4 rounded-md"
        >
          <Text className="text-xl text-center font-bold">
            Download Nijanand App
          </Text>
        </Pressable>

        {/* Visit Website */}
        <Pressable
          onPress={() => Linking.openURL("https://ratanpuri.in/")}
          className="bg-orange-400 p-4 rounded-md"
        >
          <Text className="text-xl text-center font-bold ">
            Visit Ratanpuri Site
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
