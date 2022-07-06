import { gql } from 'apollo-boost';

export const CREATE_POST = gql`
  mutation createPost($post: PostInput, $attachements: Upload) {
    createPost(post: $post, attachements: $attachements) {
      id
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export const APPROVE_POST = gql`
  mutation approvePost($id: ID!) {
    approvePost(id: $id) {
      id
    }
  }
`;

export const EDIT_POST = gql`
  mutation updatePost($id: ID!,$post: PostInput, $attachements: Upload) {
    updatePost(id: $id, post: $post, attachements: $attachements) {
      id
      title
      description
      posted_to {
        can_view
        department
      }
      post_components {
        component_attachment {
          filename
          filesize
          file
          type
        }
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($id: String!) {
    likePost(id: $id) {
      id
    }
  }
`;

export const DISLIKE_POST = gql`
  mutation disLikePost($id: String!) {
    disLikePost(id: $id) {
      id
    }
  }
`;

export const COMMENT_POST = gql`
  mutation commentPost($id: String!, $comment: String!) {
    commentPost(id: $id, comment: $comment) {
      id
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation editPostComment($postId: String!, $commentId: String!, $newComment: String) {
    editPostComment(postId: $postId, commentId: $commentId, newComment: $newComment) {
      comment
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation likeComment($postId: String!, $commentId: String!) {
    likeComment(postId: $postId, commentId: $commentId) {
      comment
    }
  }
`;

export const DISLIKE_COMMENT = gql`
  mutation disLikeComment($postId: String!, $commentId: String!) {
    disLikeComment(postId: $postId, commentId: $commentId) {
      comment
    }
  }
`;

export const REPLY_COMMENT = gql`
  mutation replyComment($postId: String!, $commentId: String!, $comment: String) {
    replyComment(postId: $postId, commentId: $commentId, comment: $comment) {
      comment
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deletePostComment($postId: String!, $commentId: String!) {
    deletePostComment(postId: $postId, commentId: $commentId) {
      comment
    }
  }
`;
