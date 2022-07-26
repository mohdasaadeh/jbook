import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from "../redux";
import { useActionCreators } from "../hooks";
import "./styles/text-editor.css";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(cell.content || "Start typing...");

  const { updateCell } = useActionCreators();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={value}
          onChange={(v) => {
            setValue(v || "");

            updateCell(cell.id, v || "");
          }}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
