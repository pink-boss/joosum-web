export default function isValidHttpUrl(input: unknown): input is string {
  if (typeof input !== "string") {
    return false;
  }
  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
