import { sys_get,LIMIT_PAGES } from "../../utils/api_client";

const uri = "invoice";

export async function getData(page = 1, limit = LIMIT_PAGES, search = "") {
  try {
    const response = await sys_get({
      auth: false,
      endpoint: `${uri}?page=${page}&limit=${limit}&keywords=${search}`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getDetail(id="") {
  try {
    const response = await sys_get({
      auth: false,
      endpoint: `${uri}/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
