import { ICommentData } from "../../redux/reducers/comment";
import { API, socket } from "../config";

export type IResponse = {
  commentData: ICommentData[];
  mess: "string";
  err: number;
};

export type IResponses = {
  commentDataList: ICommentData[];
  mess: "string";
  err: number;
};
export type ICommentResponse = {
  mess: string;
};
export const createCommentJobAPI = async (
  commentData: ICommentData
): Promise<IResponse> => {
  const { data } = await API.post(
    "/comment",
    {
      ...commentData,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return {
    mess: data.mes,
    commentData: data.data || {},
    err: data.err,
  };
};

export const getCommentJobAllAPI = async (
  content?: string
): Promise<IResponses> => {
  const params = new URLSearchParams();
  if (content) params.append("content", content);
  const res = await API.get("/get-all-comment");
  return {
    mess: res.data.mess,
    commentDataList: res.data.mess,
    err: res.data.err,
  };
};
