import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, TextInput as RNTextInput, Text } from "react-native";
import { Button } from "~/components/ui/button";
import { SimpleOTPInput } from "~/components/ui/input-otp";
import { OtpSchema, VerifyCodeDTO } from "~/schema/auth.schema";

export function FormOTP() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeDTO>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: VerifyCodeDTO) => {
    const otp = Object.values(data).join("");
    console.log("Submitted OTP:", data, otp);
  };
  console.log("Error state for OTP input:", errors.otp?.message);

  return (
    <View className="p-4">
      <Controller
        control={control}
        name="otp"
        rules={{
          required: "OTP is required",
          pattern: {
            value: /^\d{6}$/,
            message: "OTP must be a 6-digit number",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <SimpleOTPInput
            value={value}
            onChange={onChange}
            error={errors.otp?.message}
          />
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
    </View>
  );
}
