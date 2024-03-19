// GetLotDeLettres.jsx
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Form } from 'react-bootstrap';
import {GET_LOT_DE_LETTRES} from "../graphql/queries/GetLotDeLettres";

const GetLotDeLettres = () => {
  const { loading, error, data } = useQuery(GET_LOT_DE_LETTRES);
  const [selectedLot, setSelectedLot] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Form.Select aria-label="Select lot" onChange={(e) => setSelectedLot(e.target.value)}>
        <option>Select a lot</option>
        {data.allLotDeLettres.map((lot) => (
          <option key={lot.id} value={lot.id}>
            {lot.nom}
          </option>
        ))}
      </Form.Select>
      {selectedLot && <GetLotDeLettres lotId={selectedLot} />}
    </div>
  );
};

export default GetLotDeLettres;
