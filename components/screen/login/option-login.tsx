import { Link, router } from "expo-router";
import * as React from "react";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/constants/router";
import i18n from "~/lib/i18n";
import { ToastAndroid } from "react-native";
import { storageServices } from "~/utils/localStorageServices";
import { useUserProfile } from "~/hooks/queries/useUserQuery";
import { API_STATUS } from "~/constants/api";
import authStore from "~/stores/auth.store";

export function OptionLogin() {
  // const setAuth = authStore.use.setAuth();
  // const { refetch } = useUserProfile({
  //   config: {
  //     enabled: false,
  //   },
  // });
  // const { mutate: loginWithGoogle } = useGoogleLogin({
  //   config: {
  //     onSuccess: (data) => {
  //       if (data.success === false) {
  //         ToastAndroid.show(
  //           data?.message ?? "Tài khoản hoặc mật khẩu không chính xác!",
  //           ToastAndroid.LONG
  //         );
  //         return;
  //       }
  //       storageServices.setAccessToken(data.data?.accessToken ?? "");
  //       storageServices.setRefreshToken(data.data?.refreshToken ?? "");
  //       refetch().then((result) => {
  //         console.log("result", result);
  //         if (result.data?.data && result.data?.status === API_STATUS.SUCCESS) {
  //           const profile = result.data.data;

  //           setAuth({
  //             id: profile.id,
  //             email: profile.email,
  //             fullName: profile.fullName,
  //             avatar: profile.avatar,
  //             roles: profile.roles,
  //           });
  //           ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.LONG);
  //           router.replace(ROUTES.HOME.path);
  //         }
  //       });
  //     },
  //   },
  // });

  // const handleLoginGoogle = async () => {
  //   await GoogleSignin.signOut();
  //   await GoogleSignin.hasPlayServices();

  //   const userInfo = await GoogleSignin.signIn();

  //   const idToken = userInfo.data?.idToken;
  //   if (!idToken) {
  //     ToastAndroid.show(
  //       "Đang nhập thất bại: Token không hợp lệ",
  //       ToastAndroid.LONG
  //     );
  //     return;
  //   }

  //   loginWithGoogle(idToken);
  // };
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
