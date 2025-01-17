import React, { useRef } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import styled from "styled-components";
import { MainLayout } from "../../layouts/MainLayout";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../api/postsApi";
import { BreakpointsEnum } from "../../constants";
import { colors } from "../../styles/themes";
import { Loader } from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { PostCard } from "../../components/PostCard";

function HomePage() {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, 10),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
  });

  React.useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <MainLayout headTitle="Error">
        <ErrorMessage message={(error as any).message || "Unknown error"} />
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
          {data?.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.map((post) => (
                <PostCard key={post.id} title={post.title} body={post.body} />
              ))}
            </React.Fragment>
          ))}
        </PostContainer>
        {isFetchingNextPage && <Loader />}
        <div ref={loaderRef} />
      </Container>
    </MainLayout>
  );
}
const HeroBanner = styled(Box)`
  background: linear-gradient(${colors.gradient.default});
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

export default HomePage;
