"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import * as d3 from "d3"; // we need this to configure the forces

// Dynamically load ForceGraph2D on the client.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });

// -- Types for nodes and links --
interface GraphNode {
  id: string;
  type: "root" | "result";
  note: string;
  relevance: number;
  connectionType?: "primary" | "secondary" | "tertiary";
}

interface GraphLink {
  source: string;
  target: string;
  type: "primary" | "secondary" | "tertiary";
  relevance: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

/* 
  Gemini API call to generate dynamic content for the graph.
  Gemini prompt instructs the model to return a bullet list in the following format:
    * **Keyword** (primary): Note
    * **Keyword** (secondary): Note
    * **Keyword** (tertiary): Note
*/
async function fetchGeminiGraphData(query: string): Promise<GraphData> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_FLASH_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `For the topic "${query}", please return a bullet list of related keywords with a brief note for each, and specify their connection type relative to the topic. The connection type must be one of 'primary', 'secondary', or 'tertiary'. Use the following format exactly:
  * **Keyword** (primary): Note
If a keyword should be a secondary connection, replace 'primary' with 'secondary', and similarly for tertiary.
Return only the bullet list.`,
            },
          ],
        },
      ],
    };
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Gemini API request failed");
    const data = await res.json();
    const text: string = data.candidates[0].content.parts[0].text;
    console.log("Gemini raw response text:", text);

    // Split the response text into bullet lines (lines starting with "*").
    const lines = text.split("\n").filter((line) => line.trim().startsWith("*"));

    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    // Create the root node.
    nodes.push({ id: query, type: "root", note: `Topic: ${query}`, relevance: 100 });

    // Regular expression to parse bullet lines.
    const bulletRegex = /^\*\s*\*{0,2}([^*]+?)\*{0,2}\s*\((primary|secondary|tertiary)\):\s*(.+)$/i;
    for (const line of lines) {
      const match = line.match(bulletRegex);
      if (match) {
        const keyword = match[1].trim();
        const connectionType = match[2].toLowerCase().trim() as "primary" | "secondary" | "tertiary";
        const note = match[3].trim();

        // Set base relevance based on connection type.
        let relevance = 10;
        if (connectionType === "secondary") {
          relevance = 7;
        } else if (connectionType === "tertiary") {
          relevance = 5;
        }

        // Save connectionType in the node as well.
        nodes.push({ id: keyword, type: "result", note, relevance, connectionType });
        links.push({ source: query, target: keyword, type: connectionType, relevance });
      }
    }

    // Add extra links between every pair of nodes with the same connection type.
    const resultNodes = nodes.filter((node) => node.type === "result" && node.connectionType);
    // Group nodes by connection type.
    const groups: { [key: string]: GraphNode[] } = {};
    for (const node of resultNodes) {
      groups[node.connectionType!] = groups[node.connectionType!] || [];
      groups[node.connectionType!].push(node);
    }
    // For each connection type, add links between every two nodes.
    for (const type in groups) {
      const groupNodes = groups[type];
      for (let i = 0; i < groupNodes.length; i++) {
        for (let j = i + 1; j < groupNodes.length; j++) {
          links.push({
            source: groupNodes[i].id,
            target: groupNodes[j].id,
            type: type as "primary" | "secondary" | "tertiary",
            relevance: groupNodes[i].relevance
          });
        }
      }
    }

    return { nodes, links };
  } catch (err) {
    console.error(err);
    return { nodes: [], links: [] };
  }
}

export default function DemoPage() {
  const [query, setQuery] = useState("");
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const fgRef = useRef<any>(null);

  const handleGenerateGraph = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const data = await fetchGeminiGraphData(query);
    setGraphData(data);
    setLoading(false);
  };



  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="py-6 px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/next.svg" alt="Logo" width={40} height={40} />
            <span className="text-lg font-bold tracking-tight">InsightSpark AI</span>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Gemini Dynamic Graph
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          Enter a topic below. Our system will call the Gemini API to generate related keywords,
          notes, and connection types, then dynamically build a network graph.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md">
          <Input
            type="text"
            placeholder="Enter search topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleGenerateGraph} disabled={loading} size="lg">
            {loading ? "Loading..." : "Generate Graph"}
          </Button>
        </div>

        {/* Render the dynamic graph if data exists */}
        {graphData && (
          <section className="w-full max-w-4xl mt-12">
            <h2 className="text-3xl font-bold mb-4">Dynamic Gemini Graph</h2>
            <div className="border border-gray-300 h-[70vh]">
         
            </div>
          </section>
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
