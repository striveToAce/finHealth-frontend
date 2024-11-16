import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const modalVariants = {
  hidden: { opacity: 0, y: "-50%" },
  visible: { opacity: 1, y: "0%" },
  exit: { opacity: 0, y: "-50%" },
};

export const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      {/* Animated Modal Container */}
      <motion.div
        className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full relative"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {/* Modal Title */}
        {title && (
          <h2 className="text-3xl font-extrabold mb-4 text-glow">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {title}
            </span>
          </h2>
        )}

        {/* Modal Content */}
        <div>{children}</div>

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full font-semibold"
          onClick={onClose}
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
};