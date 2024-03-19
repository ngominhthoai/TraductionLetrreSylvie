import { gql } from "@apollo/client";

export const CREATE_LOT_DE_LETTRE = gql`
    mutation CreateLotDeLettre($nom: String!) {
        createLotDeLettre(nom: $nom) {
        lotDeLettre {
            id
            nom
            date
        }
        }
    }
    `;