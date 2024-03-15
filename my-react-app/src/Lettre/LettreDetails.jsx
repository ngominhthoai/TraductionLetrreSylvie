import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_LETTRE_DETAILS } from "../graphql/queries/GetLettreDetails";

function LettreDetails() {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_LETTRE_DETAILS, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  // Ensure data and data.lettre exist before attempting to access data.lettre properties
  if (!data || !data.lettre) return <p>Letter not found</p>;

  return (
    <div>
      <h2>{data.lettre.nom}</h2>
      <p><strong>Text Original:</strong> {data.lettre.textOriginal}</p>
      <p><strong>Text Traduction:</strong> {data.lettre.textTraduction}</p>
      <p><strong>Status:</strong> {data.lettre.status}</p>
    </div>
  );
}

export default LettreDetails;
