import React, { useRef, useEffect } from "react";

import "./styles/code-preview.css";

interface CodePreviewProps {
  code: string;
  error: string | false;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const errorHandler = (error) => {
            document.getElementById('root').innerHTML = '<div style="color: red;">' + error + '</div>';

            console.error(error);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();

            errorHandler(event.error);
          });

          window.addEventListener('message', async (event) => {
            try {
              eval(event.data);
            } catch(error) {
              errorHandler(error);
            };
          }, false);
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<CodePreviewProps> = ({ code, error }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    // This is when a user enters a code that deletes the root element inside the iframe,
    // so the iframe gets reloaded with new root on every click.
    iframeRef.current.srcdoc = html;

    // This setTimeout is because when we assign a new html to the iframe in the line above,
    // the event listener for messages needs some time to be executed, so if we didn't put
    // this timeout, the message won't be listened when we post it.
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <>
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </>
  );
};

export default CodePreview;
