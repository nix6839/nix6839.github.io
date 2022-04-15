import rehypeShiki from '@leafac/rehype-shiki';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import rehypeStringify from 'rehype-stringify/lib';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import * as shiki from 'shiki';
import styled from 'styled-components';
import { unified } from 'unified';
import HeadTemplate from '../../components/HeadTemplate';
import RelativeTime from '../../components/RelativeTime';
import * as PostConnector from '../../lib/PostConnector';

const Article = styled.article`
  box-sizing: content-box;
  max-width: 768px;
  padding: 20px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  header {
    h1 {
      font-size: 48px;
      font-weight: bold;
      word-break: keep-all;
    }
  }
`;

const ContentSection = styled.section`
  line-height: 1.7;
  font-size: 18px;

  *:nth-child(1) {
    margin-top: 40px;
  }
  h2 {
    font-size: 32px;
    margin-top: 32px;
    font-weight: bold;
    line-height: 1.5;
  }
  p {
    margin: 14px 0;
  }
  ul {
    list-style-type: disc;
  }
  ul,
  ol {
    list-style-position: inside;
  }
  pre.shiki {
    margin: 14px 0;
    font-size: 16px;
    white-space: pre-wrap;
    word-break: break-all;
    padding: 10px 16px;
    border-radius: 5px;
  }
`;

type Props = {
  post: PostConnector.Post;
};

export default function PostPage({ post }: Props) {
  return (
    <>
      <HeadTemplate
        title={post.title}
        description="TODO"
        type="article"
        urlPath={`/posts/${post.id}`}
      />
      <Article>
        <header>
          <h1>{post.title}</h1>
          <RelativeTime dateTime={post.pubDate} locale="ko" />
        </header>
        <ContentSection dangerouslySetInnerHTML={{ __html: post.content }} />
      </Article>
    </>
  );
}

interface Params extends ParsedUrlQuery {
  postId: string;
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const postIds = PostConnector.getIds();
  const paths = postIds.map((postId) => ({
    params: { postId },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const { postId } = params!;
  const post = PostConnector.getOne(postId);
  if (post === undefined) {
    return { notFound: true };
  }

  const htmlContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeShiki, {
      highlighter: await shiki.getHighlighter({
        theme: 'dark-plus',
      }),
    })
    .process(post.content);

  return {
    props: {
      post: {
        ...post,
        content: htmlContent.toString(),
      },
    },
  };
};
