import { GetStaticProps } from 'next';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import { PostPage } from '../../../bin/generate-json-api';
import HeadTemplate from '../../components/HeadTemplate';
import SpinIcon from '../../components/icons/SpinIcon';
import PostItem from '../../components/PostItem';
import * as PostRequest from '../../lib/PostRequest';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background: linear-gradient(to right, #2d46b9, #af2896);
  padding-top: 100px;
  padding-bottom: 70px;
  color: #fff;

  header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    h1 {
      font-weight: bold;
      font-size: 70px;
    }
    p {
      font-size: 18px;
    }
  }
`;

const BodyWrapper = styled.div`
  background-color: #f3f6fb;
  margin-top: 245px;
  flex-grow: 1;
  isolation: isolate;

  > ul {
    --grid-column-count: 3;
    @media (max-width: 850px) {
      --grid-column-count: 2;
    }
    @media (max-width: 576px) {
      --grid-column-count: 1;
    }
    display: grid;
    grid-template-columns: repeat(var(--grid-column-count), 1fr);
    gap: 30px;
    position: relative;
    top: -40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    li {
      min-width: 0;
    }
  }

  > svg {
    display: block;
    margin: 0 auto;
  }
`;

type Props = {
  initialPostPage: PostPage;
};

export default function Posts({ initialPostPage }: Props) {
  const { data, status, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['postPage'],
      async ({ pageParam }) => PostRequest.getPage(pageParam),
      {
        initialData: {
          pages: [initialPostPage],
          pageParams: [0],
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
      },
    );

  const observerTargetRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const currentTarget = observerTargetRef.current;
    if (currentTarget === null) {
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [fetchNextPage, data]);

  /**
   * initialData 때문에 절대 트리거 되지 않음.
   * 타입가드를 위함 아래 링크 참조
   * https://github.com/tannerlinsley/react-query/issues/3310
   */
  if (status === 'loading') {
    return <>Loading...</>;
  }

  if (status === 'error') {
    if (error instanceof Error) {
      return <>에러: {error.message}</>;
    }
    return <>알 수 없는 에러 발생.</>;
  }

  const lastPostId = data.pages.at(-1)?.posts.at(-1)?.id;

  return (
    <>
      <HeadTemplate
        title="게시글 목록"
        description="최근 게시글 목록을 확인해 보세요."
        urlPath="/posts"
        type="website"
      />
      <HeaderWrapper>
        <header>
          <h1>게시글 목록</h1>
          <p>최근 게시글 목록을 확인해 보세요.</p>
        </header>
      </HeaderWrapper>
      <BodyWrapper>
        <ul>
          {data.pages.map((page) =>
            page.posts.map((post) => (
              <li
                key={post.id}
                ref={post.id === lastPostId ? observerTargetRef : undefined}
              >
                <PostItem post={post} />
              </li>
            )),
          )}
        </ul>
        {isFetchingNextPage && <SpinIcon />}
      </BodyWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const initialPostPage = await PostRequest.getPage();
  return { props: { initialPostPage } };
};
