import esbuild from "esbuild-wasm";

import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { onLoadPlugin } from "./plugins/onload-plugin";

const bundle = async (rawCode: string) => {
  const result = await esbuild.build({
    entryPoints: ["index.js"],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), onLoadPlugin(rawCode)],
  });

  return result.outputFiles[0].text;
};

export default bundle;
