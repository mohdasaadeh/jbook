import esbuild, { OnLoadResult } from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

export const unpkgPathPlugin = () => {
  const baseUnpkgUrl = "https://www.unpkg.com";
  const store = localforage.createInstance({
    name: "nameHere",
  });

  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
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

      build.onLoad(
        { filter: /.*/ },
        async (args: any): Promise<OnLoadResult> => {
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
            const storedPackage = await store.getItem<OnLoadResult>(args.path);

            if (storedPackage) return storedPackage;

            const { data, request } = await axios.get(args.path);

            const responsePathname = new URL(".", request.responseURL).pathname;

            const result: OnLoadResult = {
              loader: "jsx",
              contents: data,
              resolveDir: responsePathname,
            };

            await store.setItem(args.path, result);

            return result;
          }
        }
      );
    },
  };
};
