import React from "react";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import { colors } from "../../styles/themes";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <StyledErrorMessage>
    <Typography variant="h6">{message}</Typography>
  </StyledErrorMessage>
);

export default ErrorMessage;

const StyledErrorMessage = styled(Box)`
  margin: 20px auto;
  max-width: 600px;
  padding: 15px;
  background-color: ${colors.additional.redLight};
  border: 1px solid ${colors.additional.red};
  border-radius: 8px;
  color: ${colors.additional.redDark};
  text-align: center;
`;
