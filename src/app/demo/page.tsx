"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { GaugeChart } from "./components/GaugeChart";

// Container and item variants for general fade and staggered animations.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type AnimatedBarProps = {
  label: string;
  value: string;
  percentage: number;
};

const AnimatedBar = ({ label, value, percentage }: AnimatedBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
        <motion.div
          className="bg-indigo-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function DemoPage() {
  // State for user input and simulated insights.
  const [startupName, setStartupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    tam: string;
    sam: string;
    som: string;
    competitor: string;
    startupGrade: string;
  } | null>(null);

  // Simulate generating insights.
  const handleGetInsights = () => {
    if (!startupName.trim()) return;
    setLoading(true);
    setResults(null);

    // Simulate an asynchronous operation.
    setTimeout(() => {
      const dummyData = {
        tam: "1B",
        sam: "500M",
        som: "100M",
        competitor: "Competitor X is the current market leader.",
        startupGrade: "A+",
      };
      setResults(dummyData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="py-6 px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/next.svg" alt="Logo" width={40} height={40} />
            <span className="text-lg font-bold tracking-tight">
              InsightSpark AI
            </span>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/demo" className="hover:text-primary transition-colors">
              Demo
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* Demo Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Experience Market Research in Action
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          Enter a startup name below and see how our AI instantly generates market
          insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter Industry"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleGetInsights} disabled={loading} size="lg">
            {loading ? "Analyzing..." : "Get Insights"}
          </Button>
        </div>

        {/* Animated Results */}
        {results && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
            className="max-w-md w-full"
          >
            <Card>
              <CardContent className="space-y-4">
                <motion.h2
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className="text-2xl font-bold"
                >
                  Market Insights for {startupName}
                </motion.h2>

                {/* Animated Bar Graphs for TAM, SAM, SOM */}
                <AnimatedBar label="TAM" value={results.tam} percentage={100} />
                <AnimatedBar label="SAM" value={results.sam} percentage={50} />
                <AnimatedBar label="SOM" value={results.som} percentage={10} />

                {/* Gauge Chart for the Startup Grade */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <GaugeChart grade={results.startupGrade} />
                </motion.div>

                {/* Additional Text Results */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  className="text-left space-y-2"
                >
                  <p>
                    <strong>Competitor Insight:</strong> {results.competitor}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 px-8 border-t mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} InsightSpark. All rights reserved.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="https://nextjs.org" className="hover:underline">
              Next.js
            </a>
            <a href="https://ui.shadcn.com" className="hover:underline">
              shadcn/ui
            </a>
            <a href="https://tailwindcss.com" className="hover:underline">
              Tailwind CSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
