"use client";
import axios from "axios";
import { User } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import useLoginModal from "@/hook/useLoginModal";

interface IUseFavourite {
  listingId: string;
  currentUser?: User | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();

  const hasFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        onOpen();
        return;
      }
      try {
        let request;
        if (hasFavourite) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Favourites updated");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [currentUser, hasFavourite, listingId, onOpen, router]
  );

  return { hasFavourite, toggleFavourite };
};

export default useFavourite;
