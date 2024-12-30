import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserInfoModal } from "@/components/UserInfoModal";
import { UserCounter } from "@/components/UserCounter";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInfo = async () => {
    setIsLoading(true);
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          Who AM?
        </h1>
        <p className="text-lg text-slate-300 max-w-md mx-auto">
          Discover detailed information about your digital presence with just one click
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <Button
          onClick={handleGetInfo}
          disabled={isLoading}
          className="text-lg px-8 py-6 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/10 disabled:opacity-50 relative overflow-hidden group"
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
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={isLoading ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
          />
        </Button>
      </motion.div>

      <UserCounter className="mt-12" />
      <UserInfoModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Index;