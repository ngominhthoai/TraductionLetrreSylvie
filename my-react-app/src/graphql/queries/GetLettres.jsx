import {gql} from "@apollo/client";

export const GET_LETTRES = gql`
    query GetLettres{
    allLettres{
    id,
    nom,
    textOriginal,
    textTraduction,
    status
    }
 }
 `;