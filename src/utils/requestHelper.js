import axios from 'axios';
import { SWAPI_BASE_URL } from '../constants/config';

console.log(SWAPI_BASE_URL);
class RequestHelper {
  static request(payload) {
    const instance = axios.create({
      baseURL: SWAPI_BASE_URL,
      timeout: 20000
    });

    return instance
      .request(payload);
  }
}

export default RequestHelper;
