import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import FloatingPlayer from "@/components/FloatingPlayer";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <>
          <FloatingPlayer />
          <BottomTabBar {...props} />
        </>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Stations",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="radio" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
