import { IApplyMemberData } from "../../redux/reducers/applyMember";
import { API } from "../config";

export type IResponse = {
  applyMemberData: IApplyMemberData;
  mes: "string";
  err: number;
};

export type IResponses = {
  applyMemberDataList: IApplyMemberData[];
  mes: "string";
  err: number;
};

export const getAllApplyMemberAPI = async (): Promise<IResponses> => {
  const res = await API.get("/apply-member");
  console.log(res.data);
  return {
    mes: res.data.mes,
    applyMemberDataList: res.data.data || [],
    err: res.data.err,
  };
};

export const createApplyMemberAPI = async (
  applyMemberData: IApplyMemberData
): Promise<IResponse> => {
  const { data } = await API.post("/apply-member", {
    ...applyMemberData,

    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    mes: data.mes,
    applyMemberData: data.data || {},
    err: data.err,
  };
};

export const deleteApplyMemberAPI = async (id: number): Promise<IResponse> => {
  const { data } = await API.delete(`/apply-member${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    mes: data.mes,
    applyMemberData: data.data || [],
    err: data.err,
  };
};
