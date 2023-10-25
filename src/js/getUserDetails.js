import axios from 'axios';

const BASE_URL = 'https://randomuser.me';

async function getUser(){
   return (await axios.get('/api/',{baseURL: BASE_URL}));
}

export default getUser;