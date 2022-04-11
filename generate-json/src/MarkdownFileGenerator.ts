import matter from 'gray-matter';
import { File, MarkdownFile } from './common/types';

export function fromFile({
  id,
  filePath,
  content: fileContent,
}: File): MarkdownFile {
  const { content, data: frontMatter } = matter(fileContent);
  return { id, filePath, content, frontMatter };
}
