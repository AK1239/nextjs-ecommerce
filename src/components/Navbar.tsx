import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const user = undefined;
  const isAdmin = false;

  return (
    <nav
      className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200
bg-white/75 backdrop-blur-lg transition-all"
    >
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            case<span className="text-green-600">cobra</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign Out
                </Link>
                {isAdmin ? (
                  <Link
                    href="/api/auth/logout"
                    className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    className: "hidden sm:flex items-center gap-1",
                    size: "sm",
                  })}
                >
                  Create Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Sign Up
                </Link>

                <Link
                  href="/api/auth/login"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Login
                </Link>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block"></div>

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    className: "hidden sm:flex items-center gap-1",
                    size: "sm",
                  })}
                >
                  Create Case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
