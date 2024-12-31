import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Globe, Monitor, MapPin, Flag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {userInfo && (
                <>
                  <InfoItem icon={Globe} label={t('ipAddress')} value={userInfo.ip} />
                  <InfoItem icon={Monitor} label={t('browser')} value={userInfo.browser} />
                  <InfoItem icon={MapPin} label={t('location')} value={userInfo.location} />
                  <InfoItem icon={Flag} label={t('country')} value={userInfo.country} />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-400" />
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{label}</p>
          <p className="text-sm font-medium text-gray-200">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}