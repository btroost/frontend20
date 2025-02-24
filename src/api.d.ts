// src/global.d.ts or src/api.d.ts (if specific to api module)
declare module './api' {
    export const callLambdaFunction: (arg1: string, arg2: string) =>json;   // If you have constants, etc.
  }
  