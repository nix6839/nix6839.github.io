import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ReactNode, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { PostSummary } from '../../bin/generate-json-api';

const RelativePubDateCss = css`
  display: block;
  font-size: 14px;
  color: #282828;
`;

const RelativePubDateLoading = styled.time`
  ${RelativePubDateCss}
`;

const RelativeTime = dynamic(() => import('./RelativeTime'), {
  loading: () => <RelativePubDateLoading>로딩 중...</RelativePubDateLoading>,
  ssr: false,
});

const Article = styled.article`
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 1px 7px 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  background-color: #fff;
  a {
    text-decoration: none;
  }
`;

// const ThumbnailHolder = styled.section`
//   position: relative;
//   height: 173px;
//   img {
//     border-top-left-radius: 6px;
//     border-top-right-radius: 6px;
//   }
// `;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  justify-content: space-between;
  padding: 12px 16px;
`;

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PostCardHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RelativePubDate = styled(RelativeTime)`
  ${RelativePubDateCss}
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
  word-break: keep-all;
  line-height: 1.3;
`;

const ContentSummary = styled.p`
  font-size: 16px;
  color: #282828;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

// const Tags = styled.ul`
//   font-size: 14px;
//   color: #777;
//   li {
//     display: inline-block;
//     a {
//       &::before {
//         content: '#';
//       }
//     }
//   }
// `;

type Props = {
  post: PostSummary;
};

export default function PostItem({ post }: Props) {
  const LinkToPost = useCallback(
    (props: { children: ReactNode }) => (
      <Link href={`/posts/${post.id}`}>{props.children}</Link>
    ),
    [post.id],
  );
  return (
    <Article>
      {/* <LinkToPost>
        <ThumbnailHolder>
          <Image src={post.thumbnail} alt="썸네일" layout="fill" />
        </ThumbnailHolder>
      </LinkToPost> */}
      <TextContainer>
        <UpperContainer>
          <PostCardHeader>
            <RelativePubDate dateTime={post.pubDate} locale="ko" />
            <LinkToPost>
              <Title>{post.title}</Title>
            </LinkToPost>
          </PostCardHeader>
          <LinkToPost>
            <ContentSummary>{post.summary}</ContentSummary>
          </LinkToPost>
        </UpperContainer>
        {/* <section>
          <Tags>{post.tags.map()}</Tags>
        </section> */}
      </TextContainer>
    </Article>
  );
}
