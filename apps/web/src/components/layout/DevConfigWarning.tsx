import { missingExternalConfig } from "@/config/external-links";

/**
 * Development-only notice listing missing/invalid external configuration
 * (E1 §18). Renders nothing in production builds.
 */
export function DevConfigWarning() {
  if (process.env.NODE_ENV !== "development" || missingExternalConfig.length === 0) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-3 z-60 rounded-lg border-2 border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lg sm:left-auto sm:max-w-md"
    >
      <strong className="font-bold">Development:</strong> set{" "}
      {missingExternalConfig.map((name, i) => (
        <span key={name}>
          {i > 0 ? " and " : ""}
          <code className="font-mono text-xs">{name}</code>
        </span>
      ))}{" "}
      in <code className="font-mono text-xs">apps/web/.env.local</code>. Affected links are disabled
      until then.
    </div>
  );
}
