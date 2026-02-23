import { Tabs } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import FloatingPlayer from "@/components/FloatingPlayer";
import { usePlayer } from "@/providers/PlayerProvider";

export default function TabLayout() {
  const { STREAM_URL } = usePlayer();
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#0F172A",
          borderBottomWidth: 1,
          borderBottomColor: "#1E293B",
        },

        headerTitleStyle: {
          fontWeight: "700",
          fontSize: 24,
          color: "#fff",
        },
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#1E293B",
          backgroundColor: "#0F172A",
          height: 80,
          paddingTop: 2,
          paddingBottom: 10,
          elevation: 10,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 5,
        },
      }}
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
          title: "Nijanand Radio",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="radio" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Contact Us",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
