// VerifAILogo.tsx
import React from "react";

const VerifAILogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="200"
    height="60"
    viewBox="0 0 200 60"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <style>
      {`
        .wordmark {
          font-family: 'Segoe UI', sans-serif;
          font-size: 32px;
          font-weight: bold;
          fill: #2E3A59;
        }
        .ai {
          fill: #4F8AFA;
        }
        .check {
          fill: none;
          stroke: #4F8AFA;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      `}
    </style>
    <text x="10" y="40" className="wordmark">
      Verif<tspan className="ai">AI</tspan>
    </text>
    <polyline className="check" points="130,28 136,34 150,20" />
  </svg>
);

export default VerifAILogo;
