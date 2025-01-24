"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { FileExplorer } from "@/components/editor/file-explorer";
import { EditorTabs } from "@/components/editor/editor-tabs";
import { Terminal } from "@/components/editor/terminal";
import { MenuBar } from "@/components/editor/menu-bar";
import { StatusBar } from "@/components/editor/status-bar";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function EditorPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [files, setFiles] = useState<{ [key: string]: string }>({
    "index.js": "// Start coding here\nconsole.log('Hello, CodeCollab AI!');\n",
  });
  const [output, setOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    const saveInterval = setInterval(() => {
      // Save to local storage or your preferred storage method
      localStorage.setItem("editor-files", JSON.stringify(files));
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(saveInterval);
  }, [files]);

  // Load saved files on initial render
  useEffect(() => {
    const savedFiles = localStorage.getItem("editor-files");
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  const handleRunCode = async () => {
    if (!selectedFile) return;
    
    setIsRunning(true);
    setOutput("");
    
    try {
      // Create a safe evaluation environment
      const code = files[selectedFile];
      const result = await new Promise((resolve) => {
        const output: string[] = [];
        const consoleLog = console.log;
        
        // Override console.log
        console.log = (...args) => {
          output.push(args.join(" "));
        };
        
        try {
          // Evaluate the code
          eval(code);
          resolve(output.join("\n"));
        } catch (error: any) {
          resolve(`Error: ${error.message}`);
        } finally {
          // Restore console.log
          console.log = consoleLog;
        }
      });
      
      setOutput(result as string);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      localStorage.setItem("editor-files", JSON.stringify(files));
    }
    // Ctrl/Cmd + R to run
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
      e.preventDefault();
      handleRunCode();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [files, selectedFile]);

  return (
    <div className="h-screen flex flex-col bg-background">
      <MenuBar />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* File Explorer */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <FileExplorer
            files={files}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onFileCreate={(name) => {
              setFiles((prev) => ({ ...prev, [name]: "" }));
              setSelectedFile(name);
            }}
            onFileDelete={(name) => {
              setFiles((prev) => {
                const newFiles = { ...prev };
                delete newFiles[name];
                return newFiles;
              });
              if (selectedFile === name) {
                setSelectedFile(Object.keys(files)[0] || null);
              }
            }}
          />
        </ResizablePanel>

        {/* Editor Area */}
        <ResizablePanel defaultSize={60}>
          <div className="h-full flex flex-col">
            <EditorTabs
              files={Object.keys(files)}
              selectedFile={selectedFile}
              onSelect={setSelectedFile}
            />
            <div className="flex-1">
              {selectedFile && (
                <Editor
                  height="100%"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={files[selectedFile]}
                  onChange={(value) => {
                    if (value && selectedFile) {
                      setFiles((prev) => ({ ...prev, [selectedFile]: value }));
                    }
                  }}
                  options={{
                    minimap: { enabled: true },
                    fontSize: 14,
                    fontFamily: "var(--font-jetbrains)",
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                  }}
                />
              )}
            </div>
            <div className="p-2 border-t flex justify-center">
              <Button
                onClick={handleRunCode}
                disabled={!selectedFile || isRunning}
                className="w-32"
              >
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? "Running..." : "Run"}
              </Button>
            </div>
          </div>
        </ResizablePanel>

        {/* Terminal/Output */}
        <ResizablePanel defaultSize={20} minSize={15}>
          <Terminal output={output} />
        </ResizablePanel>
      </ResizablePanelGroup>

      <StatusBar />
    </div>
  );
}