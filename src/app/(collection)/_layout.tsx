import { Stack } from "expo-router";

export default function CollectionLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="player"
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </Stack>
  );
}
