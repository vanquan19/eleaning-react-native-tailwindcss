import * as React from "react";
import { View, TextInput, Text, Animated, StyleSheet } from "react-native";
import { cn } from "~/lib/utils";
// OTP Input Context to manage state
type OTPInputContextType = {
  slots: Array<{ char: string | null; isActive: boolean }>;
  handleInput: (value: string, index: number) => void;
  handleKeyPress: (key: string, index: number) => void;
};

const OTPInputContext = React.createContext<OTPInputContextType>({
  slots: [],
  handleInput: () => {},
  handleKeyPress: () => {},
});

const InputOTP = React.forwardRef<
  TextInput,
  {
    maxLength: number;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    containerClassName?: string;
    children: React.ReactNode;
  }
>(
  (
    {
      maxLength,
      value = "",
      onChange = () => {},
      className,
      containerClassName,
    },
    ref
  ) => {
    const [slots, setSlots] = React.useState<
      Array<{ char: string | null; isActive: boolean }>
    >(Array(maxLength).fill({ char: null, isActive: false }));
    const inputRefs = React.useRef<TextInput[]>([]);

    React.useEffect(() => {
      const chars = value.split("");
      setSlots((prev) =>
        prev.map((slot, index) => ({
          ...slot,
          char: chars[index] || null,
          isActive: index === chars.length,
        }))
      );
    }, [value]);

    const handleInput = (text: string, index: number) => {
      if (text.length > 1) return;
      const newValue = value.split("");
      newValue[index] = text;
      const updatedValue = newValue.join("").slice(0, maxLength);
      onChange(updatedValue);

      if (text && index < maxLength - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyPress = (key: string, index: number) => {
      if (key === "Backspace") {
        const newValue = value.split("");
        if (value[index]) {
          newValue[index] = "";
          onChange(newValue.join("").slice(0, maxLength));
        } else if (index > 0) {
          newValue[index - 1] = "";
          onChange(newValue.join("").slice(0, maxLength));
          inputRefs.current[index - 1]?.focus();
        }
      }
    };

    return (
      <OTPInputContext.Provider value={{ slots, handleInput, handleKeyPress }}>
        <View
          className={cn("flex flex-row items-center gap-2", containerClassName)}
        >
          {slots.map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && index % 3 === 0 && <InputOTPSeparator />}
              <InputOTPSlot
                index={index}
                ref={(el) => {
                  inputRefs.current[index] = el!;
                }}
              />
            </React.Fragment>
          ))}
        </View>
      </OTPInputContext.Provider>
    );
  }
);
InputOTP.displayName = "InputOTP";

const InputOTPSlot = React.forwardRef<
  TextInput,
  { index: number; className?: string; error?: string }
>(({ index, className, error }, ref) => {
  const { slots, handleInput, handleKeyPress } =
    React.useContext(OTPInputContext);
  const { char, isActive } = slots[index];
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
      className={cn(
        "relative h-12 w-12 items-center justify-center border border-gray-300 text-lg rounded-md",
        isActive && "border-primary",
        className,
        error && "border-red-500!"
      )}
    >
      <TextInput
        ref={ref}
        value={char || ""}
        onChangeText={(text) => handleInput(text, index)}
        onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key, index)}
        maxLength={1}
        keyboardType="numeric"
        className="h-full w-full text-center text-lg"
      />
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
    height: 16,
    backgroundColor: "black",
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
      <InputOTP maxLength={maxLength} value={value} onChange={onChange}>
        <InputOTPGroup>
          <InputOTPSlot index={0} error={error} />
          <InputOTPSlot index={1} error={error} />
          <InputOTPSlot index={2} error={error} />
          {style === "separator" && <InputOTPSeparator />}
          <InputOTPSlot index={3} error={error} />
          <InputOTPSlot index={4} error={error} />
          <InputOTPSlot index={5} error={error} />
        </InputOTPGroup>
      </InputOTP>
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
