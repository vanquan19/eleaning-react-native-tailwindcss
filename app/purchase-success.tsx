import React from "react";
import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { ROUTES } from "~/constants/router";

const PurchaseSuccess = () => {
  const handleGoToMyCourses = () => {
    router.replace(ROUTES.MY_COURSES.path);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-2xl font-bold text-green-600 mb-4">
        Thanh toán thành công!
      </Text>
      <Text className="text-center text-gray-700 mb-6">
        Cảm ơn bạn đã mua khóa học. Bạn có thể truy cập vào "Khóa học của tôi"
        để bắt đầu học ngay bây giờ.
      </Text>
      <Button
        title="Khóa học của tôi"
        onPress={handleGoToMyCourses}
        color="#4CAF50"
      />
    </View>
  );
};

export default PurchaseSuccess;
