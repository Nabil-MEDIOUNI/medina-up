import { gql } from 'apollo-boost';

export const JOIN_VOTE_ROOM = gql`
  mutation joinVoteRoom($id: String, $name: String) {
    joinVoteRoom(id: $id,name: $name) {
      title
    }
  }
`;

export const DISMISS_VOTER = gql`
  mutation dismissVoter($id: String, $name: String, $voterId: String) {
    dismissVoter(id: $id,name: $name, voterId: $voterId) {
      voter{
        id
      }
    }
  }
`;

export const CLOSE_VOTE_ROOM = gql`
  mutation closeRoom($id: String, $name: String) {
    closeRoom(id: $id,name: $name) {
      title
    }
  }
`;

export const SHOW_VOTE_RESULT = gql`
  mutation showVoteResult($id: String, $name: String) {
    showVoteResult(id: $id,name: $name) {
      title
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($vote: VoteInput) {
    createVote(vote: $vote) {
      id
    }
  }
`;

export const VOTE = gql`
  mutation vote($id: String, $name: String, $candidate: String, $vote: String) {
    vote(id: $id, name: $name, candidate: $candidate, vote: $vote) {
      id
    }
  }
`;
