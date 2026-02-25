import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function Detail() {
  const params = useLocalSearchParams();
  const formatDate = (value?: string | null) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value as string;
    return d.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  // ฟังก์ชั่นเปิดแอปโทรศัพท์
  const handleCalApp = () => {
    const phoneNumber = params.phone as string;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  // ฟังก์ชั่นเปิดแผนที่
  const handleOpenMapApp = () => {
    // สร้างตัวแปรเพื่อเปิด Google Map
    const googleMap = `https://maps.google.com/?q=${params.latitude},${params.longitude}`;

    // สร้างตัวแปรเพื่อเปิด Apple Map
    const appleMap = `https://maps.apple.com/?q=${params.name}?&ll=${params.latitude},${params.longitude}`;
    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: params.image_url as string }}
        style={styles.heroImage}
      />
      {/* แสดงรายละเอียด */}
      <View style={styles.content}>
        <Text style={styles.title}>{params.name as string}</Text>
        <Text style={styles.type}>{params.type as string}</Text>
        <Text style={styles.address}>{params.address as string}</Text>
        {params.created_at && (
          <Text style={styles.metaText}>
            เริ่มงาน: {formatDate(params.created_at as string)}
          </Text>
        )}
        {params.type === "festival" &&
          params.festival_start &&
          params.festival_end && (
            <Text style={styles.festivalText}>
              ช่วงจัดงาน:{" "}
              {formatDate(params.festival_start as string)} -{" "}
              {formatDate(params.festival_end as string)}
            </Text>
          )}
        <TouchableOpacity
          onPress={handleCalApp}
          style={styles.callButton}
        >
          <Text style={styles.callButtonText}>
            {" "}
            📞{params.phone as string}
          </Text>
        </TouchableOpacity>
        <Text style={styles.mapTitle}>แผนที่สถานที่ท่องเที่ยว</Text>
        <TouchableOpacity
          onPress={handleOpenMapApp}
          style={styles.mapButton}
        >
          <Text style={styles.mapButtonText}>เปิดในแอปแผนที่</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  heroImage: {
    width: "100%",
    height: 230,
  },
  content: {
    marginTop: -24,
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontFamily: "Kanit_700Bold",
    fontSize: 22,
    color: "#111827",
    marginBottom: 4,
  },
  type: {
    fontFamily: "Kanit_400Regular",
    fontSize: 15,
    color: "#0f766e",
    marginBottom: 6,
  },
  address: {
    fontFamily: "Kanit_400Regular",
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 4,
  },
  metaText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
  },
  festivalText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#b45309",
    marginTop: 2,
  },
  callButton: {
    marginTop: 14,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: "#16a34a",
    alignItems: "center",
  },
  callButtonText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#ffffff",
  },
  mapTitle: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    marginTop: 18,
    color: "#111827",
  },
  mapButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 999,
    backgroundColor: "#0ea5e9",
    alignItems: "center",
  },
  mapButtonText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 16,
    color: "#ffffff",
  },
});
