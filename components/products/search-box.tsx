"use client";
import formatCurrency from "@/lib/formatCurrency";
import { VariantsWithProduct } from "@/lib/infer-types";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

type SearchBoxProps = {
  productWithVariants: VariantsWithProduct[];
};
const SearchBox = ({ productWithVariants }: SearchBoxProps) => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<VariantsWithProduct[]>([]);
  useEffect(() => {
    if (searchKey !== "") {
      const filterProducts = productWithVariants.filter((item) => {
        return item.product.title
          .toLowerCase()
          .includes(searchKey.toLowerCase());
      });
      setSearchResults(filterProducts);
    }
    if (searchKey === "") {
      setSearchResults([]);
    }
  }, [searchKey]);
  return (
    <main className="my-6 relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search product..."
          className="ps-8"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Search size={20} className="absolute top-2 left-2" />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute bg-white shadow-md rounded-md p-2 w-full max-h-80 overflow-y-scroll mt-2">
          <p className="my-2 text-sm font-medium ps-4">
            <span className="font-bold">{searchResults.length}</span> results
            found
          </p>
          {searchResults.map((item) => (
            <ul key={item.id}>
              <li>
                <Link
                  href={`products/${item.id}?vid=${item.id}&productId=${item.productId}&type=${item.productType}&image=${item.variantImages[0].image_url}&title=${item.product.title}&price=${item.product.price}`}
                  className="flex items-center justify-between py-2 border-b"
                >
                  <Image
                    src={item.variantImages[0].image_url}
                    alt={item.product.title}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <h2> {item.product.title}</h2>
                  <p>{formatCurrency(item.product.price)} USD</p>
                </Link>
              </li>
            </ul>
          ))}
        </div>
      )}
      {searchResults.length === 0 && searchKey !== "" && (
        <p className="my-2 text-sm font-medium ps-4 absolute mt-2 p-2 bg-white text-red-500 rounded-md shadow-sm w-full">
          No results found with this product name
        </p>
      )}
    </main>
  );
};
export default SearchBox;
