import {gql} from "@apollo/client";

export const CREATE_LETTRE = gql`
    mutation createLettre($nom: String!, $lotId: Int!) {
        createLettre(input: {nom: $nom, lotId: $lotId}) {
            id
            nom
        }
    }
`;