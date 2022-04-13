import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { getPubPosts, Post } from '../src/lib/PostConnector';

const ROOT_DIR_PATH = pathJoin(process.cwd(), 'json-api');
const JSON_API_PATH = {
  postPage: `${ROOT_DIR_PATH}/posts/pages`,
};

const posts = getPubPosts();

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

function generatePostPageJsonApi(dir: string, pagePostCount: number) {
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
        summary: content.slice(0, 200),
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

  generatePostPageJsonApi(pathJoin(JSON_API_PATH.postPage), 3);
}

main();
