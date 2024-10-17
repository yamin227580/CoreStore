"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import SettingCard from "./setting-card";

const LogOutBtn = () => {
  return (
    <SettingCard>
      <h2 className="text-sm font-semibold mb-2 text-red-600">Danger Zone</h2>
      <Button variant={"destructive"} onClick={() => signOut()}>
        <LogOut className="me-2" />
        Logout
      </Button>
    </SettingCard>
  );
};
export default LogOutBtn;
