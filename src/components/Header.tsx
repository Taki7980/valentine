import { motion } from "framer-motion"

interface HeaderProps {
  name: string
}

export default function Header({ name }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-600 mb-2">
        A special question for you, {name}...
      </h1>
      <p className="text-xl md:text-2xl text-pink-600">On this Valentine&apos;s Day</p>
    </motion.header>
  )
}

