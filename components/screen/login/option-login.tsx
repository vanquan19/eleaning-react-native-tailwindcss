import { Link } from "expo-router";
import React from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/constants/router";
import i18n from "~/lib/i18n";

export function OptionLogin() {
  return (
    <Button variant="outline" className="items-center mb-4">
      <Avatar alt="Google">
        <AvatarImage source={require("~/assets/images/logo-google.png")} />
      </Avatar>
      <Link href={ROUTES.REGISTER.path}>
        {i18n.t("login.login-with-google")}
      </Link>
    </Button>
  );
}
