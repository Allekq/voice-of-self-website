const INTERNAL_PROTOCOL_PATTERN = /^(?:[a-z]+:)?\/\//i;

const normalizeBasePath = (value: string) => {
  if (!value || value === "/") {
    return "/";
  }

  return value.endsWith("/") ? value : `${value}/`;
};

export const basePath = normalizeBasePath(import.meta.env.BASE_URL ?? "/");

export const withBase = (path: string) => {
  if (!path || path === "/") {
    return basePath;
  }

  if (
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    INTERNAL_PROTOCOL_PATTERN.test(path)
  ) {
    return path;
  }

  return `${basePath}${path.replace(/^\/+/, "")}`;
};

export const isExternalHref = (href: string) =>
  href.startsWith("mailto:") ||
  href.startsWith("tel:") ||
  href.startsWith("#") ||
  INTERNAL_PROTOCOL_PATTERN.test(href);
