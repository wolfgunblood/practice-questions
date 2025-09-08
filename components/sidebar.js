import { BookOpen, Database, Hash, Layers, Zap, Brain, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import questions from "@/data/data.json"

// Map subjects to icons (fallback to Layers)
const subjectIcon = (subject) => {
  const key = (subject || "").toLowerCase()
  if (key.includes("economy")) return BookOpen
  if (key.includes("math")) return Zap
  if (key.includes("graph")) return Target
  if (key.includes("string")) return Hash
  if (key.includes("database")) return Database
  if (key.includes("brain") || key.includes("analysis")) return Brain
  return Layers
}

const categories = (() => {
  const counts = new Map()
  for (const q of questions) {
    const subject = q?.metadata?.subject || "general"
    counts.set(subject, (counts.get(subject) || 0) + 1)
  }
  return Array.from(counts.entries()).map(([name, count]) => ({
    name,
    icon: subjectIcon(name),
    count,
    solved: 0,
  }))
})()

export function Sidebar() {
  const total = questions.length
  const solved = 0
  const attempted = 0
  const todo = total - solved - attempted
  const overallProgress = total > 0 ? (solved / total) * 100 : 0
  return (
    <aside className="w-64 bg-white border-r p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>
                  {solved}/{total}
                </span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">{solved}</div>
                <div className="text-xs text-gray-500">Solved</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">{attempted}</div>
                <div className="text-xs text-gray-500">Attempted</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-400">{todo}</div>
                <div className="text-xs text-gray-500">Todo</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => {
              const Icon = category.icon
              const progress = (category.solved / category.count) * 100
              return (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500">
                        {category.solved}/{category.count}
                      </div>
                    </div>
                  </div>
                  <div className="w-12">
                    <Progress value={progress} className="h-1" />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
