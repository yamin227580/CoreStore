import ChangePassword from "@/components/settings/change-password";
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
      <main className="flex flex-1 flex-col lg:flex-row gap-4 pt-6">
        <div className="flex-1">
          <ProfileCard session={session} />
        </div>
        {!session.user.isOauth && (
          <div className="flex-1 space-y-4">
            <ChangePassword email={session.user.email!} />
            <TwoFactor />
          </div>
        )}
      </main>
    </SettingCard>
  );
};
export default Settings;
