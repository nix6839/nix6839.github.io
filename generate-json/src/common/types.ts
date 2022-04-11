export interface File {
  id: string;
  filePath: string;
  content: string;
}

export interface MarkdownFile<T extends object = Record<string, any>>
  extends File {
  frontMatter: T;
}

export interface FrontMatter {
  title: string;
  draft: boolean;
}
