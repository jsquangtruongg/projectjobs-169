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

export const getBlogAllAPI = async (
  title?: string,
  content?: string,
  lastName?: string
): Promise<IResponses> => {
  const params = new URLSearchParams();
  if (title) params.append("title", title);
  if (content) params.append("content", content);
  if (lastName) params.append("lastName", lastName);
  const res = await API.get(`/blog?${params.toString()}`);
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

export const deleteBlogAPI = async (id: number): Promise<IResponse> => {
  const { data } = await API.delete(`/blog/blogs/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    mes: data.mes,
    blogData: data.data || [],
    err: data.err,
  };
};

export const createBlogAPI = async (
  blogData: IBlogData,
  file: File | null
): Promise<IResponse> => {
  const formData = new FormData();
  if (file) {
    formData.append("img", file);
  }
  const {
    createdAt,
    updatedAt,
    userData,
    id,
    img,
    categoryData,
    ...restBlogData
  } = blogData;

  Object.keys(restBlogData).forEach((key) => {
    let value = restBlogData[key as keyof typeof restBlogData];

    if (key === "user_id" || key === "blog_category_id") {
      value = String(value);
    }
    if (value !== undefined || value !== null) {
      formData.append(key, String(value));
    }
  });

  for (const [key, value] of formData.entries()) {
  }
  const { data } = await API.post(
    "/blog",
    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return {
    mes: data.mes,
    blogData: data.data || ({} as IBlogData),
    err: data.err,
  };
};
