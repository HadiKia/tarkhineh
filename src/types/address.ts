import { ID } from "./api";

export type Address = {
  _id: ID;
  title: string;
  isSelfReceiver: boolean;
  phoneNumber?: string;
  receiverName?: string;
  receiverPhoneNumber?: string;
  address: string;
};

export type CreateAddressPayload = {
  title: string;
  isSelfReceiver: boolean;
  phoneNumber?: string;
  receiverName?: string;
  receiverPhoneNumber?: string;
  address: string;
};

export type CreateAddressResponse = {
  data: {
    message: string;
    createdAddress: Address;
  };
};
