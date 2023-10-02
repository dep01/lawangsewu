import { example_data } from "../data/used/example";

// NOTE THIS IS JUST EXAMPLE FOR API RESPONSE JUST USE api_client method IF YOUR HAVE API

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function getById(id) {
  const data = example_data.find((val) => val.id == id);
  await timeout(1000);
  if (data) {
    return {
      code: 200,
      success: true,
      message: "Data Found",
      data,
    };
  } else {
    throw {
      code: 404,
      success: false,
      message: "Data Not Found",
      data: null,
    };
  }
}

export async function getData(page = 1, limit = 10, search = "") {
  const data = example_data.filter((val) => val.title.includes(search));
//   let data = example_data;
  let resp = example_data.slice((page-1) * limit, limit*page);
  await timeout(1000);
    console.log(Math.floor(data.length / limit));
  if (data) {
    return {
      code: 200,
      success: true,
      message: "Data Found",
      data: {
        data: resp,
        totalPages: Math.floor(data.length / limit),
        currentPage: page,
      },
    };
  } else {
    throw {
      code: 404,
      success: false,
      message: "Data Not Found",
      data: null,
    };
  }
}
