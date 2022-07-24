import React, { useState, useRef, useEffect } from "react";
import esbuild from "esbuild-wasm";

import _CodeEditor from "./CodeEditor";
import bundle from "../bundler";
import CodePreview from "./CodePreview";

const CodeEditor = React.forwardRef<React.FC>(_CodeEditor);

const Code: React.FC = () => {
  const [code, setCode] = useState("");

  const esbuildRef = useRef<any>();
  const codeEditorRef = useRef<any>();

  useEffect(() => {
    const startService = async () => {
      esbuildRef.current = await esbuild.initialize({
        worker: true,
        wasmURL: "/esbuild.wasm",
      });
    };

    startService();
  }, []);

  const onClick = async () => {
    const result = await bundle(codeEditorRef.current.showValue());

    setCode(result);
  };

  return (
    <div>
      <CodeEditor ref={codeEditorRef} />
      <div>
        <button onClick={onClick}>Execute</button>
      </div>
      <CodePreview code={code} />
    </div>
  );
};

export default Code;
