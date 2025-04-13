// components/Header.tsx
"use client";

import React from "react";
import Link from "next/link";
import VerifAILogo from '@/components/svg/verifailogo';

const Header: React.FC = () => {
  return (
    <header className="py-6 px-8 z-10">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <VerifAILogo className="h-16 w-auto" />
          </Link>
        </div>
        <div className="flex gap-4 text-lg">
          <Link href="#features" className="hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#investors" className="hover:text-primary transition-colors">
            What we Offer
          </Link>
          <Link href="/demo" className="hover:text-primary transition-colors">
            Try the Demo
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
