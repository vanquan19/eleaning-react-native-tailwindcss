import React from "react";
import {
  TextInput as RNTextInput,
  TextInputProps,
  Text,
  View,
} from "react-native";
import { Controller } from "react-hook-form";
import { cn } from "~/lib/utils";

// Custom TextInput Component
interface CustomTextInputProps extends TextInputProps {
  name: string;
  control: any; // From react-hook-form
  placeholder?: string;
  error?: string;
  label?: string;
  labelClassName?: string;
  className?: string;
}

const Input: React.FC<CustomTextInputProps> = ({
  name,
  label,
  labelClassName,
  control,
  placeholder,
  error,
  className,
  ...rest
}) => {
  return (
    <View className="mb-2">
      {label && (
        <Text
          className={cn(
            "mb-1 text-base font-medium text-foreground",
            labelClassName
          )}
        >
          {label}
        </Text>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <RNTextInput
            placeholder={placeholder}
            className={cn(
              "rounded-lg border text-base placeholder:text-gray-400 focus:border-primary",
              {
                "border-red-500": error,
                "border-gray-300": !error,
              },
              className
            )}
            style={{ paddingHorizontal: 12, paddingVertical: 12 }}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...rest}
          />
        )}
      />
      <Text className="h-7 leading-7 text-sm text-red-500">{error}</Text>
    </View>
  );
};

export { Input };
