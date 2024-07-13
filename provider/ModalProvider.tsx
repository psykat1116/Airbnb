import RentModal from "@/components/modals/RentModal";
import LoginModal from "@/components/modals/LoginModal";
import SearchModal from "@/components/modals/SearchModal";
import RegisterModal from "@/components/modals/RegisterModal";

const ModalProvider = () => {
  return (
    <>
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <SearchModal />
    </>
  );
};

export default ModalProvider;
