import { Star } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const RenderStars = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons key={i} name="star" size={12} color="#facc15" fill="#facc15" />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Ionicons
        key="half"
        name="star-half"
        size={12}
        color="#facc15"
        fill="#facc15"
      />
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} size={12} color="#facc15" fill="transparent" />
    );
  }

  return <View className="flex flex-row gap-1 mb-2 mt-auto">{stars}</View>;
};
