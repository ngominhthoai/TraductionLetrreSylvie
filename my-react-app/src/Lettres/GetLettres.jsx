import {useQuery} from "@apollo/client";
import {GET_LOT_DE_LETTRES} from "../graphql/queries/GetLotDeLettres";
import {CREATE_LETTRE} from "../graphql/mutations/CreateLettre.jsx";
import {useState} from "react";
import GetLettresForLot from "./GetLettresForLot.jsx";
import {Form, Button} from "react-bootstrap";
import {useSpring, animated} from 'react-spring';
import {useMutation} from "@apollo/client";


function GetLettres() {
    const {loading, error, data} = useQuery(GET_LOT_DE_LETTRES);
    const [selectedLot, setSelectedLot] = useState('');

    // Inside your component where you want to add the animation
    const fadeIn = useSpring({
        to: {opacity: 1},
        from: {opacity: 0},
        reset: true,
    });

    const [createLettre] = useMutation(CREATE_LETTRE,
        {
            refetchQueries: [{query: GET_LOT_DE_LETTRES}]
        });

    const handleAddLettre = () => {
        const nom = prompt('Nom de la lettre');
        if (nom) {
            createLettre({variables: {nom, lotId: parseInt(selectedLot)}});
        }
        else
        {
            alert('Please enter a name for the lettre');
            handleAddLettre();
        }

    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <Form.Select aria-label="Select lot" onChange={(e) => setSelectedLot(e.target.value)}>
                <option>Select a lot</option>
                {data.allLotDeLettres.map((lot) => (
                    <option key={lot.id} value={lot.id}>{lot.nom}</option>
                ))}
            </Form.Select>
            {selectedLot && (
                <>
                    <Button onClick={handleAddLettre} variant="primary" style={{marginTop: '20px'}}>
                        Ajouter une Lettre au Lot
                    </Button>
                    <animated.div style={fadeIn}>
                        <GetLettresForLot lotId={parseInt(selectedLot)}/>
                    </animated.div>

                </>
            )}
        </div>
    );
}

export default GetLettres;
