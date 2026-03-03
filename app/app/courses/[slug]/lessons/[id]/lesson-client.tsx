"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, PlayIcon, CheckmarkCircle02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { CodeEditor } from "@/components/code-editor";
import type { Lesson } from "@/lib/services/types";

interface LessonClientProps {
  lesson: Lesson;
  courseSlug: string;
  prevLesson?: { id: string; title: string };
  nextLesson?: { id: string; title: string };
}

export function LessonClient({ lesson, courseSlug, prevLesson, nextLesson }: LessonClientProps) {
  const [code, setCode] = useState(lesson.starterCode || "");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; message: string }[]>([]);

  const runTests = useCallback(async () => {
    setIsRunning(true);
    setTestResults([]);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const results: { passed: boolean; message: string }[] = [];

    if (lesson.testCases && lesson.testCases.length > 0) {
      for (const testCase of lesson.testCases) {
        try {
          let result: string;
          
          const logs: string[] = [];
          const mockConsole = {
            log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
            error: (...args: unknown[]) => logs.push("ERROR: " + args.map(String).join(" ")),
          };
          
          try {
            const fn = new Function("console", code);
            fn(mockConsole);
            result = logs[logs.length - 1] || "";
          } catch {
            result = "ERROR";
          }

          const passed = testCase.expected === "PASS" 
            ? result.includes("PASS") || result.includes("true")
            : result.includes(testCase.expected) || result === testCase.expected;

          results.push({
            passed,
            message: testCase.description || `Test: ${testCase.expected}`,
          });
        } catch {
          results.push({
            passed: false,
            message: testCase.description || "Test failed",
          });
        }
      }
    } else {
      results.push({
        passed: true,
        message: "No tests defined for this lesson",
      });
    }

    setTestResults(results);
    setIsRunning(false);
  }, [code, lesson.testCases]);

  if (lesson.type === "reading") {
    return (
      <div className="py-8">
        <div className="mb-6 flex items-center gap-4">
          <Link 
            href={`/courses/${courseSlug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
            Back to Course
          </Link>
          <Badge variant="outline">Reading</Badge>
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {lesson.title}
        </h1>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-muted max-w-none">
              <p>This is a reading lesson. Content would be loaded from CMS/Arweave.</p>
              <p className="mt-4">
                In a full implementation, this would contain:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Formatted markdown content</li>
                <li>Code snippets with syntax highlighting</li>
                <li>Images and diagrams</li>
                <li>Links to external resources</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-between">
          {prevLesson ? (
            <Link 
              href={`/courses/${courseSlug}/lessons/${prevLesson.id}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
              Previous: {prevLesson.title}
            </Link>
          ) : <div />}
          
          {nextLesson && (
            <Link 
              href={`/courses/${courseSlug}/lessons/${nextLesson.id}`}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              Next: {nextLesson.title}
              <HugeiconsIcon icon={ArrowLeft02Icon} size={16} className="rotate-180" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href={`/courses/${courseSlug}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
          Back to Course
        </Link>
        <Badge variant="secondary">{lesson.xpReward} XP</Badge>
        <Badge variant="outline">Coding</Badge>
      </div>

      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {lesson.title}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-muted max-w-none text-sm">
              <p>Complete the coding challenge below. Write your solution in the editor and click &quot;Run Code&quot; to test.</p>
              {lesson.testCases && lesson.testCases.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-foreground mb-2">Test Cases:</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    {lesson.testCases.map((tc, i) => (
                      <li key={i} className="text-muted-foreground">{tc.description}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Code Editor</h3>
            <Button size="sm" onClick={runTests} disabled={isRunning}>
              <HugeiconsIcon icon={PlayIcon} size={14} />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>

          <CodeEditor
            value={code}
            onChange={setCode}
            language="typescript"
            height="400px"
          />

          {testResults.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testResults.map((result, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-sm ${
                        result.passed ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={result.passed ? CheckmarkCircle02Icon : Cancel01Icon}
                        size={16}
                      />
                      {result.message}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {prevLesson ? (
          <Link 
            href={`/courses/${courseSlug}/lessons/${prevLesson.id}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} size={16} />
            Previous
          </Link>
        ) : <div />}
        
        {nextLesson && (
          <Link 
            href={`/courses/${courseSlug}/lessons/${nextLesson.id}`}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Next
            <HugeiconsIcon icon={ArrowLeft02Icon} size={16} className="rotate-180" />
          </Link>
        )}
      </div>
    </div>
  );
}
