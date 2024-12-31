import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserInfoModal } from "@/components/UserInfoModal";
import { UserCounter } from "@/components/UserCounter";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleGetInfo = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <LanguageSelector />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-6xl font-bold mb-4 text-gray-900">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          {t('subtitle')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <Button
          onClick={handleGetInfo}
          disabled={isLoading}
          className="text-lg px-8 py-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300 transition-all duration-300 shadow-lg disabled:opacity-50 relative overflow-hidden group"
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

      <UserCounter className="mt-12 relative z-10" />
      <UserInfoModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Index;