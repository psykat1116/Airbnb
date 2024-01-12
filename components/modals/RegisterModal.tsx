"use client";
import React, { useCallback, useState } from "react";
import useRegisterModal from "@/hook/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const RegisterModal = () => {
  const { isOpen, onClose, onOpen } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSumbit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const userData = await axios.post("/api/register", data);
      toast.success("User Created Successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        errors={errors}
        required
        register={register}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className="flex justify-between items-center gap-4">
        <Button outline icon={FcGoogle} label="Google" onClick={() => {}} />
        <Button outline icon={AiFillGithub} label="Github" onClick={() => {}} />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex items-center gap-2">
          <div>Already Have an Account?</div>
          <div
            onClick={onClose}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSumbit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
