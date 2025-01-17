export enum BreakpointsEnum {
  l = 1200,
  m = 768,
  sm = 576,
  s = 375,
}

export type paths = {
  "/posts": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": any[];
          };
        };
      };
    };
  };
};

export const API_URL = "https://jsonplaceholder.typicode.com/posts";
