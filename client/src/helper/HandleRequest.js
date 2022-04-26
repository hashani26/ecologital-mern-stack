import Axios from 'axios'

export const SendRequest = async (route, data = {}, headers = {}, method = 'post') => {
  try {
    let result;
    if (method === 'post') {
      result = await Axios.post(route, data, headers)
    } else {
      result = await Axios.get(route, { params: data }, headers)
    }
    return result.data
  }
  catch (err) {
    return {
      success: false,
      err
    }
  }

};
