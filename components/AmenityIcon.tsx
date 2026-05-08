export function AmenityIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  const props = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  if (n.includes("wifi"))
    return (
      <svg {...props}>
        <path d="M5 12.55a11 11 0 0114 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0" />
        <circle cx="12" cy="20" r="0.8" fill="currentColor" />
      </svg>
    );
  if (n.includes("aer condi") || n.includes("aerul"))
    return (
      <svg {...props}>
        <path d="M3 6h18M3 12h18M3 18h18" />
        <circle cx="6" cy="6" r="1.2" />
        <circle cx="18" cy="18" r="1.2" />
      </svg>
    );
  if (n.includes("bucătărie") || n.includes("chicinet"))
    return (
      <svg {...props}>
        <path d="M4 21V8a4 4 0 014-4h8a4 4 0 014 4v13M4 14h16M9 8v6M15 8v6" />
      </svg>
    );
  if (n.includes("parcare"))
    return (
      <svg {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 8h4a3 3 0 010 6h-4V8zM9 14v3" />
      </svg>
    );
  if (n.includes("șemineu"))
    return (
      <svg {...props}>
        <path d="M12 3c0 4-3 4-3 8a3 3 0 006 0c0-2-1.5-3-1.5-5 0-1.5 1-2 1.5-2.5M5 21h14M5 21V8a2 2 0 012-2M19 21V8a2 2 0 00-2-2" />
      </svg>
    );
  if (n.includes("smart tv") || n.includes("tv"))
    return (
      <svg {...props}>
        <rect x="2" y="5" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 18v3" />
      </svg>
    );
  if (n.includes("cafetier") || n.includes("nespress") || n.includes("espressor"))
    return (
      <svg {...props}>
        <path d="M5 4h12v8a4 4 0 01-4 4H9a4 4 0 01-4-4V4zM17 7h2a2 2 0 012 2v3a2 2 0 01-2 2h-2M5 20h12" />
      </svg>
    );
  if (n.includes("lenjerie"))
    return (
      <svg {...props}>
        <path d="M3 21h18M5 21V8l7-4 7 4v13M9 14h6M9 18h6" />
      </svg>
    );
  if (n.includes("prosop"))
    return (
      <svg {...props}>
        <path d="M5 3h14v18H5zM5 7h14M5 17h14" />
      </svg>
    );
  if (n.includes("cosmet"))
    return (
      <svg {...props}>
        <path d="M9 3h6v4H9zM7 7h10v14H7zM10 11h4M10 15h4" />
      </svg>
    );
  if (n.includes("terasă") || n.includes("balcon"))
    return (
      <svg {...props}>
        <path d="M3 21h18M5 21V11M19 21V11M3 11h18l-2-7H5l-2 7zM9 11v10M15 11v10" />
      </svg>
    );
  if (n.includes("grădin") || n.includes("curte"))
    return (
      <svg {...props}>
        <path d="M12 2c-3 4-3 8 0 12 3-4 3-8 0-12zM5 22c0-3 3-5 7-5s7 2 7 5" />
      </svg>
    );
  if (n.includes("mașină de spălat") || n.includes("spălat"))
    return (
      <svg {...props}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <circle cx="8" cy="6.5" r="0.7" fill="currentColor" />
      </svg>
    );
  if (n.includes("uscător"))
    return (
      <svg {...props}>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M10 11l2 4M14 11l-2 4" />
      </svg>
    );
  if (n.includes("birou") || n.includes("lucru"))
    return (
      <svg {...props}>
        <path d="M3 4h18v12H3zM3 16l3 4M21 16l-3 4M9 8h6" />
      </svg>
    );
  if (n.includes("pătuț") || n.includes("bebeluș") || n.includes("copii"))
    return (
      <svg {...props}>
        <path d="M3 8v12M21 8v12M3 8h18M5 12h14M7 8V4h10v4" />
      </svg>
    );
  if (n.includes("jocuri") || n.includes("bibliotec"))
    return (
      <svg {...props}>
        <path d="M4 4h6v16H4zM14 4h6v16h-6zM10 9h4M10 15h4" />
      </svg>
    );
  if (n.includes("grătar"))
    return (
      <svg {...props}>
        <path d="M5 8h14l-2 8H7L5 8zM12 16v4M9 20h6M8 4l1 4M16 4l-1 4M12 4v4" />
      </svg>
    );
  if (n.includes("mic dejun"))
    return (
      <svg {...props}>
        <circle cx="9" cy="11" r="6" />
        <circle cx="9" cy="11" r="3" />
        <path d="M16 9h4a2 2 0 012 2v0a2 2 0 01-2 2h-4M5 21h14" />
      </svg>
    );
  if (n.includes("self check"))
    return (
      <svg {...props}>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
      </svg>
    );
  if (n.includes("vedere"))
    return (
      <svg {...props}>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  if (n.includes("pat king") || n.includes("pat queen") || n.includes("king-size"))
    return (
      <svg {...props}>
        <path d="M2 17h20M2 12h20v5M2 12V8a2 2 0 012-2h16a2 2 0 012 2v4M7 12V9h4v3M13 12V9h4v3" />
      </svg>
    );
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
