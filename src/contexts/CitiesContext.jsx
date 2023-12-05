import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

import {
  fetchCities,
  fetchCityById,
  createCity,
  deleteCity,
} from "../components/citiesService";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
  
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCitiesData() {
      dispatch({ type: "loading" });

      try {
        const data = await fetchCities();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: `There was an error loading cities: ${error.message}`,
        });
      }
    }
    fetchCitiesData();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity?.id) return;

      dispatch({ type: "loading" });

      try {
        const data = await fetchCityById(id);
        dispatch({ type: "city/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: `There was an error loading the city: ${error.message}`,
        });
      }
    },
    [currentCity?.id]
  );

  async function createCityHandler(newCity) {
    console.log(newCity);
    dispatch({ type: "loading" });
    try {
      const data = await createCity(newCity);
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `There was an error creating the city: ${error.message}`,
      });
    }
  }

  async function deleteCityHandler(id) {
    dispatch({ type: "loading" });

    try {
      await deleteCity(id);
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `There was an error deleting the city: ${error.message}`,
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity: createCityHandler,
        deleteCity: deleteCityHandler,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };