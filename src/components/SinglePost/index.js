import React from 'react';
import { useQuery, useMutation } from 'react-apollo';
import Header from './Header';
import { GET_POST } from '../../apollo/queries/posts';
import PostListItem from '../../pages/posts/PostListItem';
import Loading from '../_common/Loading';
import CommentBar from './CommentBar';
import LastDiv from '../_common/LastDiv';
import CommentSection from './CommentSection';
import Reactions from './Reactions';
import { COMMENT_POST } from '../../apollo/mutations/post';
import Alert from '../../utils/alert';

const SinglePost = ({ match }) => {
  const { data, loading } = useQuery(GET_POST, {
    variables: {
      id: match.params.id,
    },
  });

  const [comment, setComment] = React.useState('');
  const [commentPost, { error }] = useMutation(COMMENT_POST, {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          id: match.params.id,
        },
      },
    ],
  });

  const sendComment = (e) => {
    e.preventDefault();
    commentPost({
      variables: {
        id: match.params.id,
        comment,
      },
    });
    setComment('');
  };

  if (loading) {
    return (
      <div className="big_loading">
        <Loading height="35px" />
      </div>
    );
  }

  return (
    <>
      <Header route="/posts" />
      <PostListItem post={data.getPost} />
      <Reactions post={data.getPost} likers={data.getPost.likes.liked_by} />
      <CommentSection post={data.getPost} comments={data.getPost.comments} />
      <CommentBar
        sendComment={sendComment}
        setComment={setComment}
        comment={comment}
      />
      <LastDiv />
      {Alert(error)}
    </>
  );
};

export default SinglePost;
