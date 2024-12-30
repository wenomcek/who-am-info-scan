import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserInfoModal } from "@/components/UserInfoModal";
import { UserCounter } from "@/components/UserCounter";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { MatrixBackground } from "@/components/MatrixBackground";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInfo = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900">
      <MatrixBackground />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 relative z-10"
      >
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-400">
          Who AM?
        </h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto">
          Discover detailed information about your digital presence with just one click
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
          className="text-lg px-8 py-6 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 border border-gray-700/50 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-gray-700/20 disabled:opacity-50 relative overflow-hidden group"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Scanning...
            </>
          ) : (
            "Get Info"
          )}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={isLoading ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
          />
        </Button>
      </motion.div>

      <UserCounter className="mt-12 relative z-10" />
      <UserInfoModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Index;