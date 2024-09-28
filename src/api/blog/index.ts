import { IBlogData } from "../../redux/reducers/blog";
import { API } from "../config";

export type IResponse = {
  blogData: IBlogData;
  mes: "string";
  err: number;
};

export type IResponses = {
  blogDataList: IBlogData[];
  mes: "string";
  err: number;
};

export type IBlogResponse = {
  mes: string;
};

export const getBlogAllAPI = async (): Promise<IResponses> => {
  const res = await API.get("/blog");
  return {
    blogDataList: res.data.data || [],
    mes: res.data.mes,
    err: res.data.err,
  };
};

export const getBlogAPI = async (id: number): Promise<IResponse> => {
  const res = await API.get(`/blog/id?blog_category_id=${id}`);
  return {
    blogData: res.data.data,
    mes: res.data.mes,
    err: res.data.err,
  };
};

export const editBlog = async (blogData: IBlogData): Promise<IResponse> => {
  const { data } = await API.put(
    `/blog/blogs/${blogData.id}`,
    { ...blogData },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    mes: data.mes,
    blogData: data.data || [],
    err: data.err,
  };
};
