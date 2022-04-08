import NextImage, { ImageLoader, ImageProps } from 'next/image';

type Props = Omit<ImageProps, 'loader'>;

const customLoader: ImageLoader = ({ src }) => {
  return src;
};

export default function Image(props: Props) {
  return <NextImage {...props} loader={customLoader} />;
}
