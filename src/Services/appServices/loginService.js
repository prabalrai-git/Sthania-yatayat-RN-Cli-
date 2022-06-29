import { CheckValidLogin, GetUserTokenByUserId, GetValidCollectorLoginForApp, InsertUpdateCollectorToken } from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
import { fetch, store } from "../utils/httpUtil"

export const getLoginApi = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch
        (`${CheckValidLogin}?username=${data.username}&password=${data.password}`);
      if (response?.status === 200) {
        sucessCallback(response?.data, response?.status);
      }
      else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}
