---
title: Code Test 1
pubDate: '2022-04-15T04:10+09'
---

```tsx
export default function PostPage({ post }: Props) {
  // 한줄 주석
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

/**
 * 여러줄 주석
 */
interface Params extends ParsedUrlQuery {
  postId: string;
}

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
    .use(rehypeHighlight)
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
```
