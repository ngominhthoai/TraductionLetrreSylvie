import {gql} from "@apollo/client";

export const GET_LETTRE_DETAILS = gql`
    query GetLettreDetails($id: Int!) {
        lettre(id: $id) {
            id
            nom
            textOriginal
            textTraduction
            status
        }
    }
`;