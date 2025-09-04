import { motion } from "framer-motion";

export default function StorybookPortfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-indigo-200"
    >
      <h1 className="text-4xl font-bold text-indigo-800">
        Welcome To My Storybook Portfolio 🚀
      </h1>
    </motion.div>
  );
}
