import PetitionCard from "../PetitionCard/PetitionCard";
import { v4 as uuidv4 } from 'uuid';
import './petition-card-list.css';

const PetitionCardList = ({ petitions }) => {
  return (
    <ul className="petition-card-list">
      {petitions.map((petition) => {
        return (
          <PetitionCard key={uuidv4()} petition={petition} />
        )
      })}
    </ul>
  );
}

export default PetitionCardList;