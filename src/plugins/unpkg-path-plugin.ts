import esbuild from "esbuild-wasm";
import axios from "axios";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResolve", args);

        const baseUnpkgUrl = "https://www.unpkg.com";

        if (args.path.includes("./") || args.path.includes("../")) {
          const pathname = new URL(
            args.path,
            `${baseUnpkgUrl}${args.resolveDir}/`
          ).pathname;

          return { path: `${baseUnpkgUrl}${pathname}`, namespace: "a" };
        }

        if (args.path !== "index.js") {
          return { path: `${baseUnpkgUrl}/${args.path}`, namespace: "a" };
        }

        return { path: args.path, namespace: "a" };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import React from "react";
              import axios from "axios";
              console.log("message");
            `,
          };
        } else {
          const { data, request } = await axios.get(args.path);

          const responsePathname = new URL(".", request.responseURL).pathname;

          return {
            loader: "jsx",
            contents: data,
            resolveDir: responsePathname,
          };
        }
      });
    },
  };
};
