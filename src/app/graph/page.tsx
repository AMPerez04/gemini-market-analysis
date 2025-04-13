"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
// Dynamically load ForceGraph2D on the client.
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), { ssr: false });
import type { ForceGraphMethods } from 'react-force-graph-2d';

// -- Types for nodes and links --
interface GraphNode {
  id: string;
  type: "root" | "result";
  note: string;
  relevance: number;
  connectionType?: "primary" | "secondary" | "tertiary";
  x?: number; // Added for graph library compatibility
  y?: number; // Added for graph library compatibility
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
    const parts = [
      {
        text: `For the topic "${query}", please return a bullet list of related keywords with a brief note for each, and specify their connection type relative to the topic. The connection type must be one of 'primary', 'secondary', or 'tertiary'. Use the following format exactly:
  * **Keyword** (primary): Note
If a keyword should be a secondary connection, replace 'primary' with 'secondary', and similarly for tertiary.
Return only the bullet list.`,
      },
    ];

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parts }),
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
  const { theme } = useTheme();


  const [query, setQuery] = useState("");
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(false);
  const fgRef = useRef<ForceGraphMethods>(null as unknown as ForceGraphMethods);
  

  const handleGenerateGraph = async () => {
    setGraphData(null);
    if (!query.trim()) return;
    setLoading(true);
    const data = await fetchGeminiGraphData(query);
    setGraphData(data);
    setLoading(false);
  };



  return (
    <div className="bg-transparent text-foreground flex flex-col">


      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Gemini Dynamic Graph
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          Enter a topic below. Our system will call the Gemini API to generate related keywords,
          notes, and connection types, then dynamically build a network graph.
        </p>

        <div className="flex flex-row gap-2 mb-8 w-full max-w-xl">
          <div className="flex flex-col w-full">
            <Input
              suppressHydrationWarning
              type="text"
              placeholder="Enter Research Topic"
              value={query}
              onChange={(e) => {
                if (e.target.value.length <= 100) {
                  setQuery(e.target.value);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  handleGenerateGraph();
                }
              }}
              className="h-10 placeholder:text-foreground bg-muted"
              style={{ backgroundColor: theme === 'dark' ? "#001220" : "var(--muted)" }}
            />
            <div className="text-xs text-foreground text-left mt-1">
              {query.length}/100 characters
            </div>
          </div>

          <Button
            onClick={handleGenerateGraph}
            disabled={loading}
            size="lg"
            className="h-10 self-start sm:self-auto"
          >
            {loading ? "Analyzing..." : "Generate Graph"}
          </Button>
        </div>

        {/* Render the dynamic graph if data exists */}
        {graphData && (
          <section className="w-full max-w-4xl mt-12">
            <Card>
              <CardContent
                className="relative w-full h-[70vh] overflow-hidden flex justify-center items-center"
              >
                <div className="w-full h-full">
                  <ForceGraph2D
                    ref={fgRef}
                    width={undefined} // Allow the canvas to auto-size
                    height={undefined}
                    graphData={graphData}
                    nodeId="id"
                    nodeLabel={(node) => `${(node as GraphNode).id}: ${(node as GraphNode).note}`}
                    nodeAutoColorBy="connectionType"
                    linkColor={(link) => {
                      const graphLink = link as GraphLink;
                      if (graphLink.type === "primary") return "red";
                      if (graphLink.type === "secondary") return "orange";
                      return "gray";
                    }}
                    linkDirectionalParticles={2}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                      const graphNode = node as GraphNode;
                    
                      const label = graphNode.id;
                      const fontSize = 12 / globalScale;
                      const radius = 5; // node size
                    
                      // Draw the node as a circle
                      ctx.beginPath();
                      ctx.arc(graphNode.x!, graphNode.y!, radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = graphNode.connectionType === "primary"
                        ? "red"
                        : graphNode.connectionType === "secondary"
                        ? "orange"
                        : "gray";
                      ctx.fill();
                      ctx.closePath();
                    
                      // Draw label background
                      ctx.font = `${fontSize}px Sans-Serif`;
                      ctx.textAlign = "center";
                      ctx.textBaseline = "bottom";
                    
                      const textWidth = ctx.measureText(label).width;
                      const padding = 2;
                    
                      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
                      ctx.fillRect(
                        graphNode.x! - textWidth / 2 - padding,
                        graphNode.y! - radius - fontSize - padding,
                        textWidth + padding * 2,
                        fontSize + padding
                      );
                    
                      // Draw the label text
                      ctx.fillStyle = "white";
                      ctx.fillText(label, graphNode.x!, graphNode.y! - radius - 2);
                    }}
                    
                    linkDirectionalParticleSpeed={0.005}
                    cooldownTicks={100}
                    onEngineStop={() => fgRef.current?.zoomToFit(200)}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

        )}
      </main>

    </div>
  );
}
