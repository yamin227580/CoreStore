import ChangePassword from "@/components/settings/change-password";
import LogOutBtn from "@/components/settings/log-out";
import ProfileCard from "@/components/settings/profile-card";
import SettingCard from "@/components/settings/setting-card";
import TwoFactor from "@/components/settings/two-factor";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <SettingCard title="Settings" description="Manage your account settings">
      <main className="flex flex-col gap-4">
        <ProfileCard session={session} />
        {!session.user.isOauth && (
          <>
            <ChangePassword email={session.user.email!} />
            <TwoFactor
              isTwoFactorEnabled={session.user.isTwofactorEnabled}
              email={session.user.email!}
            />
          </>
        )}
        <LogOutBtn />
      </main>
    </SettingCard>
  );
};
export default Settings;
