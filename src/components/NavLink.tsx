import { useRouter } from 'next/router';
import React from 'react';
import LinkTo, { LinkToProps } from './LinkTo';

type Props = { activeClassName: string } & LinkToProps;

export default function NavLink({
  children,
  className,
  activeClassName,
  ...linkToProps
}: Props) {
  const { asPath } = useRouter();

  const resultClassName =
    asPath.startsWith(linkToProps.href.toString()) ||
    (linkToProps.as && asPath.startsWith(linkToProps.as.toString()))
      ? `${className} ${activeClassName}`.trim()
      : className;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LinkTo className={resultClassName || undefined} {...linkToProps}>
      {children}
    </LinkTo>
  );
}
