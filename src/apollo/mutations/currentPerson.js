import { gql } from 'apollo-boost';

export const CURRENT_PERSON_UPDATE = gql`
  mutation currentPersonUpdate($person: PersonInput) {
    currentPersonUpdate(person: $person){
      id
    }
  }
`;

export const CHANGE_USER_CONECTIVITY = gql`
  mutation cahnge_user_connectivity($connectivity: Boolean) {
    cahnge_user_connectivity(connectivity: $connectivity) {
      id
    }
  }
`;

export const PASSWORD_UPDATE = gql`
  mutation currentPersonUpdatePassword($oldPassword: String!,$newPassword: String!) {
    currentPersonUpdatePassword(oldPassword: $oldPassword,newPassword: $newPassword) {
      id
    }
  }
`;

export const PHOTO_UPDATE = gql`
  mutation changeCoverPhoto($file: Upload!) {
    changeCoverPhoto(file: $file){
      cover_photo {
        url
      }
    }
  }
`;
