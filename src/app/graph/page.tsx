'use client';

import dynamic from 'next/dynamic';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

type MyNode = {
  id: string;
  group?: string;
  bias?: string;
  searchVolume?: number;
};

type MyLink = {
  source: string;
  target: string;
};

const sampleData = {
  nodes: [
    { id: 'Google', group: 'engine', bias: 'N/A', searchVolume: 900 },
    { id: 'Search Term A', group: 'search', bias: 'neutral', searchVolume: 120 },
    { id: 'Search Term B', group: 'search', bias: 'left', searchVolume: 80 },
    { id: 'CNN', group: 'news', bias: 'left', searchVolume: 200 },
    { id: 'Fox News', group: 'news', bias: 'right', searchVolume: 180 },
    { id: 'BBC', group: 'news', bias: 'center', searchVolume: 150 }
  ],
  links: [
    { source: 'Google', target: 'Search Term A' },
    { source: 'Google', target: 'Search Term B' },
    { source: 'Search Term A', target: 'CNN' },
    { source: 'Search Term A', target: 'BBC' },
    { source: 'Search Term B', target: 'Fox News' },
    { source: 'Search Term B', target: 'BBC' }
  ]
};

export default function GraphPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ForceGraph2D
        graphData={sampleData}
        nodeLabel={(node: any) =>
          `${node.id ?? 'unknown'} (${node.bias ?? 'N/A'})`
        }
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
      />
    </div>
  );
}
