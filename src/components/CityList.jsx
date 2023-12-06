import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading, error } = useCities();


  if (isLoading) return <Spinner />;

  if (error) return <Message message={`Error: ${error}`} />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        // Check if 'id' property exists before rendering CityItem
        if (city?.id) {
          return <CityItem city={city} key={city.id} />;
        }
       return null // or provide a default key
      })}
    </ul>
  );
}

export default CityList;