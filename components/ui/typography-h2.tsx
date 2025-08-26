import type { ReactNode } from "react";
import { Text } from "react-native";
import * as React from "react";

export function TypographyH1({
  children,
  className,
}: {
  readonly children: ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance ${className}`}
    >
      {children}
    </Text>
  );
}

export function TypographyH2({
  children,
  className,
}: {
  readonly children: ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
    >
      {children}
    </Text>
  );
}

export function TypographyH3({
  children,
  className,
}: {
  readonly children: ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </Text>
  );
}

export function TypographyH4({
  children,
  className,
}: {
  readonly children: ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`}
    >
      {children}
    </Text>
  );
}

export function TypographyH5({
  children,
  className,
}: {
  readonly children: ReactNode;
  className?: string;
}) {
  return (
    <Text
      className={`scroll-m-20 text-lg font-semibold tracking-tight ${className}`}
    >
      {children}
    </Text>
  );
}

export function TypographyP({
  children,
  className,
}: {
  readonly children: ReactNode;
  className?: string;
}) {
  return <Text className={`leading-7 text-base ${className}`}>{children}</Text>;
}
export function TypographyB({
  children,
  className,
}: {
  readonly children: ReactNode;
  className?: string;
}) {
  return (
    <Text className={`leading-7 text-base font-semibold ${className}`}>
      {children}
    </Text>
  );
}
