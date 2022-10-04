declare module '@strapi/helper-plugin' {
  export function prefixPluginTranslations(data: Record<string, string>, pluginId: string): Record<string, string>;
  export const auth: {
    getToken(): string;
    clearAppStorage(): void;
  };
  export function useLibrary(): {
    components: Record<string, React.FC>;
  };
  export function prefixFileUrlWithBackendUrl(url: string): string;
}
