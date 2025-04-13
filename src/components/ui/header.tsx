"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import VerifAILogo from "@/components/svg/verifailogo";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react"; // or use your preferred icons

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  return (
    <header className="py-6 px-8 z-10">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            {mounted && <VerifAILogo className="h-16 w-auto" theme={theme as "light" | "dark"} />}

          </Link>
        </div>

        <div className="flex items-center gap-4 text-2xl font-bold">
          <Link href="/" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="/demo" className="hover:text-primary transition-colors">
            Try the Demo
          </Link>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-4 p-2 rounded-full  hover:bg-muted transition"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
