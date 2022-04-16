import * as Icon from 'phosphor-react';
import styled from 'styled-components';
import IconButton from './IconButton';
import Image from './Image';
import LinkTo from './LinkTo';
import NavLink from './NavLink';

const Header = styled.header`
  position: sticky;
  top: 0;
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
  z-index: 10000;
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

const SiteIcon = styled(Image)`
  border-radius: 50%;
`;

const Nav = styled.nav`
  display: flex;

  a {
    padding: 16px 10px;
    font-size: 16px;
    text-decoration: none;
    color: #696969;

    &:hover {
      color: #000;
    }

    &.active {
      font-weight: bold;
      color: #78c84e;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 8px;
`;

export default function SiteHeader() {
  return (
    <Header>
      <HeaderContainer>
        <LeftSection>
          <SiteLink href="/">
            <SiteIcon
              src="/icon.png"
              alt="사이트 아이콘"
              width={36}
              height={36}
            />
          </SiteLink>
          <Nav>
            <NavLink href="/posts" activeClassName="active">
              게시글
            </NavLink>
          </Nav>
        </LeftSection>
        <RightSection>
          <IconButton onClick={undefined} aria-label="검색">
            <Icon.MagnifyingGlass size={24} />
          </IconButton>
          <IconButton onClick={undefined} aria-label="테마 전환">
            <Icon.Sun size={24} weight="fill" />
          </IconButton>
        </RightSection>
      </HeaderContainer>
    </Header>
  );
}
