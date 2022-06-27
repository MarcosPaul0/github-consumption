import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer fake-token`,
  }
});

export { api };
