import axios from 'axios';
import { PostPage } from '../../bin/generate-json-api';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: process.env.NODE_ENV === 'production' ? 5000 : 0,
  validateStatus: (status) => status < 500,
});

// Other functions will be added later
// eslint-disable-next-line import/prefer-default-export
export async function getPage(page = 0): Promise<PostPage> {
  const response = await request.get(`/posts/pages/${page}.json`);
  return response.data;
}
