"use client";

import { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { GaugeChart } from "./components/GaugeChart";
import generateContent from "./api/geminiapi";
import { generatePrompt } from "./api/generatePrompt";
import WaveBackgroundDark from "./components/WaveBackgroundDark";
import WaveBackgroundLight from "./components/WaveBackgroundLight";

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



// Helper function to parse Gemini's response string.
// It removes markdown code fences and parses the JSON.
function parseGeminiResponse(
  responseText: string
): {
  tam: string;
  tamEvaluation: number;
  sam: string;
  samEvaluation: number;
  som: string;
  somEvaluation: number;
  competitor: string;
  startupGrade: string;
  error: string | undefined;
  trend: string;
  userPersona: string;
  furtherResearch: string;
} {
  const cleanedText = responseText
    .replace(/^```json\s*/, "")
    .replace(/\s*```$/, "");
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
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [startupName, setStartupName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [results, setResults] = useState<{
    tam: string;
    tamEvaluation: number;
    sam: string;
    samEvaluation: number;
    som: string;
    somEvaluation: number;
    competitor: string;
    startupGrade: string;
    userPersona: string;
    furtherResearch: string;
    error?: string;
    trend: string;
  } | null>(null);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % loaderPhrases.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [loading]);


  // Memoized function to get insights from Gemini.
  const handleGetInsights = useCallback(async () => {
  
    if (typeof startupName !== "string" || !startupName.trim()) return;

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
      if (parsedData.error != undefined) {
        setIsError(true);
      } else {
        setIsError(false);
      }

      setResults(parsedData);

      setDisplayName(startupName);
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

  function getLetterGrade(score: number): string {
    if (score >= 97) return "A+";
    if (score >= 93) return "A";
    if (score >= 90) return "A-";
    if (score >= 87) return "B+";
    if (score >= 83) return "B";
    if (score >= 80) return "B-";
    if (score >= 77) return "C+";
    if (score >= 73) return "C";
    if (score >= 70) return "C-";
    if (score >= 67) return "D+";
    if (score >= 63) return "D";
    if (score >= 60) return "D-";
    return "F";
  }


  const furtherResearchLinks = (researchLinks: string) => {
    if (!researchLinks) return [];
    const fr = researchLinks?.trim();
    // Check if it's a valid JSON array (starts with "[")
    if (fr.startsWith("[")) {
      try {
        return JSON.parse(fr);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
      }
    } else {
      // Otherwise, assume it's a comma-separated list
      return fr.split(",").map(link => link.trim());
    }
  };

  return (
    <div className=" bg-background text-foreground flex flex-col">
      {/* <WaveBackgroundDark /> */}
      {mounted && (theme === "dark" ? <WaveBackgroundDark /> : <WaveBackgroundLight />)}



      {/* Demo Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Experience Market Research in Action
        </h1>
        <p className="text-lg text-foreground max-w-xl mb-8">
          Enter a startup name below and see how our AI instantly generates market
          insights.
        </p>
        <div className="flex flex-row gap-2 mb-8 w-full max-w-xl">
          <div className="flex flex-col w-full">
            <Input
              suppressHydrationWarning
              type="text"
              placeholder="Enter Startup Idea"
              value={startupName}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setStartupName(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleGetInsights();
                }
              }}
              className="h-10 placeholder:text-foreground bg-muted"
              style={{ backgroundColor: theme === 'dark' ? "#001220":"var(--muted)" }}
            />
            <div className="text-xs text-foreground text-left mt-1">
              {startupName.length}/100 characters
            </div>
          </div>

          <Button
            onClick={handleGetInsights}
            disabled={loading}
            size="lg"
            className="h-10 self-start sm:self-auto"
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
                className="mt-4 text-lg text-foreground"
              >
                {loaderPhrases[currentPhraseIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}

 


        {/* Animated Results - Controlled by the Parent Container */}
        {results && (
          <>
          {!isError ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-xl w-full"
          >
            <Card>
              <CardContent className="space-y-2">
                <motion.h2 variants={itemVariants} className="text-2xl font-bold">
                  {displayName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </motion.h2>

                <div className="flex flex-row mb-2">
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-">
                  <p className="text-sm font-medium mb-0">TAM: {results.tam}</p>
                  <GaugeChart grade={getLetterGrade(results.tamEvaluation)} />
                </motion.div>
      
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-0">SAM: {results.sam}</p>
                  <GaugeChart grade={getLetterGrade(results.samEvaluation)} />
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-0">SOM: {results.som}</p>
                  <GaugeChart grade={getLetterGrade(results.somEvaluation)} />
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col items-center">
                  <p className="text-sm font-medium mb-0">OVR GRADE:</p>
                  <GaugeChart grade={results.startupGrade} />
                </motion.div>
                </div>

                <motion.div variants={itemVariants} className="text-left space-y-2 mb-4">
                  <p>
                    <strong>Competitor Insight:</strong> {results.competitor}
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-left space-y-2">
                  <p>
                    <strong>Trend Analysis:</strong> {results.trend}
                  </p>
                </motion.div>
                <motion.div variants={itemVariants} className="text-left space-y-2">
                  <p>
                    <strong>User Persona:</strong> {results.userPersona}
                  </p>
                </motion.div>
                
             

             <motion.div variants={itemVariants} className="text-left space-y-2">
              <p>
                <strong>Further Research:</strong>
              </p>
              <ul className="list-disc pl-5">
                {furtherResearchLinks(results.furtherResearch).map((link: string, index: number) => (
                  <li key={index}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>


              </CardContent>
            </Card>
          </motion.div>
          ) : (
            <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-xl w-full"
          >
            <Card>
              <CardContent className="space-y-2">
                <motion.h2 variants={itemVariants} className="text-2xl font-bold">
                  {results.error}
                </motion.h2>
              </CardContent>
            </Card>
          </motion.div>
          )}
          </>
        )}
      </main>

    </div>
  );
}
