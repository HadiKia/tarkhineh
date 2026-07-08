"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import { addAddress } from "@/services/addressService";
import { addressSchema, AddressFormValues } from "@/validations/address";
import { ApiError, CreateAddressPayload } from "@/types";
import AddressForm from "./AddressForm";

type AddressFormContainerProps = {
  onClose: () => void;
};

const AddressFormContainer = ({ onClose }: AddressFormContainerProps) => {
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({ mutationFn: addAddress });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
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
      const { data } = await mutateAsync(payload);
      toast.success(data.message);
      await queryClient.invalidateQueries({ queryKey: ["get-addresses"] });
      
      reset();
      onClose();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <AddressForm
      control={control}
      register={register}
      errors={errors}
      onSubmit={handleSubmit(submitHandler)}
      onCancel={handleCancel}
      isLoading={isPending}
      isValid={isValid}
    />
  );
};

export default AddressFormContainer;
