import { gql } from '@apollo/client';

export const GET_LETTRES_FOR_LOT  = gql`
  query GetLettresByLot($lotId: Int!) {
    lettresByLot(lotId: $lotId) {
      id
      nom
      textOriginal
      textTraduction
      status
    }
  }
`;