import { faStar, faStarHalf, faStar as faEmptyStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Rating = ({ rating, maxStars = 5 }) => {

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {Array(fullStars).fill().map((_, i) => (
                <span key={`full-${i}`}><FontAwesomeIcon style={{color:"gold"}} icon={faStar} /></span>
            ))}
            {halfStar && <FontAwesomeIcon style={{color:"gold"}} icon={faStarHalf} />}
            {Array(emptyStars).fill().map((_, i) => (
                <span key={`empty-${i}`}><FontAwesomeIcon style={{color:"white"}} icon={faEmptyStar} /></span>
            ))}
        </div>
    );
}

export default Rating;
