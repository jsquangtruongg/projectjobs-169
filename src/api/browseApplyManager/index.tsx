import { IApplyMemberData } from "../../redux/reducers/applyMember";
import { IBrowseApplyManagerData } from "../../redux/reducers/browseApplyManager";
import { API } from "../config";

export type IResponse = {
  browseApplyManagerData: IApplyMemberData;
  mes: "string";
  err: number;
};

export type IResponses = {
  browseApplyManagerDataList: IApplyMemberData[];
  mes: "string";
  err: number;
};

export const getAllBrowseApplyManagerAPI = async (): Promise<IResponses> => {
  const res = await API.get("/browse-apply-manager");

  return {
    mes: res.data.mes,
    browseApplyManagerDataList: res.data.data || [],
    err: res.data.err,
  };
};

export const createBrowseApplyManagerAPI = async (
  browseApplyManagerData: IApplyMemberData
): Promise<IResponse> => {
  const { data } = await API.post("/browse-apply-manager", {
    ...browseApplyManagerData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    mes: data.mes,
    browseApplyManagerData: data.data || {},
    err: data.err,
  };
};
