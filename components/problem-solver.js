"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const problemData = {
  1: {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    detailedDescription: `You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    question: "What is the optimal time complexity for the Two Sum problem?",
    options: [
      { id: "a", text: "O(n²) using nested loops", correct: false },
      { id: "b", text: "O(n log n) using sorting", correct: false },
      { id: "c", text: "O(n) using hash map", correct: true },
      { id: "d", text: "O(1) constant time", correct: false },
    ],
    explanation:
      "The optimal solution uses a hash map to store previously seen numbers and their indices. This allows us to find the complement in O(1) time, resulting in overall O(n) time complexity.",
  },
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 bg-green-50 border-green-200";
    case "Medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    case "Hard":
      return "text-red-600 bg-red-50 border-red-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export function ProblemSolver({ problemId }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const problem = problemData[Number.parseInt(problemId)];

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Problem Not Found
          </h1>
          <Link href="/">
            <Button>Back to Problems</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowResult(true);
  };

  const handleReset = () => {
    setSelectedAnswer("");
    setShowResult(false);
  };

  const isCorrect =
    selectedAnswer === problem.options.find((opt) => opt.correct)?.id;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <h1 className="text-xl font-bold text-gray-900">
                  {problem.id}. {problem.title}
                </h1>
                <Badge
                  variant="outline"
                  className={getDifficultyColor(problem.difficulty)}
                >
                  {problem.difficulty}
                </Badge>
                <Badge variant="secondary">{problem.category}</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {Math.floor(timeElapsed / 60)}:
                {(timeElapsed % 60).toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Problem Description</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {problem.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {problem.detailedDescription}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {problem.examples.map((example, index) => (
                  <div key={index} className="space-y-2">
                    <div className="font-medium text-sm">
                      Example {index + 1}:
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md font-mono text-sm">
                      <div>
                        <strong>Input:</strong> {example.input}
                      </div>
                      <div>
                        <strong>Output:</strong> {example.output}
                      </div>
                      <div>
                        <strong>Explanation:</strong> {example.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* MCQ Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Multiple Choice Question</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-gray-700 font-medium">
                  {problem.question}
                </div>

                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={setSelectedAnswer}
                >
                  <div className="space-y-3">
                    {problem.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label
                          htmlFor={option.id}
                          className="flex-1 cursor-pointer p-3 rounded-md border hover:bg-gray-50 transition-colors"
                        >
                          <span className="font-medium mr-2">
                            {option.id.toUpperCase()}.
                          </span>
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer || showResult}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Submit Answer
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {showResult && (
                  <Alert
                    className={
                      isCorrect
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }
                  >
                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`font-medium ${
                          isCorrect ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </span>
                    </div>
                    <AlertDescription className="mt-2">
                      <strong>Explanation:</strong> {problem.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {showResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        Back to Problem List
                      </Button>
                    </Link>
                    <Button className="w-full">Try Another Problem</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
