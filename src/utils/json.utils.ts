export type JsonString<T> = string & { __jsonString__: T };

export const toJsonString = <T>(obj: T): JsonString<T> => {
  return JSON.stringify(obj) as JsonString<T>;
};

export function parseJsonString<T>(jsonStr: JsonString<T> | string): T {
  return JSON.parse(jsonStr);
}
