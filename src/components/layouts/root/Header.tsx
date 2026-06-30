import Image from "next/image";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";
import { SearchNormal1, ShoppingCart } from "iconsax-reactjs";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-background">
      <div className="max-w-306 mx-auto flex items-center justify-between gap-4 px-4 py-4 xl:px-0 lg:py-8">
        <div className="lg:hidden">
          <MobileMenu />
        </div>

        <div className="relative w-25.5 h-8 lg:w-38.75 lg:h-12.75">
          <Image src="/images/logo/logo.svg" fill alt="logo" />
        </div>
        <nav className="hidden lg:flex" aria-label="ناوبری اصلی">
          <NavLinks className="flex-row items-center gap-6" />
        </nav>

        <div className="flex items-center gap-x-1 lg:gap-x-2">
          <Button
            variant="secondary"
            aria-label="جستجو"
            className="hidden lg:flex p-1 lg:p-1.75"
          >
            <SearchNormal1 className="w-4 h-4 lg:w-6 lg:h-6" />
          </Button>

          <Button variant="secondary" asChild className="p-1 lg:p-1.75">
            <Link href="/cart" aria-label="سبد خرید">
              <ShoppingCart className="w-4 h-4 lg:w-6 lg:h-6" />
            </Link>
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
