import z from "zod";
import {
  vStringPassword,
  vStringRequired,
  vStringEmail,
} from "~/constants/vadidate";
import i18n from "~/lib/i18n";

export const LoginSchema = z.object({
  email: vStringEmail(i18n.t("input.email")),
  password: vStringPassword(i18n.t("input.password")),
});

export const RegisterSchema = z
  .object({
    fullname: vStringRequired(i18n.t("input.fullname")),
    email: vStringEmail(i18n.t("input.email")),
    password: vStringPassword(i18n.t("input.password")),
    confirmPassword: vStringPassword(i18n.t("input.confirm-password")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t("messages.WEB_E_MSG_009"),
    path: ["confirmPassword"],
  });

export type LoginDTO = z.infer<typeof LoginSchema>;
export type RegisterDTO = z.infer<typeof RegisterSchema>;
