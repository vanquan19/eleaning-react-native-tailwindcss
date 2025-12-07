import * as React from "react";
import { View, TextInput, Text, Animated, StyleSheet } from "react-native";
import { cn } from "~/lib/utils";

const InputOTP = React.forwardRef<
  TextInput,
  {
    maxLength: number;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    containerClassName?: string;
  }
>(({ maxLength, value = "", onChange = () => {}, containerClassName }) => {
  const hiddenInputRef = React.useRef<TextInput>(null);
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  React.useEffect(() => {
    setFocusedIndex(value.length);
  }, [value]);

  const handleContainerPress = () => {
    hiddenInputRef.current?.focus();
  };

  return (
    <View className={cn("flex flex-col items-center", containerClassName)}>
      <View
        className={cn("flex flex-row items-center gap-2")}
        onTouchEnd={handleContainerPress}
      >
        {Array.from({ length: maxLength }).map((_, index) => (
          <React.Fragment key={index}>
            {index > 0 && index % 3 === 0 && <InputOTPSeparator />}
            <InputOTPSlot
              index={index}
              char={value[index] || null}
              isActive={index === focusedIndex}
            />
          </React.Fragment>
        ))}
      </View>
      <TextInput
        ref={hiddenInputRef}
        value={value}
        onChangeText={onChange}
        maxLength={maxLength}
        keyboardType="numeric"
        style={styles.hiddenInput}
        autoFocus
      />
    </View>
  );
});
InputOTP.displayName = "InputOTP";

const InputOTPSlot = React.forwardRef<
  View,
  {
    index: number;
    char: string | null;
    isActive: boolean;
    className?: string;
    error?: string;
  }
>(({ index, char, isActive, className, error }, ref) => {
  const [blinkAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      blinkAnim.setValue(0);
    }
  }, [isActive, blinkAnim]);

  return (
    <View
      ref={ref}
      className={cn(
        "relative h-12 w-12 items-center justify-center border border-gray-300 text-lg rounded-md",
        isActive && "border-primary",
        className,
        error && "border-red-500!"
      )}
    >
      <Text className="text-lg font-medium">{char || ""}</Text>
      {isActive && !char && (
        <Animated.View
          style={[
            styles.caret,
            {
              opacity: blinkAnim,
            },
          ]}
        />
      )}
    </View>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPGroup = React.forwardRef<
  View,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => (
  <View ref={ref} className={cn("flex flex-row items-center", className)}>
    {children}
  </View>
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSeparator = React.forwardRef<View, { className?: string }>(
  ({ className }, ref) => (
    <View ref={ref} className={cn("h-1 w-2 bg-gray-500", className)}>
      <Text className="text-center text-lg">-</Text>
    </View>
  )
);
InputOTPSeparator.displayName = "InputOTPSeparator";

const styles = StyleSheet.create({
  caret: {
    position: "absolute",
    width: 2,
    height: 20,
    backgroundColor: "#000",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    height: 1,
    width: 1,
  },
});

const SimpleOTPInput = React.forwardRef<
  View,
  {
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    maxLength?: number;
    style?: "separator" | "default";
    error?: string;
  }
>(
  (
    {
      className = "",
      value,
      onChange,
      maxLength = 6,
      style = "default",
      error,
    },
    ref
  ) => (
    <View
      ref={ref}
      className={cn(
        "flex flex-row items-center mb-6 justify-center",
        className
      )}
    >
      <InputOTP maxLength={maxLength} value={value} onChange={onChange} />
    </View>
  )
);
SimpleOTPInput.displayName = "SimpleOTPInput";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  SimpleOTPInput,
};
