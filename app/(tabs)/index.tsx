import React from "react";
import { useForm } from "react-hook-form";
import ScreenLayout from "~/components/common/screen-layout";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExampleDTO, exampleSchema } from "~/schema/example.schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const form = useForm<ExampleDTO>({
    resolver: zodResolver(exampleSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const onSubmit = (data) => {
    router.push("/login");
  };
  return (
    <ScreenLayout>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <Input
              label="Name"
              name="name"
              control={form.control}
              placeholder="Your name"
              error={form.formState.errors.name?.message}
            />
            <Button onPress={form.handleSubmit(onSubmit)}>Submit</Button>
          </Form>
        </CardContent>
      </Card>
    </ScreenLayout>
  );
}
