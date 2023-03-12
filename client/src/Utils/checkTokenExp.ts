import jwtDecode from "jwt-decode";
import { IDecodeToken } from "../interface/interface";
import { getUser } from "../redux/features/userSlice";
import { getApi } from "./fetchData";

export const checkTokenExp = async (token: string, dispatch: any) => {
  const result: IDecodeToken = jwtDecode(token);
  if (result.exp >= Date.now() / 1000) return;

  console.log("access_token over exp");
  const res = await getApi("refreshtoken", token);
  dispatch(getUser(res?.data));
  return res?.data.accessToken;
};
