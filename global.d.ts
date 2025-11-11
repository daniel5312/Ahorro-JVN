declare module "*.css";

declare module "vite-tsconfig-paths";
declare module "vite-tsconfig-paths" {
  import type { Plugin } from 'vite';
  const tsconfigPaths: () => Plugin;
  export default tsconfigPaths;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg"