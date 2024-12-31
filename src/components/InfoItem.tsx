import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
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