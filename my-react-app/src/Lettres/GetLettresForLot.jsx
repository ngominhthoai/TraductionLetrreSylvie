// GetLettresForLot.jsx
import {useQuery} from '@apollo/client';
import {Table} from 'react-bootstrap';
import {GET_LETTRES_FOR_LOT} from "../graphql/queries/GetLettresForLot.jsx";
import {useNavigate} from 'react-router-dom'; // Import useNavigate

const GetLettresForLot = ({lotId}) => {
    const navigate = useNavigate(); // Initialize navigate
    const {loading, error, data} = useQuery(GET_LETTRES_FOR_LOT, {
        variables: {lotId},
    });

    const onLettreClick = (lettreId) => {
        navigate(`/lettre/${lettreId}`); // Navigate to LettreDetails with lettreId
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Numéro</th>
                <th>Nom</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {data.lettresByLot.map((lettre, index) => (
                <tr key={lettre.id} onClick={() => onLettreClick(lettre.id)}>
                    <td>{index + 1}</td>
                    <td>{lettre.nom}</td>
                    <td>{lettre.status}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default GetLettresForLot;
