import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

import { usePlayer } from "@/providers/PlayerProvider";

export default function PopUp() {
  const { SONG_REQUEST, HISTORY } = usePlayer();

  const [visible, setVisible] = useState(false);
  const [activePage, setActivePage] = useState(null);

  const openModal = (type: any) => {
    setActivePage(type);
    setVisible(true);
  };

  const getUrl = () => {
    if (activePage === "history") {
      return HISTORY;
    }
    if (activePage === "request") {
      return SONG_REQUEST;
    }
    return "";
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={() => openModal("history")}>
          <Text style={styles.buttonText}>History</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => openModal("request")}>
          <Text style={styles.buttonText}>Request Song</Text>
        </Pressable>
      </View>

      {/* Popup Modal */}
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            {/* WebView */}
            {activePage && (
              <WebView
                source={{ uri: getUrl() }}
                style={styles.webview}
                originWhitelist={["*"]}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 15, // spacing between buttons
  },

  button: {
    backgroundColor: "#FB923C", // dark slate
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Android shadow
  },

  buttonText: {
    // color: "white",
    // fontWeight: "600",
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  popup: {
    width: "80%",
    height: "50%",
    backgroundColor: "black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },

  webview: {
    flex: 1,
    backgroundColor: "black",
    marginTop: 50,
    marginRight: 10,
  },
});
