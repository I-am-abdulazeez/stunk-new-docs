export default function AnimatedStateFlow() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.12 }}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Central chunk node */}
      <circle cx="600" cy="200" r="10" fill="#2af4c2">
        <animate
          attributeName="r"
          values="10;14;10"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Pulse rings */}
      {[0, 0.6, 1.2].map((delay, i) => (
        <circle
          key={i}
          cx="600"
          cy="200"
          r="10"
          fill="none"
          stroke="#2af4c2"
          strokeWidth="1.5"
        >
          <animate
            attributeName="r"
            values="10;60;80"
            dur="2.5s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0.1;0"
            dur="2.5s"
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      {/* Subscriber nodes */}
      {[200, 350, 500, 650, 800, 1000].map((cx, i) => (
        <g key={i}>
          <line
            x1="600"
            y1="200"
            x2={cx}
            y2="500"
            stroke="#2af4c2"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          >
            <animate
              attributeName="opacity"
              values="0;0.5;0"
              dur="2.5s"
              begin={`${i * 0.28}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="30"
              dur="1s"
              repeatCount="indefinite"
            />
          </line>
          <circle cx={cx} cy={500} r="5" fill="#2af4c2">
            <animate
              attributeName="opacity"
              values="0.2;0.6;0.2"
              dur="2.5s"
              begin={`${i * 0.28}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
