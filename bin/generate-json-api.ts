import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { getPubPosts, Post } from '../src/lib/PostConnector';

const ROOT_DIR_PATH = pathJoin(process.cwd(), 'json-api');
const JSON_API_PATH = {
  postsPages: `${ROOT_DIR_PATH}/posts/pages`,
};

const posts = getPubPosts();

function mkdirIfNotExists(dirPath: string) {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

interface PostPage {
  posts: Post[];
  nextPage?: number;
}

function generatePostPageJsonApi(dir: string, pagePostCount: number) {
  const postPages: PostPage[] = [];
  const maxPage = Math.floor(posts.length / pagePostCount);

  for (let page = 0; page <= maxPage; page += 1) {
    const currentPageFirstPostIndex = page * pagePostCount;
    const currentPagePosts = posts.slice(
      currentPageFirstPostIndex,
      currentPageFirstPostIndex + pagePostCount,
    );
    const postPage: PostPage = {
      posts: currentPagePosts,
    };
    const nextPage = page + 1;
    if (nextPage <= maxPage) {
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

  generatePostPageJsonApi(pathJoin(JSON_API_PATH.postsPages), 3);
}

main();
