"use client";
import { User } from "@prisma/client";

import Logo from "@/components/navbar/Logo";
import Container from "@/components/Container";
import Search from "@/components/navbar/Search";
import UserMenu from "@/components/navbar/UserMenu";
import Categories from "@/components/navbar/Categories";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-3 border-b-[1px]">
        <Container>
          <div className="w-full flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
};

export default Navbar;
