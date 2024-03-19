import {useQuery} from '@apollo/client';
import {GET_LETTRE_DETAILS} from '../graphql/queries/GetLettreDetails';
import {useParams} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";

function LettreDetails() {
    const {lettreId} = useParams();
    const navigate = useNavigate();

    const {loading, error, data} = useQuery(GET_LETTRE_DETAILS, {
        variables: {id: parseInt(lettreId)},
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className={'container'}>
            <h1 className={'text-center'}>Lettre Details</h1>
            <p className={'text-center'}>Lettre ID: {data.lettre.id}</p>
            <p className={'text-center'}>Lettre Nom: {data.lettre.nom}</p>
            <p className={'text-center'}>Lettre Text Original: {data.lettre.textOriginal}</p>
            <p className={'text-center'}>Lettre Text Traduction: {data.lettre.textTraduction}</p>
            <p className={'text-center'}>Lettre Status: {data.lettre.status}</p>
            <button onClick={() => navigate(`/update-lettre/${lettreId}`)} className="btn btn-primary">
                Update
            </button>
        </div>
    )
}

export default LettreDetails;
