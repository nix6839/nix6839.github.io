import HeadTemplate from '../components/HeadTemplate';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <>
      <HeadTemplate
        title="한영우의 개발 블로그"
        description="한영우의 개발 블로그입니다."
        type="website"
        urlPath="/"
      />
      <Layout>
        <h1>안녕하세요!!</h1>
      </Layout>
    </>
  );
}
