import esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { onLoadPlugin } from "./plugins/onload-plugin";

const bundle = async (rawCode: string) => {
  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), onLoadPlugin(rawCode)],
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return { code: result.outputFiles[0].text, error: "" };
  } catch (error) {
    return {
      code: "",
      error: error instanceof Error && error.message,
    };
  }
};

export default bundle;
