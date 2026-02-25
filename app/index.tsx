import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const logo = require("@/assets/images/travel.png");

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // ใช้ replace เพื่อไม่ให้กด Back กลับมาหน้านี้ได้
      router.replace("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.decorCircle} />
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Chiang Rai</Text>
      <Text style={styles.subtitle}>Tourist Attractions</Text>
      <Text style={styles.caption}>สถานที่ท่องเที่ยวที่น่าสนใจในเชียงราย</Text>
      <View style={styles.loadingPill}>
        <Text style={styles.loadingText}>กำลังพาไปเที่ยวเชียงราย...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020617",
  },
  decorCircle: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: "#0ea5e9",
    opacity: 0.18,
    top: "18%",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
    borderRadius: 28,
  },
  title: {
    fontFamily: "Kanit_700Bold",
    fontSize: 30,
    color: "#f9fafb",
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: "Kanit_400Regular",
    fontSize: 18,
    color: "#e5e7eb",
    marginTop: 4,
  },
  caption: {
    fontFamily: "Kanit_400Regular",
    fontSize: 15,
    color: "#9ca3af",
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 40,
  },
  loadingPill: {
    marginTop: 24,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(15, 118, 110, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(45, 212, 191, 0.6)",
  },
  loadingText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 13,
    color: "#a5f3fc",
  },
});
