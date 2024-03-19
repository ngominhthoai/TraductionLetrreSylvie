import { gql } from "@apollo/client";

export const UPDATE_LETTRE = gql`
  mutation UpdateLettre($id: Int!, $nom: String, $textOriginal: String, $textTraduction: String, $status: String) {
    updateLettre(id: $id, nom: $nom, textOriginal: $textOriginal, textTraduction: $textTraduction, status: $status) {
      lettre {
        id
        nom
        textOriginal
        textTraduction
        status
      }
    }
  }
`;
