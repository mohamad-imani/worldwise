import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
import styles from "./City.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  console.log(id)
  const { getCity, currentCity, isLoading } = useCities();
  
  useEffect(() => {
    getCity(id);
  }, [id, getCity]);
  const { cityName, emoji, date, notes } = currentCity;
  

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div className={styles.row}>
        <button style={{
          padding : '4px 7px',
          width : 'max-content',
          backgroundColor : '#3e3e3e',
          color : 'white',
          borderRadius : '5px',
          cursor : 'pointer'
        }} onClick={() => console.log("Add your Supabase save function here")}>
          Save to Supabase
        </button>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
