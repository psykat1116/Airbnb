"use client";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import Modal from "@/components/modals/Modal";
import Input from "@/components/inputs/Input";
import useLoginModal from "@/hook/useLoginModal";
import useRegisterModal from "@/hook/useRegisterModal";

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
          <div>First Time Using Airbnb?</div>
          <div
            onClick={switchModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Create an account
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
