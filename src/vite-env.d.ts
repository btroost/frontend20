/// <reference types="vite/client" />
// src/global.d.ts or src/api.d.ts (if specific to api module)
declare module './api' {
    export function someFunction(): void; // Example, add your actual types
    export const callLambdaFunction: string;   // If you have constants, etc.
  }
  