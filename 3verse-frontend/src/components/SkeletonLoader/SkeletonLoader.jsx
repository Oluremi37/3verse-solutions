import "./SkeletonLoader.css";

export default function SkeletonLoader({
  width = "100%",
  height = "20px",
  borderRadius = "8px",
}) {
  return (
    <div
      className="skeleton-loader"
      style={{
        width,
        height,
        borderRadius,
      }}
    />
  );
}
