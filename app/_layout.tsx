import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#020617",
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Kanit_700Bold",
          fontSize: 20,
          color: "#f9fafb",
        },
        headerTintColor: "#e5e7eb",
        contentStyle: {
          backgroundColor: "#020617",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "สถานที่ท่องเที่ยวเชียงราย",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียดสถานที่ท่องเที่ยว",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
