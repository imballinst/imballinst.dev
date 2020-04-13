export function createGrammaticalNoun(
  text: string,
  count: number,
  blendText?: string
) {
  if (blendText === undefined) {
    return `${text}${count > 1 ? 's' : ''}`;
  }

  const sliced = text.slice(0, -1);

  return `${sliced}${count > 0 ? blendText : ''}`;
}
