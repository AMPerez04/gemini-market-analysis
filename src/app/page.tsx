
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}


      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center bg-gradient-to-b from-muted/40 to-background pb-16 pt-12">
        <Badge className="mb-4" variant="secondary">Powered by Google Gemini + Next.js</Badge>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl text-primary">
          Validate Market Potential in Seconds
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-8">
          Instantly generate TAM/SAM/SOM insights, benchmark competitors, and grade startup ideas with AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pb-4">
          

          <Link href="/demo">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" size="lg">
              Try Demo
            </Button>
          </Link>
          <Button variant="outline" size="lg">See How It Works</Button>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 px-8 bg-muted/50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">What You&apos;ll Get</h2>
          <p className="text-muted-foreground text-lg">
            A full-stack market research engine that VCs will love.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: "TAM/SAM/SOM Analyzer",
              desc: "Automatically estimate market sizes with real data.",
            },
            {
              title: "Startup Grading",
              desc: "Score your idea across defensibility, scale, timing, and more.",
            },
            {
              title: "Competitor Intelligence",
              desc: "Get side-by-side comparisons, traction stats, and differentiation.",
            },
          ].map(({ title, desc }) => (
            <Card key={title} className="bg-card shadow-md">
              <CardContent className="p-6 text-left">
                <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Investor CTA */}
      <section id="investors" className="py-24 px-8 text-center bg-gradient-to-b from-background via-muted/50 to-background">
        <h2 className="text-3xl font-bold mb-4 text-primary">Tailored for Investors & Innovation Teams</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
          InsightSpark isn’t just a tool — it’s a pitch-perfect launchpad designed to accelerate internal validation and make due diligence effortless.
        </p>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" size="lg">Request Investor Deck</Button>
      </section>


    </div>
  );
}
