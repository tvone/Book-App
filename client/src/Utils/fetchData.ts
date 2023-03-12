import axios from "axios";
import { toast } from "react-toastify";

export const getApi = async (url: string, token?: string) => {
  try {
    const res = await axios.get(`/api/${url}`, {
      headers: { Authorization: token || "x" },
    });
    return res;
  } catch (error: any) {
    toast.error(error.response.message.msg);
  }
};

export const postApi = async (url: string, post: object, token: string) => {
  try {
    const res = await axios.post(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error: any) {
    toast.error(error.response.message.msg);
  }
};

export const patchApi = async (url: string, post: object, token: string) => {
  try {
    const res = await axios.patch(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error: any) {
    toast.error(error.response.message.msg);
  }
};
export const putApi = async (url: string, post: object, token: string) => {
  try {
    const res = await axios.put(`/api/${url}`, post, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error: any) {
    toast.error(error.response.message.msg);
  }
};
export const deleteApi = async (url: string, token: string) => {
  try {
    const res = await axios.delete(`/api/${url}`, {
      headers: { Authorization: token },
    });
    return res;
  } catch (error: any) {
    toast.error(error.response.message.msg);
  }
};
