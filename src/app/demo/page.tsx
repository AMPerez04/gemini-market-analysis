"use client";

import { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

import { GaugeChart } from "./components/GaugeChart";
import generateContent from "./api/geminiapi";
import { generatePrompt } from "./api/generatePrompt";

// Updated container variants to stagger children one at a time.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // each child appears 1.0 seconds apart
    },
  },
};

// Updated item variants: start above (y: -20) and drop into place.
const itemVariants = {
  hidden: { opacity: 0, y: -20 },
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
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

// Helper function to parse Gemini's response string.
// It removes markdown code fences and parses the JSON.
function parseGeminiResponse(
  responseText: string
): {
  tam: string;
  sam: string;
  som: string;
  competitor: string;
  startupGrade: string;
} {
  const cleanedText = responseText
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "");
  console.log(cleanedText);
  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    throw new Error("Failed to parse Gemini response: " + error);
  }
}

const loaderPhrases = [
  "Evaluating your idea...",
  "Performing market research...",
  "Crunching numbers...",
  "Optimizing outcomes...",
  "Analyzing competitors...",
  "Generating insights...",
  "Assessing potential...",
  "Validating market fit...",
];

export default function DemoPage() {
  // State for user input and insights.
  const [startupName, setStartupName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [results, setResults] = useState<{
    tam: string;
    sam: string;
    som: string;
    competitor: string;
    startupGrade: string;
  } | null>(null);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % loaderPhrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [loading]);
  

  // Memoized function to get insights from Gemini.
  const handleGetInsights = useCallback(async () => {
    if (!startupName.trim()) return;
    setLoading(true);
    setResults(null);

    const prompt = generatePrompt(startupName);

    try {
      const rawData = (await generateContent([{ text: prompt }])) as {
        candidates: { content: { parts: { text: string }[] } }[];
      };
      console.log("Gemini Flash raw response:", rawData);
      const parsedData = parseGeminiResponse(
        rawData.candidates[0].content.parts[0].text
      );
      console.log("Parsed Gemini response:", parsedData);
      setResults(parsedData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error generating content:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [startupName]);

  return (
    <div className=" bg-background text-foreground flex flex-col">


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
            placeholder="Enter Startup Idea"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
            className="flex-1 h-10"
          />
          <Button
            onClick={handleGetInsights}
            disabled={loading}
            size="lg"
            className="h-10"
          >
            {loading ? "Analyzing..." : "Get Insights"}
          </Button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center mb-8"
          >
            <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin" />
            <AnimatePresence mode="wait">
              <motion.p
                key={loaderPhrases[currentPhraseIndex]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="mt-4 text-lg text-gray-600"
              >
                {loaderPhrases[currentPhraseIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}


        {/* Animated Results - Controlled by the Parent Container */}
        {results && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-md w-full"
          >
            <Card>
              <CardContent className="space-y-4">
                <motion.h2 variants={itemVariants} className="text-2xl font-bold">
                  Market Insights for {startupName}
                </motion.h2>
                <motion.div variants={itemVariants}>
                  <AnimatedBar label="TAM" value={results.tam} percentage={100} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <AnimatedBar label="SAM" value={results.sam} percentage={50} />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <AnimatedBar label="SOM" value={results.som} percentage={10} />
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-center">
                  <GaugeChart grade={results.startupGrade} />
                </motion.div>
                <motion.div variants={itemVariants} className="text-left space-y-2">
                  <p>
                    <strong>Competitor Insight:</strong> {results.competitor}
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

    </div>
  );
}
