// แม็ป type ให้ตรงกับคอลัมน์ในตาราง thai_province_tb บน Supabase
export type TouristPlace = {
  id: number; // int8
  name: string; // varchar
  type: string; // varchar
  address: string; // text
  phone: string | null; // varchar อนุญาตให้เป็นค่าว่าง
  latitude: string | null; // text
  longitude: string | null; // text
  image_url: string | null; // text
  created_at?: string | null; // timestamp

  // สำหรับงานเทศกาล (type === "festival") เท่านั้น
  festival_start?: string | null; // วันที่เริ่มงาน
  festival_end?: string | null; // วันที่สิ้นสุดงาน
};

