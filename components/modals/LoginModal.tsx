"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useLoginModal();
  const { onOpen: onRegisterOpen } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSumbit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    await signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged in Successfully");
        router.refresh();
        onClose();
      } else if (callback?.error) {
        toast.error(callback.error);
      }
    });
    reset();
    setIsLoading(false);
  };

  const switchModal = useCallback(() => {
    onClose();
    onRegisterOpen();
  }, [onRegisterOpen, onClose]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome back to Airbnb"
        subtitle="Continue with your account!"
      />
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
          <div>Don&apos;t Have an Account?</div>
          <div
            onClick={switchModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSumbit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
