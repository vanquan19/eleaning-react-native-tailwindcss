import { z } from "zod";

import { MAX_LENGTH } from "~/constants/common";
import i18n from "~/lib/i18n";

const PASSWORD_VALIDATION = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\-_,.@#$%^&*/:;\\+]{8,}$/
);

export const vStringPassword = (field: string) =>
  z
    .string()
    .min(1, { message: i18n.t("message:WEB_E_MSG_001", { field }) })
    .max(MAX_LENGTH[100], {
      message: i18n.t("message:WEB_E_MSG_003", {
        field,
        field2: MAX_LENGTH[100],
      }),
    })
    .regex(PASSWORD_VALIDATION, {
      message: i18n.t("message:WEB_E_MSG_002"),
    });

export const vStringEmail = (field: string) => {
  return z
    .string()
    .min(1, { message: i18n.t("message:WEB_E_MSG_001", { field }) })
    .max(MAX_LENGTH[100], {
      message: i18n.t("message:WEB_E_MSG_003", {
        field,
        field2: MAX_LENGTH[100],
      }),
    })
    .email({ message: i18n.t("message:WEB_E_MSG_008") });
};

export const vStringRequired = (field: string) =>
  z
    .string({
      message: i18n.t("message:WEB_E_MSG_001", { field }),
    })
    .min(1, { message: i18n.t("message:WEB_E_MSG_001", { field }) });

export const vFile = (
  field: string,
  acceptedTypes: string[],
  maxBytes: number
) =>
  z
    .any()
    .refine((file) => !file || file instanceof File, {
      message: i18n.t("edit-profile:file_001", { field }),
    })
    .refine(
      (file) =>
        !file || (file.size <= maxBytes && acceptedTypes.includes(file.type)),
      {
        message: i18n.t("edit-profile:file_002", {
          field,
          maxSize: maxBytes / (1024 * 1024),
        }),
      }
    );
