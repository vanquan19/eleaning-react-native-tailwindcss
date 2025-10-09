declare module "expo-document-picker" {
  export function getDocumentAsync(options?: any): Promise<any>;
  export const types: any;
  export default {
    getDocumentAsync: getDocumentAsync,
    types,
  };
}
