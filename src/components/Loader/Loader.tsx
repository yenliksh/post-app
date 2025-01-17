import React from "react";
import { Box, CircularProgress } from "@mui/material";
import styled from "styled-components";
import { BreakpointsEnum } from "../../constants";

const Loader: React.FC = () => (
  <StyledLoader>
    <CircularProgress />
  </StyledLoader>
);

export default Loader;

const StyledLoader = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 15px 0;
  }
`;
