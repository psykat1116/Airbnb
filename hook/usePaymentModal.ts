import { Payments } from "razorpay/dist/types/payments";
import { create } from "zustand";

interface PaymentModalState {
  data: Payments.RazorpayPayment | null;
  open: boolean;
  onOpen: (data: Payments.RazorpayPayment) => void;
  onClose: () => void;
}

export const usePaymentModal = create<PaymentModalState>((set) => ({
  data: null,
  open: false,
  onOpen: (data) => set({ open: true, data }),
  onClose: () => set({ open: false, data: null }),
}));
