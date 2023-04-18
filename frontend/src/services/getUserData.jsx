import {axios} from 'axios'

export default function getUserData(userId) {
  return axios.get(`/api/users/${userId}`)
  .then(response => response.data)
  .catch(error => {
    console.error(`Error al obtener los datos del usuario ${userId}: ${error.message}`);
    throw error;
  });
    

}
