"use client";

import { useRef, useEffect } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string;
  minimap?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  language = "typescript",
  readOnly = false,
  height = "400px",
  minimap = false,
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  const handleMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      onChange(value);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const model = editor.getModel();
      if (model) {
        editor.updateOptions({
          theme: resolvedTheme === "dark" ? "vs-dark" : "vs",
        });
      }
    }
  }, [resolvedTheme]);

  return (
    <div
      className="overflow-hidden rounded-lg border border-border"
      style={{ height }}
    >
      <Editor
        height="100%"
        language={language}
        value={value}
        onChange={handleChange}
        onMount={handleMount}
        theme={resolvedTheme === "dark" ? "vs-dark" : "vs"}
        options={{
          readOnly,
          minimap: { enabled: minimap },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
      />
    </div>
  );
}
