/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@material-ui/core';
import React, { useState } from 'react';

import { useQuery } from 'react-apollo';
import { ALL_POSTS } from '../../apollo/queries/posts';
import EmptyList from '../../components/_common/EmptyList';
import LastDiv from '../../components/_common/LastDiv';
import Loading from '../../components/_common/Loading';

import Navigation from '../../components/Navigation';
import PostListItem from './PostListItem';

const Posts = () => {
  const [search, setSearch] = useState('');
  const { data, loading } = useQuery(ALL_POSTS);

  const [posts, setPosts] = useState([]);
  const postsStorage = localStorage.getItem('posts');

  React.useEffect(() => {
    if (navigator.onLine && data) {
      localStorage.setItem('posts', JSON.stringify(data.allPosts));
      setPosts(data.allPosts);
    } else {
      setPosts(JSON.parse(postsStorage));
    }
  }, [data]);

  return (
    <>
      <Box
        position="fixed"
        bgcolor="#f7f7f7"
        width="100%"
        height="101vh"
        zIndex={-1}
      />
      <Box pt="3.5rem">
        {loading && (
        <div className="big_loading">
          <Loading height="45px" />
        </div>
        )}

        {posts?.map((post) => <PostListItem post={post} />)}

        <EmptyList page="Posts" data={posts} />
      </Box>
      <LastDiv />
      <Navigation
        withTopBar
        fixTopBar
        withSearch={false}
        placeholder="posts"
        title="All Posts"
        search={search}
        setSearch={setSearch}
      />
    </>
  );
};

export default Posts;
