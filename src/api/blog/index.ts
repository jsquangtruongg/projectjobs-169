import { IBlogData } from "../../redux/reducers/blog";
import { API } from "../config";

export type IResponse = {
  blogData: IBlogData;
  mes: "string";
  err: number;
};

export type IBlogResponse = {
  mes: string;
};

export const getBlogAPI = async (id: number): Promise<IResponse> => {
  const res = await API.get(`/blog/id?blog_category_id=${id}`);
  return {
    blogData: res.data.data,
    mes: res.data.mes,
    err: res.data.err,
  };
};
