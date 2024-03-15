import {useQuery} from "@apollo/client";
import {GET_LETTRES} from "../graphql/queries/GetLettres";
import {useNavigate} from "react-router-dom";
function GetLettres() {
    const navigate = useNavigate();
    const {loading, error, data} = useQuery(GET_LETTRES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <table>
            <thead>
            <tr>
                <th>Nom</th>
                <th>Text Original</th>
                <th>Text Traduction</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {data.allLettres.map((lettre) => (
                <tr key={lettre.id} onClick={() => navigate(`/lettre/${lettre.id}`)}>
                    <td>{lettre.nom}</td>
                    <td>{lettre.textOriginal}</td>
                    <td>{lettre.textTraduction}</td>
                    <td>{lettre.status}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default GetLettres;