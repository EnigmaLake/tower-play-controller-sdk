const ALLOWED_SEPARATORS = [",", "."];

export function findFirstSeparatorIndex(value: string): number | undefined {
  const index = [...value].findIndex((char) =>
    ALLOWED_SEPARATORS.includes(char),
  );
  return index !== -1 ? index : undefined;
}

export function cleanInputNumber(value: string): string {
  const cleaned = value.replace(/[^0-9,.]/g, "");
  if (cleaned === "0") {
    return cleaned;
  }

  const trimmed = cleaned.replace(/^0+(?!$)/, "").replace(/(,|\.){2,}/g, "$1");
  const separatorIndex = findFirstSeparatorIndex(trimmed);
  if (separatorIndex === undefined) {
    return trimmed;
  }

  const integerPart =
    trimmed.slice(0, separatorIndex).replace(/[,.]/g, "") || "0";
  const decimalPart = trimmed.slice(separatorIndex + 1).replace(/[,.]/g, "");

  return `${integerPart}.${decimalPart}`;
}
