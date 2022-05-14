import axios from "axios";

const api = axios.create({
  method: "get",
  baseURL: "https://jsonplaceholder.typicode.com/posts/",
  withCredentials: false,
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
});

const createPost = async (data: object) => {
  return api
    .post("/", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const getAllPosts = async () => {
  return api
    .get("/")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const getOnePost = async (id: number) => {
  return api
    .get(`/${id.toString()}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const deleteOnePost = async (id: number) => {
  return api
    .delete(`/${id.toString()}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

const apiTool = { createPost, getAllPosts, getOnePost, deleteOnePost };
export default apiTool;
