import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join as pathJoin } from 'path';
import { getPubPosts, Post } from '../src/lib/PostConnector';

const ROOT_DIR_PATH = pathJoin(process.cwd(), 'json-api');

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

  mkdirIfNotExists(dir);

  postPages.forEach((postPage, page) => {
    writeFileSync(pathJoin(dir, `${page}.json`), JSON.stringify(postPage));
  });
}

generatePostPageJsonApi(pathJoin(`${ROOT_DIR_PATH}/posts/page`), 3);
