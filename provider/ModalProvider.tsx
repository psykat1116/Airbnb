import RentModal from "@/components/modals/RentModal";
import LoginModal from "@/components/modals/LoginModal";
import SearchModal from "@/components/modals/SearchModal";
import RegisterModal from "@/components/modals/RegisterModal";
import PaymentModal from "@/components/modals/PaymentModal";

const ModalProvider = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <SearchModal />
      <PaymentModal />
    </>
  );
};

export default ModalProvider;
