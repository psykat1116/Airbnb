"use client";
import Button from "@/components/Button";
import { usePaymentModal } from "@/hook/usePaymentModal";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

interface PaymentDetailsProps {
  reservationId: string;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ reservationId }) => {
  const [loading, setLoading] = useState(false);
  const { onOpen } = usePaymentModal();

  const handleShow = async () => {
    setLoading(true);
    await axios
      .get(`/api/payment/${reservationId}`)
      .then((res) => {
        console.log(res.data);
        onOpen(res.data);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      disabled={false}
      small
      label="Payment Details"
      onClick={handleShow}
    />
  );
};

export default PaymentDetails;