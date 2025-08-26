/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";
const Colors = {
  light: {
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#6366F1",
    primaryLight: "#818CF8",
    primaryDark: "#4F46E5",
    secondary: "#8B5CF6",
    accent: "#A855F7",
    gradientStart: "#667EEA",
    gradientEnd: "#764BA2",
    success: "#10B981",
    danger: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
    background: "#F8FAFC",
    surface: "#FFFFFF",
    text: "#1E293B",
    textSecondary: "#64748B",
    textLight: "#94A3B8",
    border: "#E2E8F0",
    inputBackground: "#F1F5F9",
    gray50: "#F8FAFC",
    gray100: "#F1F5F9",
    gray200: "#E2E8F0",
    gray300: "#CBD5E1",
    gray400: "#94A3B8",
    gray500: "#64748B",
    gray600: "#475569",
    gray700: "#334155",
    gray800: "#1E293B",
    gray900: "#0F172A",
    star: "#FFD700",
    white: "#FFFFFF",
    black: "#000000",
    shadow: "#000000",
    badge: "#FF3B30",
    badgeText: "#FFFFFF",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
} as const;

export default Colors.light; // TODO: Check context for dark mode
