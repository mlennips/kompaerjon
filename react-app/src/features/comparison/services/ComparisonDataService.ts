import http from "../../../utils/helpers/http-common";
import { IComparison, IComparisonDetail } from "../types";
// import './_mocks_/comparison';

const getAll = (userId: string) => {
  return http.get<IComparison[]>(`/Comparisons?userId=${userId}`);
};

const get = (id: string) => {
  return http.get<IComparisonDetail>(`/Comparisons/${id}`);
};

const create = (userId: string, data: IComparison) => {
  return http.post<IComparison>(`/users/${userId}/comparisons`, data);
};

const update = (userId: string, id: string, data: any) => {
  return http.put<any>(`/users/${userId}/comparisons/${id}`, data);
};

const remove = (userId: string, id: any) => {
  return http.delete<any>(`/users/${userId}/comparisons/${id}`);
};

const removeAll = (userId: string) => {
  return http.delete<any>(`/users/${userId}/comparisons`);
};

const ComparisonDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default ComparisonDataService;