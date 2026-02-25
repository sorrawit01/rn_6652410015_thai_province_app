import { supabase } from "@/services/supabase";
import { TouristPlace } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const formatDate = (value?: string | null) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // State สำหรับเก็บข้อมูลสถานที่ท่องเที่ยว
  const [places, setPlaces] = useState<TouristPlace[]>([]);

  // ดึงข้อมูลสถานที่ท่องเที่ยวจากฐานข้อมูล
  useEffect(() => {
    const fetchTouristPlaces = async () => {
      const { data, error } = await supabase
        .from("thai_province_tb") // ชื่อตารางใน Supabase ต้องตรงกัน
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.log("Supabase error:", error);
        Alert.alert(
          "คำตอบ",
          `เกิดข้อผิดพลาดในการดึงข้อมูลสถานที่ท่องเที่ยว: ${error.message}`,
        );
      } else {
        setPlaces(data as TouristPlace[]);
      }
    };

    fetchTouristPlaces();
  }, []);

  // component สำหรับแสดงแต่ละสถานที่ใน FlatList
  const renderPlaceItem = ({ item }: { item: TouristPlace }) => (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id.toString(),
            name: item.name,
            type: item.type,
            address: item.address,
            latitude: item.latitude,
            longitude: item.longitude,
            image_url: item.image_url,
            phone: item.phone ?? "",
            created_at: item.created_at ?? "",
            festival_start: item.festival_start ?? "",
            festival_end: item.festival_end ?? "",
           },
        })
      }
    >
      <Image
        source={{ uri: item.image_url as string }}
        style={styles.thumbnail}
      />
      <View style={styles.cardContent}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeType}>{item.type}</Text>
        <Text style={styles.placeAddress}>📍 {item.address}</Text>
        {item.created_at && (
          <Text style={styles.placeMeta}>
            เริ่มงาน: {formatDate(item.created_at)}
          </Text>
        )}
        {item.type === "festival" &&
          item.festival_start &&
          item.festival_end && (
            <Text style={styles.placeFestivalPeriod}>
              ช่วงจัดงาน: {formatDate(item.festival_start)} -{" "}
              {formatDate(item.festival_end)}
            </Text>
          )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        data={places}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlaceItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>สถานที่จังหวัดเชียงราย</Text>
            <Text style={styles.headerSubtitle}>
              รวมสถานที่ท่องเที่ยวและเทศกาลน่าไปในจังหวัดเชียงราย
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  headerContainer: {
    marginBottom: 18,
  },
  headerTitle: {
    fontFamily: "Kanit_700Bold",
    fontSize: 24,
    color: "#f9fafb",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#9ca3af",
  },
  cardItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  thumbnail: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  placeName: {
    fontFamily: "Kanit_700Bold",
    fontSize: 17,
    color: "#333333",
    marginBottom: 4,
  },
  placeType: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#0f766e",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  placeAddress: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#555555",
  },
  placeMeta: {
    fontFamily: "Kanit_400Regular",
    fontSize: 12,
    color: "#999999",
    marginTop: 2,
  },
  placeFestivalPeriod: {
    fontFamily: "Kanit_400Regular",
    fontSize: 13,
    color: "#D35400",
    marginTop: 2,
  },
});
