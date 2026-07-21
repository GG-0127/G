import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  FileText,
  CheckCircle,
  CreditCard,
  Printer,
  Edit3,
  Users,
  Heart,
  Award,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Target,
  Clock,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  ListOrdered,
  PenTool,
  MessageSquare,
  Mic,
  FileCheck,
  Filter,
  GraduationCap,
  GitBranch,
  MapPin,
  Layers,
} from 'lucide-react';
import { processSteps, examComparison, examTips } from '@/data/tips';
import Card from '@/components/Card';
import Badge from '@/components/Badge';

const iconMap: Record<string, React.ComponentType<any>> = {
  Search,
  FileText,
  CheckCircle,
  CreditCard,
  Printer,
  Edit3,
  Users,
  Heart,
  Award,
  Calendar,
  User,
  BookOpen,
  ListOrdered,
  Clock,
  PenTool,
  MessageSquare,
  Mic,
  FileCheck,
  Filter,
  GraduationCap,
  GitBranch,
  MapPin,
  Layers,
  AlertTriangle,
};

export default function TipsPage() {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupedTips = examTips.reduce(
    (acc, tip) => {
      if (!acc[tip.category]) {
        acc[tip.category] = [];
      }
      acc[tip.category].push(tip);
      return acc;
    },
    {} as Record<string, typeof examTips>,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Page Title */}
      <motion.h1
        className="font-serif text-3xl font-bold text-primary-800 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        考公注意事项
      </motion.h1>

      {/* Section 1: 报考流程 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-gold-500" />
          <h2 className="font-serif text-2xl font-bold text-primary-700">报考流程</h2>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          <div className="flex items-start justify-between">
            {processSteps.map((step, index) => {
              const Icon = iconMap[step.icon] || FileText;
              return (
                <motion.div
                  key={step.step}
                  className="flex flex-col items-center relative z-10 group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg cursor-pointer"
                    whileHover={{ scale: 1.15, backgroundColor: '#1a365d', color: '#ffffff' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <span className="group-hover:hidden">{step.step}</span>
                    <Icon className="w-5 h-5 hidden group-hover:block" />
                  </motion.div>
                  <p className="mt-2 text-sm font-medium text-gray-800 text-center">{step.title}</p>
                  <p className="mt-1 text-xs text-gray-500 text-center max-w-[100px] leading-tight">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
          {/* Connecting line */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-primary-100 -z-0" />
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden space-y-0">
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || FileText;
            const isLast = index === processSteps.length - 1;
            return (
              <motion.div
                key={step.step}
                className="flex gap-4"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0"
                    whileHover={{ scale: 1.15, backgroundColor: '#1a365d', color: '#ffffff' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {step.step}
                  </motion.div>
                  {!isLast && <div className="w-0.5 flex-1 bg-primary-100 my-1" />}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-medium text-gray-800">{step.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Section 2: 国考vs省考对比 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-6 h-6 text-gold-500" />
          <h2 className="font-serif text-2xl font-bold text-primary-700">国考vs省考对比</h2>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-sm">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="bg-primary-700 text-white">
                <th className="px-4 py-3 text-left font-medium">对比维度</th>
                <th className="px-4 py-3 text-left font-medium">国考</th>
                <th className="px-4 py-3 text-left font-medium">省考</th>
              </tr>
            </thead>
            <tbody>
              {examComparison.map((row, index) => (
                <tr key={row.category} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-primary-700">{row.category}</td>
                  <td className="px-4 py-3 text-gray-700">{row.guokao}</td>
                  <td className="px-4 py-3 text-gray-700">{row.shengkao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Section 3: 备考策略 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-gold-500" />
          <h2 className="font-serif text-2xl font-bold text-primary-700">备考策略</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(groupedTips).map(([category, tips]) => {
            const isExpanded = expandedCategories[category] !== false;
            const categoryIcon = tips[0] ? iconMap[tips[0].icon] || Lightbulb : Lightbulb;

            return (
              <Card key={category} className="overflow-hidden p-0">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="gold" className="text-sm px-3 py-1">
                      {category}
                    </Badge>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pb-6">
                        {tips.map((tip, index) => {
                          const TipIcon = iconMap[tip.icon] || Lightbulb;
                          return (
                            <motion.div
                              key={tip.id}
                              className="border-l-4 border-gold-500 bg-gold-50/40 rounded-r-lg p-4"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <TipIcon className="w-4 h-4 text-gold-600" />
                                <h4 className="font-bold text-gray-800">{tip.title}</h4>
                              </div>
                              <p className="text-sm text-gray-600">{tip.content}</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
}