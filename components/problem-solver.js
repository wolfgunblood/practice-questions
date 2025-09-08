"use client";

import { useMemo, useState } from "react";
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
import questions from "@/data/data.json";
import { QuestionRenderer } from "@/components/questionsrender";

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

  const problem = useMemo(() => {
    const id = Number.parseInt(problemId);
    const q = questions.find((x) => x.questionNumber === id);
    if (!q) return null;
    const difficulty = (q?.metadata?.difficulty || "unknown").replace(
      /^[a-z]/,
      (c) => c.toUpperCase()
    );
    const category = q?.metadata?.subject || "general";
    // Build normalized options list and whether we can grade
    const options = Array.isArray(q.options) ? q.options : [];
    const canGrade =
      typeof q.correctAnswer === "string" && q.correctAnswer.trim().length > 0;
    return {
      id: q.questionNumber,
      title: q.title,
      difficulty,
      category,
      prompt: q.prompt || "",
      type: q.type,
      content: q.content || {},
      options,
      correctAnswer: q.correctAnswer || "",
      canGrade,
      explanation: q.explanation || "",
    };
  }, [problemId]);

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

  const isCorrect = problem?.canGrade
    ? selectedAnswer === problem.correctAnswer
    : false;

  const renderQuestionData = useMemo(() => {
    if (!problem) return null;
    // Adapt content to the QuestionRenderer shape
    let content = problem.content || {};
    if (
      problem.type === "multiple-choice-with-statements" &&
      Array.isArray(problem.content?.statements)
    ) {
      content = {
        ...content,
        romanNumerals: problem.content.statements.map((s) => ({
          numeral: s.label,
          text: s.text,
        })),
      };
    }
    return {
      id: problem.id,
      title: problem.title,
      type: problem.type,
      prompt: problem.prompt,
      content,
      options: problem.options,
      correctAnswer: problem.correctAnswer,
      explanation: problem.explanation,
    };
  }, [problem]);

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
                  <span>Question</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderQuestionData && (
                  <QuestionRenderer
                    question={renderQuestionData}
                    questionNumber={renderQuestionData.id}
                    status={
                      showResult
                        ? isCorrect
                          ? "correct"
                          : "incorrect"
                        : "unanswered"
                    }
                  />
                )}
              </CardContent>
            </Card>
          </div>

          {/* MCQ Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {problem.prompt && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <p className="font-semibold text-blue-900">
                        {problem.prompt}
                      </p>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup
                  value={selectedAnswer}
                  onValueChange={setSelectedAnswer}
                >
                  <div className="space-y-3">
                    {problem.options.map((text, idx) => {
                      const id = `opt-${idx}`;
                      return (
                        <div key={id} className="flex items-center space-x-2">
                          <RadioGroupItem value={text} id={id} />
                          <Label
                            htmlFor={id}
                            className="flex-1 cursor-pointer p-3 rounded-md border hover:bg-gray-50 transition-colors"
                          >
                            {text}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>

                <div className="flex space-x-3">
                  <Button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer || showResult}
                    className="flex-1"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {problem.canGrade ? "Submit Answer" : "Record Answer"}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {showResult && problem.canGrade && (
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
                    {problem.explanation && (
                      <AlertDescription className="mt-2">
                        <strong>Explanation:</strong> {problem.explanation}
                      </AlertDescription>
                    )}
                  </Alert>
                )}
                {showResult && !problem.canGrade && (
                  <Alert className="border-blue-200 bg-blue-50">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-800">
                        Answer recorded
                      </span>
                    </div>
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
                    <Button className="w-full">Try Another Question</Button>
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
