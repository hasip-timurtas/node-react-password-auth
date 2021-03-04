import axios from 'axios';

/**
 * Here we set all Axios configuration for serverApi.
 * Our api calls will we with  withCredentials as we keep the session information in cookies.
 * And we set server base url. 
 */

axios.defaults.withCredentials = true

const serverApi = axios.create({
    baseURL: 'https://4000-violet-hamster-dd7f0eth.ws-eu03.gitpod.io/'
});

export default serverApi;