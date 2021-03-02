import axios from 'axios';

const serverApi = axios.create({
    baseURL: 'https://4000-chocolate-wren-pj59yjyl.ws-eu03.gitpod.io'
})

export default serverApi;