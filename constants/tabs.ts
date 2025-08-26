import { Book, Heart, Star, UserCircle2 } from "lucide-react-native";
import i18n from "~/lib/i18n";

export const TABS = {
  NAVBAR: [
    {
      name: "index",
      title: i18n.t("navigation.home"),
      icon: Star,
    },
    {
      name: "learning",
      title: i18n.t("navigation.learning"),
      icon: Book,
    },
    {
      name: "whishlist",
      title: i18n.t("navigation.whishlist"),
      icon: Heart,
    },
    {
      name: "profile",
      title: i18n.t("navigation.profile"),
      icon: UserCircle2,
    },
  ],
};
