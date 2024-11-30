import { IDeleteApplyData } from "../../redux/reducers/deleteApply";
import { API } from "../config";

export type IResponse = {
  DeleteApplyData: IDeleteApplyData;
  mes: "string";
  err: number;
};

export type IResponses = {
  DeleteApplyDataList: IDeleteApplyData[];
  mes: "string";
  err: number;
};
export const getAllDeleteApplyAPI = async (): Promise<IResponses> => {
  const res = await API.get("/delete-apply");

  return {
    mes: res.data.mes,
    DeleteApplyDataList: res.data.data || [],
    err: res.data.err,
  };
};
