import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import styled from 'styled-components';
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
        <ContentSection>{post.content}</ContentSection>
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

export const getStaticProps: GetStaticProps<Props, Params> = ({ params }) => {
  const { postId } = params!;
  const post = PostConnector.getOne(postId);
  if (post === undefined) {
    return { notFound: true };
  }
  return {
    props: {
      post,
    },
  };
};
