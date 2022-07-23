import esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  const baseUnpkgUrl = "https://www.unpkg.com";

  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        const pathname = new URL(
          args.path,
          `${baseUnpkgUrl}${args.resolveDir}/`
        ).pathname;

        return { path: `${baseUnpkgUrl}${pathname}`, namespace: "a" };
      });

      build.onResolve({ filter: /(^index\.js$)/ }, async (args: any) => {
        return { path: "index.js", namespace: "a" };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return { path: `${baseUnpkgUrl}/${args.path}`, namespace: "a" };
      });
    },
  };
};
