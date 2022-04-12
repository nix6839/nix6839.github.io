import axios from 'axios';
import { PostPage } from '../../bin/generate-json-api';

const request = axios.create({
  baseURL:
    'https://raw.githubusercontent.com/nix6839/nix6839.github.io/json-api/',
  timeout: process.env.NODE_ENV === 'production' ? 5000 : 0,
  validateStatus: (status) => status < 500,
});

export async function getPage(page = 0): Promise<PostPage> {
  const response = await request.get(`/posts/pages/${page}.json`);
  return response.data;
}
