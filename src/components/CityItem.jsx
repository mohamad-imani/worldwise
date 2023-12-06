/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import supabase from "../../supabase";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleDeleteCity = async () => {
    try {
      const { data, error } = await supabase
        .from("cities")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting city:", error.message);
      } else {
        deleteCity(id);
      }
    } catch (error) {
      console.error("Error deleting city:", error.message);
    }
  };
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            handleDeleteCity();
          }}
        >
          &times;
        </button>

      </Link>
    </li>
  );
}

export default CityItem;
