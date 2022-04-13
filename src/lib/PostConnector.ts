import {
  IsBoolean,
  IsDateString,
  IsString,
  validateSync,
  ValidationError,
} from 'class-validator';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join as pathJoin } from 'path';

interface File {
  id: string;
  filePath: string;
  content: string;
}

interface MarkdownFile<FrontMatterType extends object = Record<string, any>>
  extends File {
  frontMatter: FrontMatterType;
}

interface PostFileFrontMatter {
  title: string;
  draft: boolean;
  pubDate: string;
}

type PostFile = MarkdownFile<PostFileFrontMatter>;

export type Post = Omit<PostFile, 'filePath' | 'frontMatter'> &
  Omit<PostFileFrontMatter, 'draft'>;

function readFilesFromDir(dirPath: string): File[] {
  const fileInfos = readdirSync(dirPath).map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
    filePath: pathJoin(dirPath, fileName),
  }));
  const files = fileInfos.map<File>((fileInfo) => ({
    ...fileInfo,
    content: readFileSync(fileInfo.filePath, 'utf-8'),
  }));
  return files;
}

function fileToMarkdownFile({
  id,
  filePath,
  content: fileContent,
}: File): MarkdownFile {
  const { content, data: frontMatter } = matter(fileContent);
  return { id, filePath, content, frontMatter };
}

class PostFileFrontMatterValidator implements PostFileFrontMatter {
  constructor(public readonly filePath: string, obj: Record<string, any>) {
    this.title = obj.title;
    this.draft = obj.draft;
    this.pubDate = obj.pubDate;
  }

  @IsString()
  title: string;

  @IsBoolean()
  draft: boolean;

  @IsDateString()
  pubDate: string;

  public validate(): ValidationError[] {
    return validateSync(this, { forbidUnknownValues: true });
  }
}

function markdownFileIsValidPostFile(
  markdownFile: MarkdownFile,
): asserts markdownFile is PostFile {
  const validationErrors = new PostFileFrontMatterValidator(
    markdownFile.filePath,
    markdownFile.frontMatter,
  ).validate();
  if (validationErrors.length > 0) {
    throw validationErrors;
  }
}

function mapDefaultPostFileValueToMarkdownFile<T extends MarkdownFile>(
  markdownFile: T,
): T & { frontMatter: { draft: boolean } } {
  return {
    ...markdownFile,
    frontMatter: {
      draft: false,
      ...markdownFile.frontMatter,
    },
  };
}

function filesToPostFiles(files: File[]): PostFile[] {
  const markdownFiles = files
    .map(fileToMarkdownFile)
    .map(mapDefaultPostFileValueToMarkdownFile);

  const postFiles: PostFile[] = [];
  const validationErrorsList: ValidationError[][] = [];
  markdownFiles.forEach((markdownFile) => {
    try {
      markdownFileIsValidPostFile(markdownFile);
      postFiles.push(markdownFile);
    } catch (validationErrors: any) {
      validationErrorsList.push(validationErrors);
    }
  });
  if (validationErrorsList.length > 0) {
    throw validationErrorsList;
  }
  return postFiles;
}

function getPostFilesFromDir(dirPath: string): PostFile[] {
  const files = readFilesFromDir(dirPath);
  const postFiles = filesToPostFiles(files);
  return postFiles;
}

function getPubPostsFromPostFiles(postFiles: PostFile[]): Post[] {
  const pubPostFiles = postFiles.filter(
    (markdownFile) => markdownFile.frontMatter.draft === false,
  );
  const posts = pubPostFiles.map<Post>((postFile) => {
    const { filePath, frontMatter, ...postData } = postFile;
    const { draft, ...postInfo } = frontMatter;
    return { ...postData, ...postInfo };
  });
  return posts;
}

function getPubPostsFromDir(dirPath: string): Post[] {
  const postFiles = getPostFilesFromDir(dirPath);
  const pubPosts = getPubPostsFromPostFiles(postFiles);
  return pubPosts;
}

export function getPubPosts() {
  return getPubPostsFromDir(pathJoin(process.cwd(), 'content'));
}

const posts = getPubPosts();

export function getIds(): string[] {
  return posts.map((post) => post.id);
}

export function getOne(postId: string): Post | undefined {
  return posts.find((post) => post.id === postId);
}
