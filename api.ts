import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer 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`,
  }
});

export { api };
