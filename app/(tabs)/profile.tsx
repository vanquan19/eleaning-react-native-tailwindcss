import * as React from "react";
import { Alert, Image, ScrollView, Switch, View } from "react-native";
import ScreenLayout from "~/components/common/screen-layout";
import {
  TypographyH4,
  TypographyH5,
  TypographyP,
} from "~/components/ui/typography-h2";
import authStore from "~/stores/auth.store";
import { useUserProfile } from "~/hooks/queries/useUserQuery";
import { Button } from "~/components/ui/button";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { ROUTES } from "~/constants/router";
import { RequireLogin } from "~/components/common/require-login";
import { TouchableOpacity } from "react-native";
import COLORS from "~/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { includes } from "lodash-es";
import { Role } from "~/types/enum";

export default function ProfileScreen() {
  const auth = authStore.use.auth();
  const clearAuth = authStore.use.clearAuth();
  const { t } = useTranslation();
  const { data: user } = useUserProfile({
    config: { enabled: !!auth },
  });

  if (!auth) {
    return <RequireLogin />;
  }

  const handleBecomeInstructor = () => {
    Alert.alert(
      "Trở thành giảng viên",
      "Bạn sẽ được chuyển đến trang đăng ký giảng viên"
    );
  };

  const menuItems = [
    {
      section: "Học tập",
      items: [
        {
          id: "my-courses",
          title: "Khóa học của tôi",
          subtitle: "Xem tất cả khóa học",
          icon: "play-circle",
          color: COLORS.primary,
          onPress: () => router.push(ROUTES.MY_COURSES.path),
        },
        {
          id: "certificates",
          title: "Chứng chỉ",
          subtitle: "Chứng chỉ đã nhận",
          icon: "ribbon",
          color: COLORS.warning,
          onPress: () =>
            Alert.alert("Chứng chỉ", "Danh sách chứng chỉ đã nhận"),
        },
        {
          id: "downloads",
          title: "Tải xuống",
          subtitle: "Video đã tải",
          icon: "download",
          color: COLORS.success,
          onPress: () => Alert.alert("Tải xuống", "Danh sách video đã tải"),
        },
      ],
    },
    {
      section: "Giảng dạy",

      items: [
        {
          id: "become-instructor",
          title:
            includes(auth?.roles, Role.Admin) ||
            includes(auth?.roles, Role.Teacher)
              ? "Quản lý giảng viên"
              : "Trở thành giảng viên",
          subtitle: "Chia sẻ kiến thức của bạn",
          icon: "school",
          color: COLORS.accent,
          onPress: handleBecomeInstructor,
          highlight: true,
        },
      ],
    },
    {
      section: "Cài đặt",
      items: [
        {
          id: "notifications",
          title: "Thông báo",
          subtitle: "Quản lý thông báo",
          icon: "notifications",
          color: COLORS.info,
          hasSwitch: true,
          // switchValue: notificationsEnabled,
          // onSwitchChange: setNotificationsEnabled,
        },
        {
          id: "language",
          title: "Ngôn ngữ",
          subtitle: "Tiếng Việt",
          icon: "language",
          color: COLORS.secondary,
          onPress: () => Alert.alert("Ngôn ngữ", "Chọn ngôn ngữ hiển thị"),
        },
        {
          id: "dark-mode",
          title: "Chế độ tối",
          subtitle: "Giao diện tối",
          icon: "moon",
          color: COLORS.gray600,
          hasSwitch: true,
          // switchValue: darkModeEnabled,
          // onSwitchChange: setDarkModeEnabled,
        },
      ],
    },
    {
      section: "Hỗ trợ",
      items: [
        {
          id: "chatbot",
          title: "Chatbot hỗ trợ",
          subtitle: "Trợ lý ảo",
          icon: "chatbubbles",
          color: COLORS.primary,
          onPress: () => router.push(ROUTES.CHATBOT.path),
        },
        {
          id: "help",
          title: "Trợ giúp & Hỗ trợ",
          subtitle: "FAQ, Liên hệ",
          icon: "help-circle",
          color: COLORS.primaryLight,
          onPress: () => Alert.alert("Trợ giúp", "Trang hỗ trợ và FAQ"),
        },
        {
          id: "privacy",
          title: "Chính sách bảo mật",
          subtitle: "Quyền riêng tư",
          icon: "shield-checkmark",
          color: COLORS.success,
          onPress: () =>
            Alert.alert("Chính sách bảo mật", "Thông tin bảo mật dữ liệu"),
        },
        {
          id: "terms",
          title: "Điều khoản sử dụng",
          subtitle: "Quy định dịch vụ",
          icon: "document-text",
          color: COLORS.textSecondary,
          onPress: () =>
            Alert.alert("Điều khoản", "Các điều khoản và quy định"),
        },
      ],
    },
  ];

  const handleLogout = () => {
    clearAuth();
    router.replace(ROUTES.LOGIN.path);
  };

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      className="flex flex-row justify-between p-4 border-b border-gray-200"
      onPress={item.onPress}
    >
      <View className="flex flex-row items-center">
        <View
          className="w-11 h-11 rounded-xl mr-3 items-center justify-center"
          style={{ backgroundColor: item.color + "15" }}
        >
          <Ionicons name={item.icon as any} size={22} color={item.color} />
        </View>
        <View>
          <TypographyH5>{item.title}</TypographyH5>
          <TypographyP>{item.subtitle}</TypographyP>
        </View>
      </View>

      <View className="flex flex-row items-center gap-8">
        {item.hasSwitch ? (
          <Switch
            value={item.switchValue}
            onValueChange={item.onSwitchChange}
            trackColor={{ false: COLORS.gray300, true: COLORS.primary + "50" }}
            thumbColor={item.switchValue ? COLORS.primary : COLORS.gray400}
          />
        ) : (
          <>
            {item.highlight && (
              <View>
                <TypographyH5>NEW</TypographyH5>
              </View>
            )}
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray400} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center justify-center">
          <Image
            source={require("~/assets/images/logo-icon.png")}
            className="w-40 h-40 rounded-full object-cover"
          />
          <TypographyH4>{auth?.fullName}</TypographyH4>
          <TypographyP>{auth?.email}</TypographyP>
        </View>
        <View className="mt-4">
          {menuItems.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-6">
              <TypographyH4>{section.section}</TypographyH4>
              <View className="bg-white rounded shadow">
                {section.items.map(renderMenuItem)}
              </View>
            </View>
          ))}

          <Button
            variant="outline"
            onPress={handleLogout}
            className="w-full mx-auto mb-4"
          >
            {t("buttons.logout")}
          </Button>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
}
