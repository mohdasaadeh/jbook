import React, { useState, useRef } from "react";

import _CodeEditor from "./CodeEditor";
import bundle from "../bundler";
import CodePreview from "./CodePreview";
import Resizable from "./Resizable";

const CodeEditor = React.forwardRef<React.FC>(_CodeEditor);

const Code: React.FC = () => {
  const [code, setCode] = useState("");
  const [bundleStatus, setBundleStatus] = useState("");

  const codeEditorRef = useRef<any>();

  const onClick = async () => {
    const result = await bundle(codeEditorRef.current.showValue());

    setCode(result.code);
    setBundleStatus(result.error || "");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button style={{ fontSize: "18px" }} onClick={onClick}>
          Execute
        </button>
      </div>
      <Resizable direction="vertical">
        <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
          <Resizable direction="horizontal">
            <CodeEditor ref={codeEditorRef} />
          </Resizable>
          <CodePreview code={code} error={bundleStatus} />
        </div>
      </Resizable>
    </div>
  );
};

export default Code;
