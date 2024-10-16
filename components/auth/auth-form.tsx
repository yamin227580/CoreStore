import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AuthFooter from "./auth-footer";
import ProviderLogin from "./provider-login";

type AuthFormProp = {
  children: React.ReactNode;
  formTitle: string;
  showProvider: boolean;
  footerLabel: string;
  footerHref: string;
};

const AuthForm = ({
  children,
  formTitle,
  showProvider,
  footerHref,
  footerLabel,
}: AuthFormProp) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {showProvider && <ProviderLogin />}
      </CardContent>
      <CardFooter>
        <AuthFooter footerLabel={footerLabel} footerHref={footerHref} />
      </CardFooter>
    </Card>
  );
};
export default AuthForm;
