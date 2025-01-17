import React from "react";
import { Typography, Paper } from "@mui/material";
import styled from "styled-components";
import { BreakpointsEnum } from "../../constants";

type PostCardProps = {
  title: string | undefined;
  body: string | undefined;
};

const PostCard: React.FC<PostCardProps> = ({ title, body }) => (
  <StyledPostCard>
    <Typography variant="h6" component="h3">
      {title}
    </Typography>
    <Typography variant="body1">{body}</Typography>
  </StyledPostCard>
);

export default PostCard;

const StyledPostCard = styled(Paper)`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 15px;
  }
`;
