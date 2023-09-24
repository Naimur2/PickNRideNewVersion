import config from "@config";

interface TIsValidImageUrlReturn {
  hasValidExtension: boolean;
  hasHttpOrHttps: boolean;
}

type TIsValidImageUrlFn = (url: string) => string | null;

const validImageUrl: TIsValidImageUrlFn = (url) => {
  if (!url) return null;

  const hasValidExtension =
    url.includes(".jpeg") ||
    url.includes(".jpg") ||
    url.includes(".gif") ||
    url.includes(".png");

  const hasHttpOrHttps = url.match(/^(http|https):\/\//) != null;

  if (!hasHttpOrHttps && hasValidExtension) {
    return `${config.API_V1}${url}`;
  }

  if (hasHttpOrHttps && hasValidExtension) {
    return url;
  }

  return null;
};

export default validImageUrl;
