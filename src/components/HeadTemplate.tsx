import Head from 'next/head';
import getUrl from '../lib/getUrl';

interface Props {
  title: string;
  description: string;
  urlPath: string;
  type: 'website' | 'article';
  image?: string;
}

export default function HeadTemplate({
  title,
  description,
  type,
  urlPath,
  image = undefined,
}: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:url" property="og:url" content={getUrl(urlPath)} />
      <meta key="og:type" property="og:type" content={type} />
      {image && <meta key="og:image" property="og:image" content={image} />}
    </Head>
  );
}
