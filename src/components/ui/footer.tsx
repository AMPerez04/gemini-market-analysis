// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-8  mt-12 z-10 bg-foreground">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} InsightSpark. All rights reserved.</span>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="https://nextjs.org" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Next.js
          </a>
          <a href="https://ui.shadcn.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
            shadcn/ui
          </a>
          <a href="https://tailwindcss.com" className="hover:underline" target="_blank" rel="noopener noreferrer">
            Tailwind CSS
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
