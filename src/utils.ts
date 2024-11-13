export default function getQueryParamFromURL(paramName: string, defaultValue: string | null = null): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(paramName);
  return paramValue !== null ? paramValue : defaultValue;
}
