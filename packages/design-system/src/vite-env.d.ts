/// <reference types="vite/client" />

declare module '*.mdx' {
  const content: React.ComponentType;
  export default content;
}
