import { getLabelColors } from "../utils/labelColors";
import type { IssueLabel } from "../types";

export default function LabelBadge({ label }: { label: IssueLabel }) {
  const colors = getLabelColors(label.color);

  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        ["--tw-ring-color" as string]: colors.ring,
      }}
    >
      {label.name}
    </span>
  );
}