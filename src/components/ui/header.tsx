// components/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import VerifAILogo from '@/components/svg/verifailogo';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-8">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <VerifAILogo className="h-16 w-auto" />
          </Link>
        </div>
        <div className="flex gap-4 text-lg">
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#investors" className="hover:text-primary transition-colors">
            Why It Wins
          </a>
          <a href="#contact" className="hover:text-primary transition-colors">
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
