"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react"; 
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Modal from "@/components/modals/Modal";
import Input from "@/components/inputs/Input";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";

const RegisterModal = () => {
  const { isOpen, onClose } = useRegisterModal();
  const { onOpen: onLoginOpen } = useLoginModal();
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
      await axios.post("/api/register", data);
      toast.success("User Created Successfully");
      onClose();
      onLoginOpen();
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const switchModal = useCallback(() => {
    onClose();
    onLoginOpen();
  }, [onLoginOpen, onClose]);

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
        <Button
          outline
          icon={FcGoogle}
          label="Google"
          onClick={() => signIn("google")}
        />
        <Button
          outline
          icon={AiFillGithub}
          label="Github"
          onClick={() => signIn("github")}
        />
      </div>
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex items-center gap-2">
          <div>Already Have an Account?</div>
          <div
            onClick={switchModal}
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
