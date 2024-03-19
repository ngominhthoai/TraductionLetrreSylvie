import { gql} from "@apollo/client";

export const DELETE_LOT_DE_LETTRE = gql`
    mutation DeleteLotDeLettre($id: Int!) {
        deleteLotDeLettre(id: $id) {
            lotDeLettre {
                id
            }
        }
    }
    `;