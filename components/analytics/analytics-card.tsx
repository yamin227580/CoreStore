import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Card, CardHeader } from "../ui/card";

type AnalyticsCardProps = {
  title: string;
  count: number;
  icon: React.ReactNode;
  href: string;
};
const AnalyticsCard = ({ title, count, icon, href }: AnalyticsCardProps) => {
  const isPendingCard = title === "Pending Orders";
  return (
    <Link href={href}>
      <Card className={cn(isPendingCard && "bg-black text-white")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            {icon}
            <h2 className="text-2xl font-bold">{count}+</h2>
          </div>
          <p className="font-medium"> {title}</p>
        </CardHeader>
      </Card>
    </Link>
  );
};
export default AnalyticsCard;
