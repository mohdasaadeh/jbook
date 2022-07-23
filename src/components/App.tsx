import React, { useState, useRef, useEffect } from "react";
import esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { onLoadPlugin } from "../plugins/onload-plugin";

const App: React.FC = () => {
  const [input, setInput] = useState("");

  const esbuildRef = useRef<any>();
  const iframeRef = useRef<any>();

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
    // This is when a user enters a code that deletes the root element inside the iframe,
    // so the iframe gets reloaded with new root on every click.
    iframeRef.current.srcdoc = html;

    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), onLoadPlugin(input)],
    });

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  const html = `
    <html>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', async (event) => {
            try {
              eval(event.data);
            } catch(error) {
              document.getElementById('root').innerHTML = '<div style="color: red;">' + error + '</div>';
            }
          }, false);
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default App;
