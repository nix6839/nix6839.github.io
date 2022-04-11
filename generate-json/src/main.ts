import { writeFileSync } from 'fs';
import { FrontMatter, MarkdownFile } from './common/types';
import GetValidatedMarkdownFiles from './GetValidatredMarkdownFiles';

async function main() {
  const posts = await GetValidatedMarkdownFiles.fromDir('../content');
  const pubPosts = posts.filter(
    (markdownFile) => !markdownFile.frontMatter.draft,
  );
  const maxPageIndex = Math.floor(pubPosts.length / 3);
  const postsPages: {
    posts: Omit<MarkdownFile<Omit<FrontMatter, 'draft'>>, 'filePath'>[];
    nextPage?: number;
  }[] = [];
  pubPosts.forEach(({ filePath, ...markdownFile }, i) => {
    const index = Math.floor(i / 3);
    if (postsPages[index] === undefined) {
      postsPages[index] = { posts: [] };
      if (index < maxPageIndex) {
        postsPages[index].nextPage = index + 1;
      }
    }
    const { draft, ...frontMatter } = markdownFile.frontMatter;
    postsPages[index].posts.push({ ...markdownFile, frontMatter });
  });
  postsPages.forEach((markdownFilesPage, i) => {
    writeFileSync(`json-api/${i}.json`, JSON.stringify(markdownFilesPage));
  });
}

main();
