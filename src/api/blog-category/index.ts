import { IBlogCategoryData } from "../../redux/reducers/blogCategory";
import { API } from "../config";

export type IResponse = {
  blogCategoryData: IBlogCategoryData;
  mes: "string";
  err: number;
};

export type ISignInResponse = {
  mes: string;
};

export const getBlogCategoryAPI = async (): Promise<IResponse> => {
  const res = await API.get("/blog-category");

  return {
    mes: res.data.mes,
    blogCategoryData: res.data.data,
    err: res.data.err,
  };
};
