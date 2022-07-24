import React, { useRef, useImperativeHandle } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import prettier from "prettier";
import parser from "prettier/parser-babel";

import "./styles/code-editor.css";
import "./styles/syntax.css";

const CodeEditor: React.ForwardRefRenderFunction<any> = (props, ref) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;

    ref = editorRef;

    editor.getModel()?.updateOptions({ tabSize: 2 });
  };

  useImperativeHandle(ref, () => {
    return {
      showValue() {
        return editorRef.current.getValue();
      },
    };
  });

  const onFormatClick = () => {
    // get current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    // format that value
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        onMount={handleEditorDidMount}
        theme="vs-dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
