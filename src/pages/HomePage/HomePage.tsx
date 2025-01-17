import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import styled from "styled-components";
import { MainLayout } from "../../layouts/MainLayout";
import { fetchPosts, PostDto } from "../../api/postsApi";
import { BreakpointsEnum } from "../../constants";
import { colors } from "../../styles/themes";

const HeroBanner = styled(Box)`
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  padding: 40px 20px;
  color: white;
  text-align: center;
  margin-bottom: 30px;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    padding: 30px 15px;
  }
`;

const PostContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  max-width: 800px;
  margin: auto;

  @media (max-width: ${BreakpointsEnum.m}px) {
    padding: 15px;
  }

  @media (max-width: ${BreakpointsEnum.sm}px) {
    gap: 15px;
    padding: 10px;
  }
`;

const PostCard = styled(Paper)`
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

const Loader = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  @media (max-width: ${BreakpointsEnum.sm}px) {
    margin: 15px 0;
  }
`;

const ErrorMessage = styled(Box)`
  margin: 20px auto;
  max-width: 600px;
  padding: 15px;
  background-color: ${colors.additional.red};
  border: 1px solid ${colors.additional.red};
  border-radius: 8px;
  color: ${colors.additional.redDark};
  text-align: center;
`;

function HomePage() {
  const [data, setData] = useState<PostDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadPosts = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const posts = await fetchPosts({ page, limit: 10 });
      if (posts.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...posts]);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts(page);
  }, [page, loadPosts]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loading]);

  if (error) {
    return (
      <MainLayout headTitle="Error">
        <ErrorMessage>
          <Typography variant="h6">Error: {error}</Typography>
        </ErrorMessage>
      </MainLayout>
    );
  }

  return (
    <MainLayout headTitle="Home">
      <HeroBanner>
        <Typography variant="h4">Welcome to My Blog</Typography>
        <Typography variant="subtitle1">Explore insightful posts</Typography>
      </HeroBanner>
      <Container>
        <PostContainer>
          {data.map((item) => (
            <PostCard key={item.id}>
              <Typography variant="h6" component="h3">
                {item.title}
              </Typography>
              <Typography variant="body1">{item.body}</Typography>
            </PostCard>
          ))}
        </PostContainer>
        {loading && (
          <Loader>
            <CircularProgress />
          </Loader>
        )}
        {!loading && hasMore && <div ref={loaderRef} />}
      </Container>
    </MainLayout>
  );
}

export default HomePage;
