import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "./LoadingSpinner";
import { UserInfoDisplay } from "./UserInfoDisplay";

interface UserInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UserInfo {
  ip: string;
  browser: string;
  location: string;
  country: string;
}

export function UserInfoModal({ open, onOpenChange }: UserInfoModalProps) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      setLoading(true);
      const browser = navigator.userAgent;
      
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          setUserInfo({
            ip: data.ip,
            browser: browser,
            location: `${data.city}, ${data.region}`,
            country: data.country_name,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setLoading(false);
        });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-[32px] bg-gray-900/75 backdrop-blur-sm border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
            {t('modalTitle')}
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence>
          {loading ? (
            <LoadingSpinner />
          ) : (
            userInfo && <UserInfoDisplay userInfo={userInfo} />
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}