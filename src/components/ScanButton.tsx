import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ScanButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function ScanButton({ isLoading, onClick }: ScanButtonProps) {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="text-lg px-8 py-6 rounded-full bg-blue-500/80 hover:bg-blue-600/80 text-white border border-white/20 transition-all duration-300 shadow-lg disabled:opacity-50 relative overflow-hidden backdrop-blur-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t('scanning')}
          </>
        ) : (
          t('getInfo')
        )}
      </Button>
    </motion.div>
  );
}