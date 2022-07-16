import React, { useState, useRef, useEffect } from "react";
import esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";

const App: React.FC = () => {
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
      plugins: [unpkgPathPlugin()],
    });

    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
