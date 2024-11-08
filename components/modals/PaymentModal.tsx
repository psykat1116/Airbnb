"use client";
import Heading from "@/components/Heading";
import Modal from "@/components/modals/Modal";
import { usePaymentModal } from "@/hook/usePaymentModal";

const PaymentModal = () => {
  const { open, onClose, data } = usePaymentModal();

  let bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading
        title="Payment Details"
        subtitle=""
      />
      {data && (
        <div className="flex flex-col space-y-3 items-center justify-start w-full">
          <div className="flex items-center justify-between p-2 gap-x-2 w-full border-b border-[#232323]">
            <label className="text-gray-500">Payment Id</label>
            <p className="font-semibold">{data.id}</p>
          </div>
          <div className="flex items-center justify-between p-2 gap-x-2 w-full border-b border-[#232323]">
            <label className="text-gray-500">Amount</label>
            <p className="font-semibold">
              {parseFloat(data.amount as string) / 100.0}
            </p>
          </div>
          <div className="flex items-center justify-between p-2 gap-x-2 w-full border-b border-[#232323]">
            <label className="text-gray-500">Currency</label>
            <p className="font-semibold">{data.currency}</p>
          </div>
          <div className="flex items-center justify-between p-2 gap-x-2 w-full border-b border-[#232323]">
            <label className="text-gray-500">Status</label>
            <p className="font-semibold uppercase">{data.status}</p>
          </div>
          <div className="flex items-center justify-between p-2 gap-x-2 w-full border-b border-[#232323]">
            <label className="text-gray-500">Method</label>
            <p className="font-semibold uppercase">{data.method}</p>
          </div>
          <div className="flex items-center justify-between p-2 gap-x-2 w-full border-b border-[#232323]">
            <label className="text-gray-500">Email</label>
            <p className="font-semibold">{data.email}</p>
          </div>
          <div className="flex items-center justify-between p-2 gap-x-2 w-full border-b border-[#232323]">
            <label className="text-gray-500">Date</label>
            <p className="font-semibold uppercase">
              {new Date(data.created_at * 1000).toUTCString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Modal
      onClose={onClose}
      isOpen={open}
      actionLabel="Close"
      onSubmit={onClose}
      title="Payment"
      body={bodyContent}
    />
  );
};

export default PaymentModal;
