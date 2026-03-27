"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import renderIcons from "@/utils/renderIcons";
import { AiOutlineLogout } from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import Cookies from "js-cookie";

type IconName =
  | "AiOutlineDashboard"
  | "LiaQuestionSolid"
  | "FaComputer"
  | "PiUsersThreeFill";

const navOptions: { name: string; href: string; icon: IconName }[] = [
  { name: "Dashboard", href: "/examination/admin", icon: "AiOutlineDashboard" },
  {
    name: "Questions",
    href: "/examination/admin/questions",
    icon: "LiaQuestionSolid",
  },
  { name: "Users", href: "/examination/admin/users", icon: "PiUsersThreeFill" },
  {
    name: "Assignments",
    href: "/examination/admin/assignments",
    icon: "FaComputer",
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    Cookies.remove("session_token", { path: "/" });
    Cookies.remove("userRole", { path: "/" });
    setTimeout(() => {
      router.push("/examination");
    }, 1000);
  };

  return (
    <div
      className="flex w-full min-h-screen m-0 p-0 bg-gray-50"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Sidebar */}
      <aside className="w-55 min-h-screen bg-white border-r border-gray-100 flex flex-col justify-between py-6 px-4 shadow-sm shrink-0">
        {/* Logo / Brand */}
        <div>
          <div className="flex items-center gap-2.5 px-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">
                Admin
              </p>
              <p className="text-xs text-gray-400 leading-tight">
                Control Panel
              </p>
            </div>
          </div>

          {/* Nav label */}
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 mb-2">
            Navigation
          </p>

          <nav className="space-y-1">
            {navOptions.map((option) => {
              const isActive = pathname === option.href;
              return (
                <Link
                  key={option.name}
                  href={option.href}
                  className="block w-full"
                >
                  <span
                    className={`flex items-center gap-3 rounded-lg w-full py-2.5 px-3 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-violet-50 text-violet-700 shadow-sm border border-violet-100"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                  >
                    <span
                      className={isActive ? "text-violet-600" : "text-gray-400"}
                    >
                      {renderIcons(option.icon, 17, "inherit")}
                    </span>
                    {option.name}
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="px-1">
          <div className="h-px bg-gray-100 mb-4" />
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-2.5 text-sm font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 px-3 py-2.5 rounded-lg transition-all duration-150 group"
          >
            {isLoggingOut ? (
              <>
                <ImSpinner2 className="animate-spin text-gray-400" size={16} />
                <span className="text-gray-400">Logging out...</span>
              </>
            ) : (
              <>
                <AiOutlineLogout
                  size={16}
                  className="group-hover:text-red-500 text-gray-400 transition-colors"
                />
                Logout
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-h-screen overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
