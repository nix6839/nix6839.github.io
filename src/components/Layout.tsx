import { ReactNode } from 'react';
import styled from 'styled-components';
import SiteHeader from './SiteHeader';

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

type Props = {
  toUseHeaderTransparent?: boolean;
  children: ReactNode;
};

export default function Layout({
  toUseHeaderTransparent = false,
  children,
}: Props) {
  return (
    <>
      <SiteHeader toUseTransparent={toUseHeaderTransparent} />
      <Main>{children}</Main>
    </>
  );
}
