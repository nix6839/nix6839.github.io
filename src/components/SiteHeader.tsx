import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppSelector } from '../app/hooks';
import { selectCurrentScrollY } from '../app/scrollYHistorySlice';
import SiteIcon from './icons/SiteIcon';
import LinkTo from './LinkTo';

const RightSection = styled.div`
  display: flex;
  gap: 8px;

  color: #000;
  button {
    padding: 8px;
    border-radius: 50%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

const Nav = styled.nav`
  display: flex;

  a {
    padding: 16px 10px;
    font-size: 16px;
    text-decoration: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const SiteLink = styled(LinkTo)`
  display: inline-flex;
`;

const Header = styled.header<{ isTransparent: boolean }>`
  position: sticky;
  top: 0;
  transition-property: color, background-color, box-shadow;
  transition-duration: 0.4s;
  z-index: 10000;

  background-color: #fff;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);

  ${({ isTransparent }) =>
    isTransparent &&
    css`
      background-color: rgba(255, 255, 255, 0);
      box-shadow: none;

      color: #fff;

      ${RightSection} {
        color: #fff;
        button {
          &:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        }
      }
    `}
`;

type Props = {
  toUseTransparent: boolean;
};

export default function SiteHeader({ toUseTransparent }: Props) {
  const currentScrollY = useAppSelector(selectCurrentScrollY);
  const [isTransparent, setIsTransparent] = useState(
    toUseTransparent &&
      // 뒤로가기를 눌렀을 때 스크롤 복원으로 페이지 스크롤이 0이 아닐 수도 있음.
      currentScrollY === 0,
  );

  useEffect(() => {
    if (!toUseTransparent) {
      return;
    }

    function onScroll() {
      if (window.scrollY === 0) {
        setIsTransparent(true);
      } else if (isTransparent) {
        setIsTransparent(false);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isTransparent, toUseTransparent]);

  return (
    <Header isTransparent={isTransparent}>
      <HeaderContainer>
        <LeftSection>
          <SiteLink href="/">
            <SiteIcon title="사이트 메인 이동 아이콘" />
          </SiteLink>
          <Nav>
            <LinkTo href="/posts">게시글</LinkTo>
          </Nav>
        </LeftSection>
        {/* <RightSection>
          <IconButton onClick={undefined} aria-label="검색">
            <Icon.MagnifyingGlass size={24} />
          </IconButton>
          <IconButton onClick={undefined} aria-label="테마 전환">
            <Icon.Sun size={24} weight="fill" />
          </IconButton>
        </RightSection> */}
      </HeaderContainer>
    </Header>
  );
}
