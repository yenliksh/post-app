import React, { FC } from "react";
import styled from "styled-components";
import { BreakpointsEnum } from "../../../../constants";
import { colors } from "../../../../styles/themes";

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Root>
      <Wrapper>
        <LogoWrapper>
          <LogoText>MyApp</LogoText>
        </LogoWrapper>
      </Wrapper>
      <PageTitle>{title}</PageTitle>
    </Root>
  );
};

export default Header;

const Root = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: ${colors.greyScale[0]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px 24px;

  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 12px 16px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${colors.purpleScale[100]};
  margin: 0;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    font-size: 1.25rem;
  }
`;

const PageTitle = styled.h2`
  text-align: center;
  margin-top: 16px;
  font-size: 1.75rem;
  font-weight: bold;
  color: ${colors.greyScale[100]};

  @media (max-width: ${BreakpointsEnum.sm}px) {
    font-size: 1.5rem;
    margin-top: 12px;
  }
`;
