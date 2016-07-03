import axios from 'axios';
import { SWAPI_BASE_URL } from '../constants/config';

class RequestHelper {
  static request(payload) {
    const instance = axios.create({
      baseURL: SWAPI_BASE_URL,
      timeout: 20000
    });
    
    payload.url = payload.url.replace('http', 'https');

    return instance
      .request(payload);
  }
}

export default RequestHelper;
