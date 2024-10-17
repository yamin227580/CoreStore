"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { UserRoundPen } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { Button } from "../ui/button";
import AvatarUploadForm from "./avatar-upload-form";
import ProfileForm from "./profile-form";
import SettingCard from "./setting-card";

type ProfileCardProps = {
  session: Session;
};
const ProfileCard = ({ session }: ProfileCardProps) => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SettingCard>
      <div className="flex items-start  justify-between">
        <div className="flex items-start gap-2">
          <AvatarUploadForm
            image={session.user.image}
            name={session.user.name!}
            email={session.user.email!}
          />
          <div>
            <h2 className="font-semibold text-lg">{session.user?.name}</h2>
            <p className="font-medium text-sm text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </div>
        {isDesktop ? (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  This will be your public display name.
                </DialogDescription>
              </DialogHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
                setIsOpen={setIsOpen}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"outline"} className="w-full">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <UserRoundPen className="w-5 h-5 text-muted-foreground hover:text-black cursor-pointer" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edit Profile</DrawerTitle>
                <DrawerDescription>
                  This will be your public display name.
                </DrawerDescription>
              </DrawerHeader>
              <ProfileForm
                name={session.user?.name!}
                email={session.user?.email!}
                setIsOpen={setIsOpen}
              />
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </SettingCard>
  );
};
export default ProfileCard;
