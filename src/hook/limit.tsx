const limitWords = (htmlString: string, wordLimit: number): string => {
  const textOnly = htmlString.replace(/<[^>]*>/g, "");
  const words = textOnly.trim().split(/\s+/);

  const truncated = words.slice(0, wordLimit).join(" ");

  return truncated + (words.length > wordLimit ? "..." : "");
};
export default limitWords;
