import {useQuery} from "@apollo/client";
import {GET_LOT_DE_LETTRES} from "../graphql/queries/GetLotDeLettres";
import {CREATE_LOT_DE_LETTRE} from "../graphql/mutations/CreateLotDeLettre";
import {DELETE_LOT_DE_LETTRE} from "../graphql/mutations/DeleteLotDeLettre";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import {useMutation} from "@apollo/client";

function ListeLotDeLettres() {
    const {loading, error, data} = useQuery(GET_LOT_DE_LETTRES);
    const [createLotDeLettre] = useMutation(CREATE_LOT_DE_LETTRE,
        {
            refetchQueries: [{query: GET_LOT_DE_LETTRES}]
        });

    const handleCreate = () => {
        const nom = prompt("Nom du lot de lettres");
        createLotDeLettre({variables: {nom}});
    }

    const [deleteLotDeLettre] = useMutation(DELETE_LOT_DE_LETTRE,
        {
            refetchQueries: [{
                query: GET_LOT_DE_LETTRES,
            }]
        });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this lot de lettres?")) {
            deleteLotDeLettre({variables: {id: parseInt(id)}});
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <>
            <Button variant="primary" size="sm" onClick={handleCreate}>Create</Button>
            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.allLotDeLettres.map((lot) => (
                    <tr key={lot.id}>
                        <td>{lot.nom}</td>
                        <td>{lot.date}</td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(lot.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    );
}

export default ListeLotDeLettres;