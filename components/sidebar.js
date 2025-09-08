import { BookOpen, Code, Database, Hash, Layers, Zap, Brain, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const categories = [
  { name: "Array", icon: Layers, count: 156, solved: 23 },
  { name: "String", icon: Hash, count: 89, solved: 12 },
  { name: "Linked List", icon: Code, count: 45, solved: 8 },
  { name: "Tree", icon: BookOpen, count: 78, solved: 15 },
  { name: "Dynamic Programming", icon: Brain, count: 67, solved: 5 },
  { name: "Graph", icon: Target, count: 34, solved: 3 },
  { name: "Math", icon: Zap, count: 92, solved: 18 },
  { name: "Database", icon: Database, count: 28, solved: 7 },
]

export function Sidebar() {
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
                <span>91/589</span>
              </div>
              <Progress value={15.4} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">91</div>
                <div className="text-xs text-gray-500">Solved</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">34</div>
                <div className="text-xs text-gray-500">Attempted</div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-400">464</div>
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
