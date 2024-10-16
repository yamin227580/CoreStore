"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

const ProviderLogin = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button
        variant={"outline"}
        onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}
      >
        <p className="flex items-center gap-4">
          Login with Google <FcGoogle />
        </p>
      </Button>
      <Button
        variant={"outline"}
        onClick={() => signIn("github", { redirect: false, callbackUrl: "/" })}
      >
        <p className="flex items-center gap-4">
          Login with Github <FaGithub />
        </p>
      </Button>
    </div>
  );
};
export default ProviderLogin;
