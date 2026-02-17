import { Slot } from "expo-router";
import "../../global.css";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import PlayerProvider from "@/providers/PlayerProvider";

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#010D1A",
    card: "#010D1A",
    primary: "white",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <PlayerProvider>
        <Slot />
      </PlayerProvider>
    </ThemeProvider>
  );
}
