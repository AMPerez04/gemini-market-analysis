import React from "react";

export default function BlobSceneDark({
    className = "",
    style = {},
}: {
    className?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div
            className={className}
            style={{
                position: "absolute", // Changed from "relative" to "absolute"
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
                ...style,
            }}
        >
            <svg id="visual" viewBox="0 0 675 900" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <rect x="0" y="0" width="675" height="900" fill="#001220"></rect>
                {/* Gradients */}
                <defs>
                    <linearGradient id="grad1_0" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#fbae3c" />
                        <stop offset="70%" stopColor="#fbae3c" />
                    </linearGradient>
                    <linearGradient id="grad1_1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#fbae3c" />
                        <stop offset="70%" stopColor="#f48350" />
                    </linearGradient>
                    <linearGradient id="grad1_2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#d96162" />
                        <stop offset="70%" stopColor="#f48350" />
                    </linearGradient>
                    <linearGradient id="grad1_3" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#d96162" />
                        <stop offset="70%" stopColor="#af4b6d" />
                    </linearGradient>
                    <linearGradient id="grad1_4" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#7c3e6b" />
                        <stop offset="70%" stopColor="#af4b6d" />
                    </linearGradient>
                    <linearGradient id="grad1_5" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#7c3e6b" />
                        <stop offset="70%" stopColor="#49335c" />
                    </linearGradient>
                    <linearGradient id="grad1_6" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#1d2540" />
                        <stop offset="70%" stopColor="#49335c" />
                    </linearGradient>
                    <linearGradient id="grad1_7" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="30%" stopColor="#1d2540" />
                        <stop offset="70%" stopColor="#001220" />
                    </linearGradient>
                </defs>

                {/* Upper left blob */}
                <g transform="translate(675, 0)">
                    <path d="M0 506.3C-67.9 500.7 -135.8 495.1 -193.7 467.7C-251.7 440.4 -299.7 391.3 -341.5 341.5C-383.3 291.8 -418.9 241.5 -445.3 184.5C-471.7 127.4 -489 63.7 -506.2 0L0 0Z" fill="#0c1c30" />
                    <path d="M0 443C-59.4 438.1 -118.8 433.2 -169.5 409.2C-220.2 385.3 -262.3 342.3 -298.8 298.8C-335.4 255.3 -366.5 211.3 -389.6 161.4C-412.8 111.5 -427.9 55.8 -443 0L0 0Z" fill="#312c4f" />
                    <path d="M0 379.7C-50.9 375.5 -101.8 371.3 -145.3 350.8C-188.8 330.3 -224.8 293.4 -256.1 256.1C-287.5 218.9 -314.2 181.1 -334 138.3C-353.8 95.6 -366.7 47.8 -379.7 0L0 0Z" fill="#623965" />
                    <path d="M0 316.4C-42.4 312.9 -84.9 309.4 -121.1 292.3C-157.3 275.2 -187.3 244.5 -213.5 213.5C-239.6 182.4 -261.8 150.9 -278.3 115.3C-294.8 79.6 -305.6 39.8 -316.4 0L0 0Z" fill="#96446e" />
                    <path d="M0 253.1C-33.9 250.3 -67.9 247.5 -96.9 233.9C-125.8 220.2 -149.9 195.6 -170.8 170.8C-191.7 145.9 -209.4 120.7 -222.7 92.2C-235.9 63.7 -244.5 31.9 -253.1 0L0 0Z" fill="#c55469" />
                    <path d="M0 189.8C-25.5 187.7 -50.9 185.6 -72.7 175.4C-94.4 165.1 -112.4 146.7 -128.1 128.1C-143.7 109.4 -157.1 90.6 -167 69.2C-176.9 47.8 -183.4 23.9 -189.8 0L0 0Z" fill="#e9705a" />
                    <path d="M0 126.6C-17 125.2 -33.9 123.8 -48.4 116.9C-62.9 110.1 -74.9 97.8 -85.4 85.4C-95.8 73 -104.7 60.4 -111.3 46.1C-117.9 31.9 -122.2 15.9 -126.6 0L0 0Z" fill="#fa9845" />
                    <path d="M0 63.3C-8.5 62.6 -17 61.9 -24.2 58.5C-31.5 55 -37.5 48.9 -42.7 42.7C-47.9 36.5 -52.4 30.2 -55.7 23.1C-59 15.9 -61.1 8 -63.3 0L0 0Z" fill="#fbae3c" />
                </g>

                {/* Lower right blob */}
                <g transform="translate(0, 900)">
                    <path d="M0 -506.2C64.7 -495.4 129.4 -484.6 191.3 -461.9C253.2 -439.3 312.3 -404.9 358 -358C403.6 -311 435.8 -251.6 458.2 -189.8C480.7 -128.1 493.5 -64 506.3 0L0 0Z" fill="#0c1c30" />
                    <path d="M0 -443C56.6 -433.5 113.3 -424 167.4 -404.2C221.6 -384.4 273.3 -354.3 313.2 -313.2C353.2 -272.2 381.3 -220.1 401 -166.1C420.6 -112.1 431.8 -56 443 0L0 0Z" fill="#312c4f" />
                    <path d="M0 -379.7C48.5 -371.6 97.1 -363.4 143.5 -346.5C189.9 -329.5 234.3 -303.7 268.5 -268.5C302.7 -233.3 326.8 -188.7 343.7 -142.4C360.5 -96 370.1 -48 379.7 0L0 0Z" fill="#623965" />
                    <path d="M0 -316.4C40.4 -309.6 80.9 -302.9 119.6 -288.7C158.3 -274.6 195.2 -253.1 223.7 -223.7C252.3 -194.4 272.4 -157.2 286.4 -118.6C300.4 -80 308.4 -40 316.4 0L0 0Z" fill="#96446e" />
                    <path d="M0 -253.1C32.4 -247.7 64.7 -242.3 95.7 -231C126.6 -219.7 156.2 -202.5 179 -179C201.8 -155.5 217.9 -125.8 229.1 -94.9C240.4 -64 246.7 -32 253.1 0L0 0Z" fill="#c55469" />
                    <path d="M0 -189.8C24.3 -185.8 48.5 -181.7 71.8 -173.2C95 -164.7 117.1 -151.8 134.2 -134.2C151.4 -116.6 163.4 -94.3 171.8 -71.2C180.3 -48 185.1 -24 189.8 0L0 0Z" fill="#e9705a" />
                    <path d="M0 -126.6C16.2 -123.9 32.4 -121.1 47.8 -115.5C63.3 -109.8 78.1 -101.2 89.5 -89.5C100.9 -77.8 108.9 -62.9 114.6 -47.5C120.2 -32 123.4 -16 126.6 0L0 0Z" fill="#fa9845" />
                    <path d="M0 -63.3C8.1 -61.9 16.2 -60.6 23.9 -57.7C31.7 -54.9 39 -50.6 44.7 -44.7C50.5 -38.9 54.5 -31.4 57.3 -23.7C60.1 -16 61.7 -8 63.3 0L0 0Z" fill="#fbae3c" />
                </g>
            </svg>
        </div>
    );
}