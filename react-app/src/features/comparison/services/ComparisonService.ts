import http from "../../../utils/helpers/http-common";
import { IComparison } from "../types";

const getAll = (userId: string) => {
  return http.get<Array<IComparison>>(`/users/${userId}/comparisons`);
};

const get = (userId: string, id: string) => {
  return http.get<IComparison>(`/users/${userId}/comparisons/${id}`);
};

const create = (userId: string, data: IComparison) => {
  return http.post<IComparison>(`/users/${userId}/comparisons`, data);
};

const update = (userId: string, id: string, data: IComparison) => {
  return http.put<any>(`/users/${userId}/comparisons/${id}`, data);
};

const remove = (userId: string, id: any) => {
  return http.delete<any>(`/users/${userId}/comparisons/${id}`);
};

const removeAll = (userId: string) => {
  return http.delete<any>(`/users/${userId}/comparisons`);
};

const ComparisonService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default ComparisonService;