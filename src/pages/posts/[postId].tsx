import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import rehypeStringify from 'rehype-stringify/lib';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import styled from 'styled-components';
import { unified } from 'unified';
import HeadTemplate from '../../components/HeadTemplate';
import RelativeTime from '../../components/RelativeTime';
import * as PostConnector from '../../lib/PostConnector';

const Article = styled.article`
  box-sizing: content-box;
  max-width: 768px;
  padding: 20px 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  header {
    h1 {
      font-size: 48px;
      font-weight: bold;
      word-break: keep-all;
    }
  }
`;

const ContentSection = styled.section`
  font-size: 18px;
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
