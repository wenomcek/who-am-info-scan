import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 bg-black/30 p-8 rounded-xl backdrop-blur-sm border border-white/10"
    >
      <h1 className="text-6xl font-bold mb-4 text-white">
        {t('title')}
      </h1>
      <p className="text-lg text-gray-300 max-w-md mx-auto">
        {t('subtitle')}
      </p>
    </motion.div>
  );
}