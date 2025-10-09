import * as React from "react";
import { View } from "react-native";
import { TypographyH4 } from "~/components/ui/typography-h2";

type SimpleWrapperProps = {
  title?: string;
  children: React.ReactNode;
};

export function SimpleWrapper({ children, title }: SimpleWrapperProps) {
  return (
    <View className="mx-1 mb-4">
      {title && <TypographyH4 className="mb-3">{title}</TypographyH4>}
      {children}
    </View>
  );
}
