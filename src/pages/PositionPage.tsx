import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Filter, GraduationCap, BookOpen, UserCheck, Star, TrendingUp, DollarSign, MapPin, Target, ChevronDown, ChevronUp, X, FileText, CheckCircle, AlertTriangle, Lightbulb, Building2, Shield, Heart, Activity } from 'lucide-react';
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
  CATEGORY_OPTIONS,
  REGION_OPTIONS,
  SALARY_OPTIONS,
  INTENSITY_OPTIONS,
  matchPosition,
  calculateMatchScore,
  type PositionFilterCriteria,
} from '@/domain/positionMatching';

interface ScoredPosition extends PositionRecommendation {
  score: number;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  '公务员': Building2,
  '事业单位': Briefcase,
  '军队文职': Shield,
  '基层项目': Heart,
};

export default function PositionPage() {
  const [education, setEducation] = useState('不限');
  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [candidateType, setCandidateType] = useState('不限');
  const [politicalStatus, setPoliticalStatus] = useState('不限');
  const [selectedExamTypes, setSelectedExamTypes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('不限');
  const [selectedRegion, setSelectedRegion] = useState('不限');
  const [selectedSalary, setSelectedSalary] = useState('不限');
  const [selectedIntensity, setSelectedIntensity] = useState('不限');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters =
    education !== '不限' ||
    selectedMajors.length > 0 ||
    candidateType !== '不限' ||
    politicalStatus !== '不限' ||
    selectedExamTypes.length > 0 ||
    selectedCategory !== '不限' ||
    selectedRegion !== '不限' ||
    selectedSalary !== '不限' ||
    selectedIntensity !== '不限';

  const activeFilterCount = [
    education !== '不限' ? 1 : 0,
    selectedMajors.length > 0 ? 1 : 0,
    candidateType !== '不限' ? 1 : 0,
    politicalStatus !== '不限' ? 1 : 0,
    selectedExamTypes.length > 0 ? 1 : 0,
    selectedCategory !== '不限' ? 1 : 0,
    selectedRegion !== '不限' ? 1 : 0,
    selectedSalary !== '不限' ? 1 : 0,
    selectedIntensity !== '不限' ? 1 : 0,
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
    setSelectedCategory('不限');
    setSelectedRegion('不限');
    setSelectedSalary('不限');
    setSelectedIntensity('不限');
  };

  const filteredPositions = useMemo<ScoredPosition[]>(() => {
    const criteria: PositionFilterCriteria = {
      education,
      selectedMajors,
      candidateType,
      politicalStatus,
      selectedExamTypes,
      selectedCategory,
      selectedRegion,
      selectedSalary,
      selectedIntensity,
    };

    const scored = positions.map((pos) => ({
      ...pos,
      score: calculateMatchScore(pos, criteria),
    }));

    return scored
      .filter((pos) => matchPosition(pos, criteria))
      .sort((a, b) => b.score - a.score);
  }, [education, selectedMajors, candidateType, politicalStatus, selectedExamTypes, selectedCategory, selectedRegion, selectedSalary, selectedIntensity]);

  const getExamTypeBadgeVariant = (examType: string) => {
    if (examType === '国考') return 'primary';
    if (examType === '省考') return 'gold';
    if (examType === '选调生') return 'green';
    if (examType === '军队文职') return 'primary';
    if (examType === '三支一扶') return 'gold';
    return 'default';
  };

  const getCategoryColor = (category: string) => {
    const map: Record<string, string> = {
      '公务员': 'border-primary-500 bg-primary-50',
      '事业单位': 'border-blue-500 bg-blue-50',
      '军队文职': 'border-green-500 bg-green-50',
      '基层项目': 'border-orange-500 bg-orange-50',
    };
    return map[category] || 'border-gray-300 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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
            覆盖公务员、事业单位、军队文职、基层项目等22个岗位，根据你的条件智能匹配
          </motion.p>
        </div>

        {/* Filter Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="space-y-5">
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

              {/* Row 1: Basic Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Education */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">学历</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EDUCATION_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setEducation(opt)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          education === opt
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">岗位类别</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedCategory(opt)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedCategory === opt
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Major */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">专业</span>
                  <span className="text-xs text-gray-400">（可多选）</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {MAJOR_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => toggleMajor(opt)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                        selectedMajors.includes(opt)
                          ? 'bg-primary-600 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 2: more filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">考生类型</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CANDIDATE_TYPE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setCandidateType(opt)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          candidateType === opt
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">政治面貌</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {POLITICAL_STATUS_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setPoliticalStatus(opt)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          politicalStatus === opt
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">考试类型</span>
                    <span className="text-xs text-gray-400">（可多选）</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {EXAM_TYPE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => toggleExamType(opt)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedExamTypes.includes(opt)
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                更多筛选条件（地区、薪资、工作强度）
              </button>

              {/* Advanced Filters */}
              <AnimatePresence initial={false}>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 pb-1">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">地区偏好</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {REGION_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setSelectedRegion(opt)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                selectedRegion === opt
                                  ? 'bg-primary-600 text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">薪资期望</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {SALARY_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setSelectedSalary(opt)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                selectedSalary === opt
                                  ? 'bg-primary-600 text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <Activity className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">工作强度</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {INTENSITY_OPTIONS.map((opt) => (
                            <button
                              key={opt}
                              onClick={() => setSelectedIntensity(opt)}
                              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                                selectedIntensity === opt
                                  ? 'bg-primary-600 text-white shadow-sm'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Reset */}
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

        {/* Results */}
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
                  {filteredPositions.map((pos, index) => {
                    const CatIcon = CATEGORY_ICONS[pos.category] || Briefcase;
                    return (
                      <motion.div
                        key={pos.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                        whileHover={{ y: -2 }}
                      >
                        <Card className={`h-full transition-shadow duration-300 hover:shadow-lg border-l-4 ${getCategoryColor(pos.category)}`}>
                          <div className="flex flex-col h-full">
                            {/* Top Badges */}
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant={getExamTypeBadgeVariant(pos.examType)}>
                                  {pos.examType}
                                </Badge>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  <CatIcon className="h-3 w-3" />
                                  {pos.category}
                                </span>
                              </div>
                            </div>

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
                                  transition={{ duration: 0.8, delay: index * 0.04 + 0.3, ease: 'easeOut' }}
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
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <GraduationCap className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                <span>适合学历：{pos.suitableFor.education.join('、')}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <BookOpen className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                <span>适合专业：{pos.suitableFor.majors.join('、')}</span>
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
                              {pos.workIntensity && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Activity className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                  <span>工作强度：{pos.workIntensity}</span>
                                </div>
                              )}
                            </div>

                            {/* Recommendation Reason */}
                            <div className="pt-4">
                              <div className="rounded-lg border-l-4 border-primary-500 bg-primary-50 p-3">
                                <p className="text-sm leading-relaxed text-primary-800">
                                  {pos.recommendationReason}
                                </p>
                              </div>
                            </div>

                            {/* Toggle Detail */}
                            <button
                              onClick={() =>
                                setExpandedId(expandedId === pos.id ? null : pos.id)
                              }
                              className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              {expandedId === pos.id ? (
                                <>
                                  <ChevronUp className="h-4 w-4" />
                                  收起详情
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-4 w-4" />
                                  查看详情
                                </>
                              )}
                            </button>

                            {/* Expandable Detail */}
                            <AnimatePresence initial={false}>
                              {expandedId === pos.id && (
                                <motion.div
                                  key="detail"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
                                    {/* 岗位职责 */}
                                    <div>
                                      <div className="mb-1.5 flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm font-semibold text-gray-700">岗位职责</span>
                                      </div>
                                      <p className="text-sm leading-relaxed text-gray-600">{pos.jobDescription}</p>
                                    </div>

                                    {/* 关键数据 */}
                                    {(pos.recruitmentScale || pos.entryScore || pos.workLocation) && (
                                      <div>
                                        <div className="mb-1.5 flex items-center gap-2">
                                          <TrendingUp className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm font-semibold text-gray-700">关键数据</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                                          {pos.recruitmentScale && (
                                            <div className="rounded bg-white p-2 text-center">
                                              <div className="text-gray-400">招录规模</div>
                                              <div className="font-semibold text-gray-700">{pos.recruitmentScale}</div>
                                            </div>
                                          )}
                                          {pos.entryScore && (
                                            <div className="rounded bg-white p-2 text-center">
                                              <div className="text-gray-400">进面分数</div>
                                              <div className="font-semibold text-gray-700">{pos.entryScore}</div>
                                            </div>
                                          )}
                                          {pos.workLocation && (
                                            <div className="rounded bg-white p-2 text-center">
                                              <div className="text-gray-400">工作地点</div>
                                              <div className="font-semibold text-gray-700">{pos.workLocation}</div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    {/* 报考条件 */}
                                    {pos.specificRequirements && pos.specificRequirements.length > 0 && (
                                      <div>
                                        <div className="mb-1.5 flex items-center gap-2">
                                          <FileText className="h-4 w-4 text-gray-500" />
                                          <span className="text-sm font-semibold text-gray-700">报考条件</span>
                                        </div>
                                        <ul className="list-inside list-disc space-y-1">
                                          {pos.specificRequirements.map((req, i) => (
                                            <li key={i} className="text-sm leading-relaxed text-gray-600">{req}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* 考试科目 */}
                                    <div>
                                      <div className="mb-1.5 flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm font-semibold text-gray-700">考试科目</span>
                                      </div>
                                      <p className="text-sm leading-relaxed text-gray-600">{pos.examSubjects}</p>
                                    </div>

                                    {/* 优势 */}
                                    <div>
                                      <div className="mb-1.5 flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                        <span className="text-sm font-semibold text-gray-700">优势</span>
                                      </div>
                                      <ul className="list-inside list-disc space-y-1">
                                        {pos.pros.map((pro, i) => (
                                          <li key={i} className="text-sm leading-relaxed text-green-700">{pro}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* 劣势 */}
                                    <div>
                                      <div className="mb-1.5 flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                                        <span className="text-sm font-semibold text-gray-700">劣势</span>
                                      </div>
                                      <ul className="list-inside list-disc space-y-1">
                                        {pos.cons.map((con, i) => (
                                          <li key={i} className="text-sm leading-relaxed text-amber-700">{con}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    {/* 备考建议 */}
                                    <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-3">
                                      <div className="mb-1.5 flex items-center gap-2">
                                        <Lightbulb className="h-4 w-4 text-yellow-600" />
                                        <span className="text-sm font-semibold text-gray-700">备考建议</span>
                                      </div>
                                      <p className="text-sm leading-relaxed text-gray-700">{pos.tipsForPreparation}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}