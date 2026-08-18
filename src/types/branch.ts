import { ID, ISODateString } from "./api";

export interface Branch {
  _id: ID;
  title: string;
  phoneNumber1: string;
  phoneNumber2: string | null;
  address: string;
  workingHours: string;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface BranchListResponse {
  statusCode: number;
  data: {
    branches: Branch[];
  };
}

export type BranchListResult = BranchListResponse["data"];

export type BranchResult = BranchResponse["data"];

export interface CreateBranchPayload {
  title: string;
  phoneNumber1: string;
  phoneNumber2?: string;
  address: string;
  workingHours: string;
}

export type UpdateBranchPayload = CreateBranchPayload;

export interface BranchResponse {
  statusCode: number;
  data: {
    branch: Branch;
  };
}

export interface BranchMessageResponse {
  statusCode: number;
  data: {
    message: string;
    branch?: Branch;
  };
}
