"use client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const tags = [
  {
    id: 1,
    name: "iPhone",
    tag: "iphone",
  },
  {
    id: 2,
    name: "iPad",
    tag: "ipad",
  },
  {
    id: 3,
    name: "Apple Watch",
    tag: "apple watch",
  },
  {
    id: 4,
    name: "Cover",
    tag: "cover",
  },
  {
    id: 5,
    name: "MacBook",
    tag: "macbook",
  },
  {
    id: 6,
    name: "Accessories",
    tag: "accessories",
  },
];
const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";
  const handleTagClick = (tag: string) => {
    if (tag === tagParams) {
      router.push(`?tag=${tagParams}`);
    } else {
      router.push(`?tag=${tag}`);
    }
  };
  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium mb-4 flex-wrap">
      {tags.map((t) => (
        <p
          key={t.id}
          className={cn(
            "cursor-pointer rounded-md border-2 border-black px-2 py-1",
            t.tag === tagParams && "bg-black text-white"
          )}
          onClick={() => handleTagClick(t.tag)}
        >
          {t.name}
        </p>
      ))}
    </div>
  );
};
export default TagFilter;
