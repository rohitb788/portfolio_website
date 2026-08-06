import type { MetricRow } from "@/types/content";

export function MetricsTable({ metrics }: { metrics: MetricRow[] }) {
  return (
    <table className="w-full border-collapse font-mono text-sm">
      <caption className="sr-only">Quantitative results</caption>
      <tbody>
        {metrics.map((row) => (
          <tr key={row.label} className="border-b border-border last:border-b-0">
            <th
              scope="row"
              className="py-2 pr-4 text-left font-normal text-foreground-muted"
            >
              {row.label}
            </th>
            <td className="py-2 text-right text-foreground">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
