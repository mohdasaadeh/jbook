import React, { useRef, useImperativeHandle } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

const CodeEditor: React.ForwardRefRenderFunction<any> = (props, ref) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;

    ref = editorRef;
  };

  useImperativeHandle(ref, () => {
    return {
      showValue() {
        return editorRef.current.getValue();
      },
    };
  });

  return (
    <Editor
      height="500px"
      defaultLanguage="javascript"
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
