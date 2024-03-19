import {gql} from '@apollo/client';

export const GET_LOT_DE_LETTRES = gql`
    query GetLotDeLettres {
        allLotDeLettres {
        id
        nom
        date
       }
    }
`;
