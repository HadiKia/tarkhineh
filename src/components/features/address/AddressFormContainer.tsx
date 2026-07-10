"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import {
  addressQueryKeys,
  useCreateAddress,
  useUpdateAddress,
} from "@/hooks/useAddress";
import { addressSchema, AddressFormValues } from "@/validations/address";
import { ApiError, CreateAddressPayload, Address } from "@/types";
import AddressForm from "./AddressForm";

type AddressFormContainerProps = {
  onClose: () => void;
  address?: Address;
};

const AddressFormContainer = ({
  onClose,
  address,
}: AddressFormContainerProps) => {
  const isEditing = Boolean(address);
  const queryClient = useQueryClient();
  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress(address?._id ?? "");

  const { isPending } = isEditing ? updateMutation : createMutation;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<AddressFormValues>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      title: "",
      isSelfReceiver: true,
      phoneNumber: "",
      receiverName: "",
      receiverPhoneNumber: "",
      address: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (address) {
      reset({
        title: address.title,
        isSelfReceiver: address.isSelfReceiver,
        phoneNumber: address.phoneNumber ?? "",
        receiverName: address.receiverName ?? "",
        receiverPhoneNumber: address.receiverPhoneNumber ?? "",
        address: address.address,
      });
    }
  }, [address, reset]);

  const handleCancel = () => {
    reset();
    onClose();
  };

  const submitHandler: SubmitHandler<AddressFormValues> = async (formData) => {
    try {
      const payload: CreateAddressPayload = {
        title: formData.title,
        isSelfReceiver: formData.isSelfReceiver,
        phoneNumber: formData.phoneNumber,
        receiverName: formData.receiverName,
        receiverPhoneNumber: formData.receiverPhoneNumber,
        address: formData.address,
      };
      const response = isEditing
        ? await updateMutation.mutateAsync(payload)
        : await createMutation.mutateAsync(payload);
      toast.success(response.data.message);
      await queryClient.invalidateQueries({
        queryKey: addressQueryKeys.all,
      });

      reset();
      onClose();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message);
    }
  };

  const isSubmitDisabled = isEditing ? !isDirty || !isValid : !isValid;

  return (
    <AddressForm
      control={control}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
      onCancel={handleCancel}
      isLoading={isPending}
      isSubmitDisabled={isSubmitDisabled}
      isEditing={isEditing}
    />
  );
};

export default AddressFormContainer;
