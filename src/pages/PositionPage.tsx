import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Filter, GraduationCap, BookOpen, UserCheck, Star, TrendingUp, DollarSign, MapPin, Target, ChevronDown, X } from 'lucide-react';
import { positionRecommendations as positions } from '@/data/positions';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import type { PositionRecommendation } from '@/types';
import {
  EDUCATION_OPTIONS,
  MAJOR_OPTIONS,
  CANDIDATE_TYPE_OPTIONS,
  POLITICAL_STATUS_OPTIONS,
  EXAM_TYPE_OPTIONS,
  matchPosition,
  calculateMatchScore,
  type PositionFilterCriteria,
} from '@/domain/positionMatching';

interface ScoredPosition extends PositionRecommendation {
  score: number;
}

export default function PositionPage() {
  const [education, setEducation] = useState('不限');
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [candidateType, setCandidateType] = useState('不限');
  const [politicalStatus, setPoliticalStatus] = useState('不限');
  const [selectedExamTypes, setSelectedExamTypes] = useState<string[]>([]);

  const hasActiveFilters =
    education !== '不限' ||
    selectedMajors.length > 0 ||
    candidateType !== '不限' ||
    politicalStatus !== '不限' ||
    selectedExamTypes.length > 0;

  const activeFilterCount = [
    education !== '不限' ? 1 : 0,
    selectedMajors.length > 0 ? 1 : 0,
    candidateType !== '不限' ? 1 : 0,
    politicalStatus !== '不限' ? 1 : 0,
    selectedExamTypes.length > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const toggleMajor = (major: string) => {
    setSelectedMajors((prev) =>
      prev.includes(major) ? prev.filter((m) => m !== major) : [...prev, major]
    );
  };

  const toggleExamType = (type: string) => {
    setSelectedExamTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleReset = () => {
    setEducation('不限');
    setSelectedMajors([]);
    setCandidateType('不限');
    setPoliticalStatus('不限');
    setSelectedExamTypes([]);
  };

  const filteredPositions = useMemo<ScoredPosition[]>(() => {
    const criteria: PositionFilterCriteria = {
      education,
      selectedMajors,
      candidateType,
      politicalStatus,
      selectedExamTypes,
    };

    const scored = positions.map((pos) => ({
      ...pos,
      score: calculateMatchScore(pos, criteria),
    }));

    return scored
      .filter((pos) => matchPosition(pos, criteria))
      .sort((a, b) => b.score - a.score);
  }, [education, selectedMajors, candidateType, politicalStatus, selectedExamTypes]);

  const getExamTypeBadgeVariant = (examType: string) => {
    if (examType === '国考') return 'primary';
    if (examType === '省考') return 'gold';
    if (examType === '选调生') return 'green';
    return 'default';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl font-bold text-primary-800"
          >
            岗位推荐
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-gray-600"
          >
            根据你的个人条件，智能匹配最适合的公务员岗位类型
          </motion.p>
        </div>

        {/* Section 1: Filter Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="space-y-6">
              {/* Filter Header */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                <Filter className="h-5 w-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-800">条件筛选</h2>
                {hasActiveFilters && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-2 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700"
                  >
                    {activeFilterCount} 项筛选
                  </motion.span>
                )}
              </div>

              {/* 1. Education */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">学历</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {EDUCATION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setEducation(opt)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        education === opt
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Major */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">专业</span>
                  <span className="text-xs text-gray-400">（可多选）</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {MAJOR_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleMajor(opt)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        selectedMajors.includes(opt)
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Candidate Type */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">考生类型</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CANDIDATE_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setCandidateType(opt)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        candidateType === opt
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Political Status */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">政治面貌</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POLITICAL_STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setPoliticalStatus(opt)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        politicalStatus === opt
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Exam Type */}
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">目标考试类型</span>
                  <span className="text-xs text-gray-400">（可多选）</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {EXAM_TYPE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleExamType(opt)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        selectedExamTypes.includes(opt)
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={filteredPositions.length}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="text-sm text-gray-500"
                  >
                    为你找到{' '}
                    <span className="font-semibold text-primary-700">{filteredPositions.length}</span>{' '}
                    个匹配岗位
                  </motion.span>
                </AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleReset}
                    className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                    重置筛选
                  </motion.button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Section 2: Results */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {filteredPositions.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <Briefcase className="h-16 w-16 text-gray-300" />
                <p className="mt-4 text-lg font-medium text-gray-500">暂无匹配岗位</p>
                <p className="mt-1 text-sm text-gray-400">请调整筛选条件后重新查询</p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredPositions.map((pos, index) => (
                    <motion.div
                      key={pos.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                        <div className="flex flex-col h-full">
                          {/* Top: Exam Type Badge */}
                          <div className="mb-3 flex items-center justify-between">
                            <Badge variant={getExamTypeBadgeVariant(pos.examType)}>
                              {pos.examType}
                            </Badge>
                          </div>

                          {/* Position Type Name */}
                          <h3 className="font-serif text-xl font-bold text-gray-900">
                            {pos.positionType}
                          </h3>

                          {/* Match Score */}
                          <div className="mt-4">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500">匹配度</span>
                              <span className="text-sm font-bold text-primary-700">
                                {pos.score}%
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pos.score}%` }}
                                transition={{ duration: 0.8, delay: index * 0.05 + 0.3, ease: 'easeOut' }}
                                className={`h-full rounded-full ${
                                  pos.score >= 80
                                    ? 'bg-green-500'
                                    : pos.score >= 50
                                    ? 'bg-yellow-500'
                                    : 'bg-red-400'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Info Rows */}
                          <div className="mt-4 space-y-2.5">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <GraduationCap className="h-4 w-4 flex-shrink-0 text-gray-400" />
                              <span>
                                适合学历：{pos.suitableFor.education.join('、')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <BookOpen className="h-4 w-4 flex-shrink-0 text-gray-400" />
                              <span>
                                适合专业：{pos.suitableFor.majors.join('、')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <UserCheck className="h-4 w-4 flex-shrink-0 text-gray-400" />
                              <span>竞争比：{pos.competitionRatio}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <TrendingUp className="h-4 w-4 flex-shrink-0 text-gray-400" />
                              <span>发展前景：{pos.developmentProspect}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <DollarSign className="h-4 w-4 flex-shrink-0 text-gray-400" />
                              <span>薪资水平：{pos.salaryLevel}</span>
                            </div>
                          </div>

                          {/* Recommendation Reason */}
                          <div className="mt-auto pt-4">
                            <div className="rounded-lg border-l-4 border-primary-500 bg-primary-50 p-3">
                              <p className="text-sm leading-relaxed text-primary-800">
                                {pos.recommendationReason}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}