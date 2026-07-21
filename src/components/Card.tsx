import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export default function Card({ children, className, onClick, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover && onClick ? { scale: 1.02 } : undefined}
      whileTap={hover && onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={clsx(
        'bg-white rounded-xl border border-gray-100 shadow-sm',
        onClick && 'cursor-pointer',
        hover && 'transition-shadow hover:shadow-md',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}