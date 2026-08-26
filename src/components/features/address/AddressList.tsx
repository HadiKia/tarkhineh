import AddressCard from "./AddressCard";
import type { Address } from "@/types/address";

type AddressListProps = {
  addresses: Address[];
  onEdit?: (address: Address) => void;
  onDelete?: (address: Address) => void;
  selectedAddressId?: string | null;
  onSelect?: (address: Address) => void;
  editMode?: "route" | "modal";
};

const AddressList = ({
  addresses,
  onEdit,
  onDelete,
  selectedAddressId,
  onSelect,
  editMode = "route",
}: AddressListProps) => {
  return (
    <ul className="grid gap-3 lg:grid-cols-2 lg:gap-4">
      {addresses.map((address) => (
        <AddressCard
          key={address._id}
          address={address}
          onEdit={onEdit}
          onDelete={onDelete}
          isSelected={selectedAddressId === address._id}
          onSelect={onSelect}
          editMode={editMode}
        />
      ))}
    </ul>
  );
};

export default AddressList;
