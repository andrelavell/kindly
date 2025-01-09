/**
 * Convert a string to URL-friendly slug
 * @param text Text to convert to slug
 * @returns URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()           // Convert to string
    .toLowerCase()        // Convert to lowercase
    .trim()              // Remove whitespace from both ends
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
}

/**
 * Generate search tokens from a given text
 * @param text Text to generate search tokens from
 * @returns Array of search tokens
 */
export function generateSearchTokens(text: string): string[] {
  if (!text) return [];
  
  // Convert to uppercase for consistent searching
  const words = text.toUpperCase().split(' ');
  const tokens = new Set<string>();

  // Add full words
  words.forEach(word => {
    if (word.length > 2) tokens.add(word); // Only add words longer than 2 characters
  });

  // Add complete name
  tokens.add(words.join(' '));

  return Array.from(tokens);
}
