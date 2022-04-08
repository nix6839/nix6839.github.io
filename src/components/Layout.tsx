import { ReactNode } from 'react';
import styled from 'styled-components';
import SiteHeader from './SiteHeader';

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <SiteHeader />
      <Main>{children}</Main>
    </>
  );
}
