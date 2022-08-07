import React, { useRef } from "react";

import "./styles/code.css";
import _CodeEditor from "./CodeEditor";
import CodePreview from "./CodePreview";
import Resizable from "./Resizable";
import { Cell } from "../redux";
import {
  useActionCreators,
  useTypedSelector,
  useCumulativeCode,
} from "../hooks";

const CodeEditor = React.forwardRef<React.FC>(_CodeEditor);

interface CodeProps {
  cell: Cell;
}

const Code: React.FC<CodeProps> = ({ cell }) => {
  const { id } = cell;

  const rawCode = useCumulativeCode(id);

  const bundle = useTypedSelector(({ bundles }) => {
    if (bundles) return bundles[id];
  });

  const codeEditorRef = useRef<any>();

  const { updateCell, createBundle } = useActionCreators();

  const onClick = async () => {
    const cellContent: string = codeEditorRef.current.showValue();

    rawCode.push(cellContent);

    createBundle(id, rawCode.join("\n"));

    updateCell(id, cellContent);
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
          <div className="code-preview-wrapper">
            {bundle && bundle.loading && (
              <div className="code-preview-loading">Loading...</div>
            )}
            {bundle && (bundle.code || bundle.error) && (
              <CodePreview code={bundle.code} error={bundle.error} />
            )}
          </div>
        </div>
      </Resizable>
    </div>
  );
};

export default Code;
