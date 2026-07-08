import AddressCard from "./AddressCard";
import type { Address } from "@/types/address";

type AddressListProps = {
  addresses: Address[];
  onEdit?: (address: Address) => void;
};

const AddressList = ({ addresses, onEdit }: AddressListProps) => {
  return (
    <ul className="grid gap-3 lg:grid-cols-2 lg:gap-4">
      {addresses.map((address) => (
        <AddressCard key={address._id} address={address} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default AddressList;
