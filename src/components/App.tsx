import React, { useState, useRef, useEffect } from "react";
import esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { onLoadPlugin } from "../plugins/onload-plugin";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const esbuildRef = useRef<any>();

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
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), onLoadPlugin(input)],
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
