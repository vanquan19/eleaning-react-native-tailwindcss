import z from "zod";
import { vStringRequired } from "~/constants/vadidate";
import i18n from "~/lib/i18n";

export const LoginSchema = z.object({
  email: vStringRequired(i18n.t("common.email")),
  password: vStringRequired(i18n.t("common.password")),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
