import { auth } from "@/server/auth";
import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import SettingCard from "./setting-card";

const TwoFactor = async () => {
  const session = await auth();
  return (
    <SettingCard>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Two Factor Authentication</p>
        {session?.user.isTwofactorEnabled ? (
          <Button
            className="bg-primary text-white hover:bg-primary/70"
            size={"sm"}
          >
            <Check className="w-4 h-4 me-1" />
            On
          </Button>
        ) : (
          <Button
            className="bg-red-600 text-white hover:bg-red-400"
            size={"sm"}
          >
            <X className="w-4 h-4 me-1" />
            Off
          </Button>
        )}
      </div>
    </SettingCard>
  );
};
export default TwoFactor;
