import type { ReactNode } from "react";
import { Text } from "react-native";
import * as React from "react";

export function TypographyH1({ children }: { readonly children: ReactNode }) {
  return (
    <Text className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </Text>
  );
}

export function TypographyH2({ children }: { readonly children: ReactNode }) {
  return (
    <Text className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </Text>
  );
}

export function TypographyH3({ children }: { readonly children: ReactNode }) {
  return (
    <Text className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </Text>
  );
}

export function TypographyH4({ children }: { readonly children: ReactNode }) {
  return (
    <Text className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </Text>
  );
}

export function TypographyH5({ children }: { readonly children: ReactNode }) {
  return (
    <Text className="scroll-m-20 text-lg font-semibold tracking-tight">
      {children}
    </Text>
  );
}

export function TypographyP({ children }: { readonly children: ReactNode }) {
  return <Text className="leading-7 text-base">{children}</Text>;
}
export function TypographyB({ children }: { readonly children: ReactNode }) {
  return <Text className="leading-7 text-base font-semibold">{children}</Text>;
}
