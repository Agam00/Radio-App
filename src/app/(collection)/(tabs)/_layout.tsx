import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import FloatingPlayer from "@/components/FloatingPlayer";
import { usePlayer } from "@/providers/PlayerProvider";

export default function TabLayout() {
  const { STREAM_URL } = usePlayer();
  return (
    <Tabs
      tabBar={(props) => (
        <>
          {STREAM_URL ? <FloatingPlayer /> : null}
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
          title: "About Us",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
