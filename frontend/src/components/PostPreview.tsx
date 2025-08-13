function getTextPreview(content: any[]): string {
  const paragraphs = content
    .filter(block => block.type === 'paragraph' && block.data?.text)
    .map(block => block.data.text)
    .join(' ');

  return paragraphs.slice(0, 150) + (paragraphs.length > 150 ? '...' : '');
}
