import { ProblemSolver } from "@/components/problem-solver";

export default function ProblemPage({ params }) {
  return <ProblemSolver problemId={params.id} />;
}
