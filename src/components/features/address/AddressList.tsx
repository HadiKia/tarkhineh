import AddressCard from "./AddressCard";
import type { Address } from "@/types/address";

type AddressListProps = {
  addresses: Address[];
};

const AddressList = ({ addresses }: AddressListProps) => {
  return (
    <ul className="grid gap-3 lg:grid-cols-2 lg:gap-4">
      {addresses.map((address) => (
        <AddressCard key={address._id} address={address} />
      ))}
    </ul>
  );
};

export default AddressList;
