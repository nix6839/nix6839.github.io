import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join as pathJoin } from 'path';
import remarkParse from 'remark-parse';
import remarkRetext from 'remark-retext';
import { Parser } from 'retext-english';
import retextStringify from 'retext-stringify';
import { unified } from 'unified';
import { getPubPosts, Post } from '../src/lib/PostConnector';

const ROOT_DIR_PATH = pathJoin(process.cwd(), 'json-api');
const JSON_API_PATH = {
  postPage: pathJoin(ROOT_DIR_PATH, 'posts/pages'),
};

function mkdirIfNotExists(dirPath: string) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

export interface PostSummary extends Omit<Post, 'content'> {
  summary: string;
}
export interface PostPage {
  posts: PostSummary[];
  nextPage?: number;
}

function generatePostPageJsonApi(
  posts: Post[],
  dir: string,
  pagePostCount: number,
) {
  const postPages: PostPage[] = [];
  const totalPageCount = Math.ceil(posts.length / pagePostCount);

  for (let page = 0; page < totalPageCount; page += 1) {
    const currentPageFirstPostIndex = page * pagePostCount;
    const currentPagePostSummaries: PostSummary[] = posts
      .slice(
        currentPageFirstPostIndex,
        currentPageFirstPostIndex + pagePostCount,
      )
      .map(({ content, ...post }) => ({
        ...post,
        summary: unified()
          .use(remarkParse)
          .use(remarkRetext, Parser)
          .use(retextStringify)
          .processSync(content)
          .toString()
          .slice(0, 250),
      }));
    const postPage: PostPage = {
      posts: currentPagePostSummaries,
    };
    const nextPage = page + 1;
    if (nextPage < totalPageCount) {
      postPage.nextPage = nextPage;
    }
    postPages.push(postPage);
  }

  postPages.forEach((postPage, page) => {
    writeFileSync(pathJoin(dir, `${page}.json`), JSON.stringify(postPage));
  });
}

function main() {
  rmSync(ROOT_DIR_PATH, { recursive: true, force: true });

  Object.values(JSON_API_PATH).forEach((jsonApiPath) => {
    mkdirIfNotExists(jsonApiPath);
  });

  const posts = getPubPosts();

  generatePostPageJsonApi(
    posts.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    ),
    pathJoin(JSON_API_PATH.postPage),
    3,
  );
}

main();
