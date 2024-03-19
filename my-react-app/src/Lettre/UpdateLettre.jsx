import {useParams, useNavigate} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import {GET_LETTRE_DETAILS} from '../graphql/queries/GetLettreDetails';
import {UPDATE_LETTRE} from '../graphql/mutations/UpdateLettre';
import {Button, Form} from 'react-bootstrap';
import {useEffect, useState} from 'react';

function UpdateLettre() {
    const {lettreId} = useParams();
    const navigate = useNavigate();
    const {data, loading, error} = useQuery(GET_LETTRE_DETAILS, {variables: {id: parseInt(lettreId)}});

    // État local pour le formulaire
    const [nom, setNom] = useState('');
    const [textOriginal, setTextOriginal] = useState('');
    const [textTraduction, setTextTraduction] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (data && data.lettre) {
            setNom(data.lettre.nom);
            setTextOriginal(data.lettre.textOriginal);
            setTextTraduction(data.lettre.textTraduction);
            setStatus(data.lettre.status);
        }
    }, [data]);

    const [updateLettre] = useMutation(UPDATE_LETTRE, {
        onCompleted: () => {
            navigate(`/lettre/${lettreId}`);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateLettre({
            variables: {
                id: parseInt(lettreId),
                nom,
                textOriginal,
                textTraduction,
                status,
            },
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mt-4">
            <h2>Update Lettre ID: {lettreId}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control type="text" value={nom} onChange={(e) => setNom(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Text Original</Form.Label>
                    <Form.Control as="textarea" rows={3} value={textOriginal}
                                  onChange={(e) => setTextOriginal(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Text Traduction</Form.Label>
                    <Form.Control as="textarea" rows={3} value={textTraduction}
                                  onChange={(e) => setTextTraduction(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Lire">Lire</option>
                        <option value="Lu">Lu</option>
                        <option value="Traduire">Traduire</option>
                        <option value="Faite">Faite</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Lettre
                </Button>
            </Form>
        </div>
    );
}

export default UpdateLettre;
