import { IBlogCategoryData } from "../../redux/reducers/blogCategory";
import { API } from "../config";

export type IResponse = {
  blogCategoryData: IBlogCategoryData;
  mes: "string";
  err: number;
};

export type IResponses = {
  blogCategoryDataList: IBlogCategoryData[];
  mes: "string";
  err: number;
};
export type ISignInResponse = {
  mes: string;
};

export const getBlogCategoryAPI = async (
  title?: string,
  describe?: string,
  lastName?: string
): Promise<IResponses> => {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (describe) params.append("describe", describe);
  if (lastName) params.append("lastName", lastName);
  const res = await API.get(`/blog-category?${params.toString()}`);
  return {
    mes: res.data.mes,
    blogCategoryDataList: res.data.data || [],
    err: res.data.err,
  };
};

export const editBlogCategoryAPI = async (
  blogCategoryData: IBlogCategoryData
): Promise<IResponse> => {
  const { data } = await API.put(
    `/blog-category/category/${blogCategoryData.id}`,

    { ...blogCategoryData },

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    mes: data.mes,
    blogCategoryData: data.data || [],
    err: data.err,
  };
};

export const deleteBlogCategoryAPI = async (id: number): Promise<IResponse> => {
  const { data } = await API.delete(`/blog-category/category/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    mes: data.mes,
    blogCategoryData: data.data || [],
    err: data.err,
  };
};

export const createBlogCategoryAPI = async (
  blogCategoryData: IBlogCategoryData,
  file: File | null
): Promise<IResponse> => {
  const formData = new FormData();

  if (file) {
    formData.append("img", file);
  }
  const {
    blogData,
    createdAt,
    id,
    updatedAt,
    userData,
    img,
    ...restBlogCategory
  } = blogCategoryData;
  Object.keys(restBlogCategory).forEach((key) => {
    let value = restBlogCategory[key as keyof typeof restBlogCategory];

    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const { data } = await API.post(
    "/blog-category",
    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return {
    mes: data.mes,
    blogCategoryData: data.data || ({} as IBlogCategoryData),
    err: data.err,
  };
};
