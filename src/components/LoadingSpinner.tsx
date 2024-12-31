import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center py-8"
    >
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </motion.div>
  );
}