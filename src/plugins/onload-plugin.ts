import esbuild, { OnLoadResult } from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

export const onLoadPlugin = (inputCode: string) => {
  const store = localforage.createInstance({
    name: "nameHere",
  });

  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad(
        { filter: /(^index\.js$)/ },
        async (args: any): Promise<OnLoadResult> => {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }
      );

      build.onLoad(
        { filter: /.*/ },
        async (args: any): Promise<OnLoadResult> => {
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
      );
    },
  };
};
