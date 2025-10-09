import * as React from "react";
import { FlatList, View, Dimensions } from "react-native";
import {
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "~/components/ui/typography-h2";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { ColorValue } from "react-native";
const { width } = Dimensions.get("window");

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  gradient: readonly [ColorValue, ColorValue, ...ColorValue[]];
};

const banners: Banner[] = [
  {
    id: 1,
    title: "Không ngừng phát triển",
    subtitle:
      "Học các kỹ năng bạn cần để thực hiện bước tiếp theo — và từng bước sau đó. Các khóa học có giá từ 249.000 ₫. Ưu đãi sẽ kết thúc hôm nay.",
    icon: "school",
    gradient: ["#3B82F6", "#2563EB"],
  },
  {
    id: 2,
    title: "Khóa học mới nhất",
    subtitle:
      "Cập nhật xu hướng công nghệ mới nhất với hơn 1000+ khóa học chất lượng cao. Học từ chuyên gia hàng đầu với giá ưu đãi.",
    icon: "trending-up",
    gradient: ["#059669", "#3B82F6"],
  },
  {
    id: 3,
    title: "Chứng chỉ quốc tế",
    subtitle:
      "Nhận chứng chỉ được công nhận toàn cầu sau khi hoàn thành khóa học. Nâng cao giá trị CV và cơ hội nghề nghiệp.",
    icon: "ribbon",
    gradient: ["#FBBF24", "#D97706"],
  },
  {
    id: 4,
    title: "Học mọi lúc mọi nơi",
    subtitle:
      "Truy cập khóa học 24/7 trên mọi thiết bị. Download video để học offline. Hỗ trợ học tập linh hoạt theo lịch trình của bạn.",
    icon: "phone-portrait",
    gradient: ["#3B82F6", "#2563EB"],
  },
];

export function Slider() {
  const flatListRef = React.useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= banners.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);
  return (
    <View className="relative mb-4">
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={({ item }) => (
          <LinearGradient
            colors={item.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: width - 35, borderRadius: 12 }}
            className="mx-1 flex flex-row p-6 justify-between items-center"
          >
            <View className="w-3/4 text-white pr-2">
              <TypographyH3 className="text-white mb-3 whitespace-nowrap">
                {item.title}
              </TypographyH3>
              <TypographyP className="text-gray-200 text-justify">
                {item.subtitle}
              </TypographyP>
            </View>

            <View className="w-1/4 rounded-fullitems-center justify-center">
              <Ionicons
                name={item.icon as keyof typeof Ionicons.glyphMap}
                size={48}
                color="white"
                className="bg-white/20 p-4 rounded-full"
              />
            </View>
          </LinearGradient>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
