import { gql } from 'apollo-boost';

export const GET_POST = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      description
      createdAt
      is_approved
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
      seen_by {
        full_name
        cover_photo {
          url
        }
      }
      comments {
        id
        comment
        createdAt
        commenter {
          id
          full_name
          cover_photo {
            url
          }
          current_positions {
            position_name
            function {
              name
              function_short_name
            }
          }
        }
        replies {
          comment
          commenter {
            id
            full_name
            cover_photo {
              url
            }
            current_positions {
              position_name
              function {
                name
                function_short_name
              }
            }
          }
        }
        likes {
          count
          liked_by {
            id
            full_name
            cover_photo {
              url
            }
          }
        }
      }
      likes {
        count
        liked_by {
          id
          full_name
          cover_photo {
            url
          }
        }
      }
      creator {
        id
        full_name
        cover_photo {
          url
        }
        current_positions {
          position_name
          function {
            name
            function_short_name
          }
        }
      }
    }
  }
`;

export const ALL_POSTS = gql`
  query allPosts {
    allPosts {
      id
      title
      description
      createdAt
      is_approved
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
      seen_by {
        full_name
        cover_photo {
          url
        }
      }
      comments {
        comment
        createdAt
        commenter {
          id
          full_name
          current_positions {
            position_name
            function {
              name
              function_short_name
            }
          }
        }
      }
      likes {
        count
        liked_by {
          id
          full_name
        }
      }
      creator {
        id
        full_name
        cover_photo {
          url
        }
        current_positions {
          position_name
          function {
            name
            function_short_name
          }
        }
      }
    }
  }
`;
