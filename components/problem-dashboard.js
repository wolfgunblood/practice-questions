"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Circle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";

const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    solved: true,
    attempted: true,
    acceptance: "49.1%",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    solved: false,
    attempted: true,
    acceptance: "38.4%",
    description:
      "You are given two non-empty linked lists representing two non-negative integers.",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    solved: true,
    attempted: true,
    acceptance: "33.8%",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    solved: false,
    attempted: false,
    acceptance: "35.2%",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median.",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    solved: false,
    attempted: true,
    acceptance: "32.1%",
    description:
      "Given a string s, return the longest palindromic substring in s.",
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    category: "String",
    solved: true,
    attempted: true,
    acceptance: "42.3%",
    description:
      "The string 'PAYPALISHIRING' is written in a zigzag pattern on a given number of rows.",
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Easy",
    category: "Math",
    solved: false,
    attempted: false,
    acceptance: "26.8%",
    description:
      "Given a signed 32-bit integer x, return x with its digits reversed.",
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    solved: false,
    attempted: true,
    acceptance: "16.4%",
    description:
      "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.",
  },
];

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

const getStatusIcon = (solved, attempted) => {
  if (solved) return <CheckCircle className="w-4 h-4 text-green-600" />;
  if (attempted) return <XCircle className="w-4 h-4 text-red-500" />;
  return <Circle className="w-4 h-4 text-gray-400" />;
};

export function ProblemDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch = problem.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "all" ||
      problem.difficulty.toLowerCase() === difficultyFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      problem.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const stats = {
    total: problems.length,
    solved: problems.filter((p) => p.solved).length,
    attempted: problems.filter((p) => p.attempted && !p.solved).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Total Problems</div>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">
                    Available to solve
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Solved</div>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.solved}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Successfully completed
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="text-sm font-medium">Attempted</div>
                  <Clock className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.attempted}
                  </div>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search problems..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select
                value={difficultyFilter}
                onValueChange={setDifficultyFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="array">Array</SelectItem>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="linked list">Linked List</SelectItem>
                  <SelectItem value="math">Math</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Problems List */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredProblems.map((problem) => (
                    <Link key={problem.id} href={`/problem/${problem.id}`}>
                      <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(problem.solved, problem.attempted)}
                              <span className="text-sm text-gray-500">
                                #{problem.id}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 hover:text-blue-600">
                                {problem.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                {problem.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge
                              variant="outline"
                              className={getDifficultyColor(problem.difficulty)}
                            >
                              {problem.difficulty}
                            </Badge>
                            <Badge variant="secondary">
                              {problem.category}
                            </Badge>
                            <span className="text-sm text-gray-500 min-w-[60px] text-right">
                              {problem.acceptance}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
