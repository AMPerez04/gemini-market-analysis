// components/Footer.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-8  mt-12 z-10 bg-var(--footer)">
      <div className="flex flex-col sm:flex-row items-center justify-between mx-auto text-sm text-foreground">
        <span>© {new Date().getFullYear()} VerifAI. All rights reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="https://www.linkedin.com/in/austin-m-perez/" className="hover:underline " target="_blank" rel="noopener noreferrer">
            Austin's Linkedin
            </a>
          <a href="https://www.linkedin.com/in/reyyu/" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Rey's Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
