import React, { FC, ReactNode } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import styled from "styled-components";
import { BreakpointsEnum } from "../../constants";

type MainLayoutProps = {
  headTitle: string;
  childrenForHeader?: ReactNode;
  children: ReactNode;
};

const MainLayout: FC<MainLayoutProps> = ({ headTitle, children }) => {
  return (
    <Root>
      <Header title={"Posts"} />
      <MainContainer>
        <MainContent>{children}</MainContent>
      </MainContainer>
      <Footer />
    </Root>
  );
};

export default MainLayout;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 1200px;
  padding: 32px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: ${BreakpointsEnum.m}px) {
    padding: 24px;
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 16px;
  }

  @media (max-width: ${BreakpointsEnum.s}px) {
    padding: 8px;
  }
`;
