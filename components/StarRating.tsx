export default function StarRating({
  value,
  size = "md"
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  const px = size === "sm" ? 12 : size === "lg" ? 18 : 14;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${value} din 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={px}
          height={px}
          viewBox="0 0 24 24"
          fill={i <= Math.round(value) ? "#bd8852" : "transparent"}
          stroke="#bd8852"
          strokeWidth="1.5"
        >
          <path d="M12 2.5l3.09 6.26L22 9.77l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.64 2 9.77l6.91-1.01L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}
