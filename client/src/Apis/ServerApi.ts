import axios from 'axios';

axios.defaults.withCredentials = true

const serverApi = axios.create({
    baseURL: 'https://4000-violet-hamster-dd7f0eth.ws-eu03.gitpod.io/'
});

export default serverApi;