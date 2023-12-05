import supabase from "../../supabase";

async function fetchCities() {
  const { data, error } = await supabase.from('cities').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

async function fetchCityById(id) {
  const { data, error } = await supabase.from('cities').select('*').eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
}

async function createCity(newCity) {
    const { data, error } = await supabase.from('cities').upsert([newCity]);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  

async function deleteCity(id) {
  const { error } = await supabase.from('cities').delete().eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
}

export { fetchCities, fetchCityById, createCity, deleteCity };
