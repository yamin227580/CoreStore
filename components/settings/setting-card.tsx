import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

type SettingCardProp = {
  children: React.ReactNode;
  title?: string;
  description?: string;
};

const SettingCard = ({ children, title, description }: SettingCardProp) => {
  return (
    <Card>
      <CardHeader>
        {title && description && (
          <>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </>
        )}
        {children}
      </CardHeader>
    </Card>
  );
};
export default SettingCard;
