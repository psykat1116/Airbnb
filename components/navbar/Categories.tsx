"use client";
import { usePathname, useSearchParams } from "next/navigation";

import Container from "@/components/Container";
import { CategorieList } from "@/constant/CategorieList";
import CategoryBox from "@/components/CategoryBox";

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const category = params?.get("category");
  const isMainPage = pathname === "/";
  if(!isMainPage) return null;
  return (
    <Container>
      <div className="pt-2 flex flex-row items-center justify-center overflow-x-auto">
        {CategorieList.map((item) => {
          return (
            <CategoryBox
              key={item.label}
              label={item.label}
              selected={category === item.label}
              icon={item.icon}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;
