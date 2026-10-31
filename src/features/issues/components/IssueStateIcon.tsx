import { CircleCheckBig, CircleDot } from "lucide-react";
import type { IssueState } from "../types";

export default function IssueStateIcon({ state }: { state: IssueState }) {
  return state === "open" ? (
    <CircleDot className="mt-0.5 shrink-0 text-emerald-600" size={21} strokeWidth={2.2} />
  ) : (
    <CircleCheckBig className="mt-0.5 shrink-0 text-violet-600" size={21} strokeWidth={2.2} />
  );
}