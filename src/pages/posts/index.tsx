import { GetStaticProps } from 'next';
import styled from 'styled-components';
import HeadTemplate from '../../components/HeadTemplate';

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
`;

type Props = {};

export default function Posts({}: Props) {
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
        <ul></ul>
      </BodyWrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return { props: {} };
};
