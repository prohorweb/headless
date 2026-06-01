/**
 * Extract list item text from skill_group post HTML content.
 */
export function parseSkillTagsFromHtml(html) {
  if (!html || typeof html !== 'string') return []
  return html
    .split(/<li[^>]*>/i)
    .slice(1)
    .map((chunk) => chunk.replace(/<\/li>[\s\S]*/i, '').trim())
    .filter(Boolean)
}
