import { motion } from "framer-motion";
import { Globe, Monitor, MapPin, Flag } from "lucide-react";
import { InfoItem } from "./InfoItem";
import { useTranslation } from "react-i18next";

interface UserInfoDisplayProps {
  userInfo: {
    ip: string;
    browser: string;
    location: string;
    country: string;
  };
}

export function UserInfoDisplay({ userInfo }: UserInfoDisplayProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <InfoItem icon={Globe} label={t("ipAddress")} value={userInfo.ip} />
      <InfoItem icon={Monitor} label={t("browser")} value={userInfo.browser} />
      <InfoItem icon={MapPin} label={t("location")} value={userInfo.location} />
      <InfoItem icon={Flag} label={t("country")} value={userInfo.country} />
    </motion.div>
  );
}