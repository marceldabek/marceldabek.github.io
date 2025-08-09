import { motion } from 'framer-motion'

export function ScrollArrow() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stroke-gray-400"
    >
      <motion.path
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        d="M12 5L12 19M12 19L5 12M12 19L19 12"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
