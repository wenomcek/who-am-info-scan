import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserInfoModal } from "@/components/UserInfoModal";
import { UserCounter } from "@/components/UserCounter";
import { motion } from "framer-motion";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          Who AM?
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Discover detailed information about your digital presence with just one click
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          className="text-lg px-8 py-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Info
        </Button>
      </motion.div>

      <UserCounter className="mt-12" />
      <UserInfoModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default Index;