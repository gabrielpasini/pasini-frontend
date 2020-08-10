import axios from 'axios';

axios.defaults.baseURL = 'https://backend-pasini.herokuapp.com';
//axios.defaults.baseURL = 'http://localhost:13976';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const Axios = axios.create({
    baseUrl: 'https://backend-pasini.herokuapp.com/',
    //baseUrl: 'http://localhost:13976',
});

export default Axios;