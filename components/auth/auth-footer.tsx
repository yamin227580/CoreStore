import Link from "next/link";
import { Button } from "../ui/button";

type AuthFooterProps = {
  footerLabel: string;
  footerHref: string;
};

const AuthFooter = ({ footerLabel, footerHref }: AuthFooterProps) => {
  return (
    <Button asChild variant={"link"} className="w-full">
      <Link href={footerHref} className="text-right">
        {footerLabel}
      </Link>
    </Button>
  );
};
export default AuthFooter;
