import { motion } from "framer-motion";

export default function StorybookPortfolio() {

  const page = [

  ]
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

      <button className="absolute bottom-10 z-10 bg-indigo-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition">
        Let's Go →
      </button>
    </motion.div>
    
  )
  
}
