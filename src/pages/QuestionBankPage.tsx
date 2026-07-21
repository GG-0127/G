import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, ChevronLeft, CheckCircle2, XCircle, BookOpen, Brain, Calculator, Eye, FileText, PieChart } from 'lucide-react';
import { examModules } from '@/data/questionBank';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { ExamModule, KnowledgeTopic, Question } from '@/types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '政治理论': BookOpen,
  '常识判断': BookOpen,
  '言语理解与表达': FileText,
  '数量关系': Calculator,
  '判断推理': Brain,
  '资料分析': PieChart,
  '归纳概括': FileText,
  '综合分析': Eye,
  '提出对策': Brain,
  '应用文写作': FileText,
  '大作文': BookOpen,
};

function getIcon(name: string) {
  return iconMap[name] || BookOpen;
}

type View = 'modules' | 'topics' | 'detail' | 'quiz';

/* ---------- ModuleCard ---------- */
function ModuleCard({ module, onClick }: { module: ExamModule; onClick: () => void }) {
  const Icon = getIcon(module.name);
  return (
    <Card onClick={onClick} className="p-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-lg font-bold text-primary-700">{module.name}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{module.description}</p>
          <div className="mt-3 flex items-center gap-2">
            <Badge variant="primary">{module.topics.length} 个知识点</Badge>
            <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ---------- TopicDetail ---------- */
function TopicDetail({ topic, onStartQuiz, onBack }: { topic: KnowledgeTopic; onStartQuiz: () => void; onBack: () => void }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        返回知识点列表
      </button>

      <div>
        <h2 className="font-serif text-2xl font-bold text-primary-800">{topic.title}</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">{topic.content}</p>
      </div>

      <div className="bg-primary-50 rounded-xl p-5">
        <h3 className="font-serif text-lg font-semibold text-primary-700 mb-3">核心要点</h3>
        <ul className="space-y-2">
          {topic.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center text-xs font-bold mt-0.5">
                {i + 1}
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartQuiz}
        className="w-full py-3 bg-primary-700 text-white rounded-xl font-medium text-lg hover:bg-primary-800 transition-colors"
      >
        开始答题（{topic.sampleQuestions.length} 题）
      </motion.button>
    </div>
  );
}

/* ---------- QuizCard ---------- */
function QuizCard({
  questions,
  onBack,
}: {
  questions: Question[];
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const finished = results.length === questions.length;

  const question = questions[index];
  const answered = selected !== null;
  const isCorrect = selected === question.answer;

  const handleSelect = (optIdx: number) => {
    if (answered) return;
    setSelected(optIdx);
    setResults(prev => [...prev, optIdx === question.answer]);
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  if (finished) {
    const correctCount = results.filter(Boolean).length;
    const rate = Math.round((correctCount / results.length) * 100);
    return (
      <div className="text-center py-10 space-y-6">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-primary-600" />
        </motion.div>
        <div>
          <h3 className="font-serif text-2xl font-bold text-primary-800">答题完成</h3>
          <p className="mt-2 text-lg text-gray-600">
            答对 <span className="font-bold text-green-600">{correctCount}</span>/{questions.length} 题，正确率 <span className="font-bold text-primary-700">{rate}%</span>
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={() => { setIndex(0); setSelected(null); setResults([]); }} className="px-6 py-2.5 bg-primary-700 text-white rounded-xl font-medium hover:bg-primary-800 transition-colors">
            重新答题
          </button>
          <button onClick={onBack} className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            返回知识点
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />退出答题
        </button>
        <span className="text-sm text-gray-500">第 {index + 1}/{questions.length} 题</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <motion.div className="bg-primary-600 h-1.5 rounded-full" initial={{ width: 0 }} animate={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-gray-800 leading-relaxed">{question.stem}</p>
      </div>

      <div className="space-y-3">
        {question.options.map((opt, optIdx) => {
          const label = String.fromCharCode(65 + optIdx);
          let bgClass = 'bg-white border-gray-200 hover:border-primary-400 hover:bg-primary-50';
          if (answered) {
            if (optIdx === question.answer) bgClass = 'bg-green-50 border-green-400 text-green-800';
            else if (optIdx === selected) bgClass = 'bg-red-50 border-red-400 text-red-800';
            else bgClass = 'bg-white border-gray-200 text-gray-400';
          }
          return (
            <motion.button
              key={optIdx}
              whileTap={!answered ? { scale: 0.98 } : undefined}
              onClick={() => handleSelect(optIdx)}
              disabled={answered}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${bgClass}`}
            >
              <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${answered && optIdx === question.answer ? 'bg-green-500 text-white border-green-500' : answered && optIdx === selected && optIdx !== question.answer ? 'bg-red-500 text-white border-red-500' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                {answered && optIdx === question.answer ? <CheckCircle2 className="w-4 h-4" /> : answered && optIdx === selected && optIdx !== question.answer ? <XCircle className="w-4 h-4" /> : label}
              </span>
              <span className="flex-1">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
              <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{isCorrect ? '回答正确！' : '回答错误'}</span>
            </div>
            <p className="text-sm text-gray-600">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {answered && index < questions.length - 1 && (
        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleNext} className="w-full py-3 bg-primary-700 text-white rounded-xl font-medium hover:bg-primary-800 transition-colors">
          下一题
        </motion.button>
      )}
    </div>
  );
}

/* ---------- Main Page ---------- */
export default function QuestionBankPage() {
  const [activeCategory, setActiveCategory] = useState<'xingce' | 'shenlun'>('xingce');
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [view, setView] = useState<View>('modules');

  const filteredModules = examModules.filter(m => m.category === activeCategory);
  const selectedModule = examModules.find(m => m.id === selectedModuleId) || null;
  const selectedTopic = selectedModule?.topics.find(t => t.id === selectedTopicId) || null;

  const categoryLabel = activeCategory === 'xingce' ? '行测' : '申论';

  const handleModuleClick = (module: ExamModule) => {
    setSelectedModuleId(module.id);
    setSelectedTopicId(null);
    setView('topics');
  };

  const handleTopicClick = (topic: KnowledgeTopic) => {
    setSelectedTopicId(topic.id);
    setView('detail');
  };

  const handleStartQuiz = () => {
    setView('quiz');
  };

  const handleBackToTopics = () => {
    setSelectedTopicId(null);
    setView('topics');
  };

  const handleBackToModules = () => {
    setSelectedModuleId(null);
    setSelectedTopicId(null);
    setView('modules');
  };

  const handleBackFromQuiz = () => {
    setView('detail');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary-800">知识题库</h1>
          <p className="mt-2 text-gray-500">系统学习行测与申论知识点，在线答题巩固练习</p>
        </div>

        {/* Category Tabs */}
        <div className="relative mb-8">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
            {(['xingce', 'shenlun'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); handleBackToModules(); }}
                className={`relative px-6 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? 'text-white' : 'text-gray-600 hover:text-gray-800'}`}
              >
                {activeCategory === cat && (
                  <motion.div layoutId="tabBg" className="absolute inset-0 bg-primary-700 rounded-lg" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{cat === 'xingce' ? '行测' : '申论'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Breadcrumb */}
        {view !== 'modules' && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <button onClick={handleBackToModules} className="hover:text-primary-600 transition-colors">题库</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={handleBackToTopics} className="hover:text-primary-600 transition-colors">{categoryLabel}</button>
            {selectedModule && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-800">{selectedModule.name}</span>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          {view === 'modules' && (
            <motion.div key="modules" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map(module => (
                <ModuleCard key={module.id} module={module} onClick={() => handleModuleClick(module)} />
              ))}
            </motion.div>
          )}

          {view === 'topics' && selectedModule && (
            <motion.div key="topics" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-4">
              <button onClick={handleBackToModules} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-4">
                <ChevronLeft className="w-4 h-4" />
                返回模块列表
              </button>
              <h2 className="font-serif text-xl font-bold text-primary-700 mb-4">{selectedModule.name}</h2>
              {selectedModule.topics.map(topic => (
                <Card key={topic.id} onClick={() => handleTopicClick(topic)} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium text-gray-800">{topic.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>{topic.keyPoints.length} 个要点</Badge>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {view === 'detail' && selectedTopic && (
            <motion.div key="detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="p-6">
                <TopicDetail topic={selectedTopic} onStartQuiz={handleStartQuiz} onBack={handleBackToTopics} />
              </Card>
            </motion.div>
          )}

          {view === 'quiz' && selectedTopic && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="p-6">
                <QuizCard questions={selectedTopic.sampleQuestions} onBack={handleBackFromQuiz} />
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}