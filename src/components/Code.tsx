import React, { useState, useRef } from "react";

import _CodeEditor from "./CodeEditor";
import bundle from "../bundler";
import CodePreview from "./CodePreview";
import Resizable from "./Resizable";
import { Cell } from "../redux";
import { useActionCreators } from "../hooks";

const CodeEditor = React.forwardRef<React.FC>(_CodeEditor);

interface CodeProps {
  cell: Cell;
}

const Code: React.FC<CodeProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [bundleStatus, setBundleStatus] = useState("");

  const codeEditorRef = useRef<any>();

  const { updateCell } = useActionCreators();

  const onClick = async () => {
    const result = await bundle(codeEditorRef.current.showValue());

    setCode(result.code);
    setBundleStatus(result.error || "");

    updateCell(cell.id, code);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="button is-secondary is-medium" onClick={onClick}>
          Execute and Update
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
