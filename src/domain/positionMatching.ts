import type { PositionRecommendation } from '@/types';

export const EDUCATION_OPTIONS = ['不限', '大专', '本科', '硕士及以上'];
export const MAJOR_OPTIONS = ['法学', '经济学', '会计学', '计算机', '汉语言文学', '公共管理', '不限'];
export const CANDIDATE_TYPE_OPTIONS = ['不限', '应届生', '往届生'];
export const POLITICAL_STATUS_OPTIONS = ['不限', '中共党员', '共青团员'];
export const EXAM_TYPE_OPTIONS = ['国考', '省考', '选调生'];

const EDUCATION_LABEL_MAP: Record<string, string> = {
  '大专': '大专及以上',
  '本科': '本科及以上',
  '硕士及以上': '硕士及以上',
};

export function matchEducation(position: PositionRecommendation, selected: string): boolean {
  if (selected === '不限') return true;
  const target = EDUCATION_LABEL_MAP[selected] || selected;
  return position.suitableFor.education.includes(target) || position.suitableFor.education.includes('不限');
}

export function matchMajor(position: PositionRecommendation, selectedMajors: string[]): boolean {
  if (selectedMajors.length === 0) return true;
  if (selectedMajors.includes('不限')) return true;
  if (position.suitableFor.majors.includes('不限')) return true;
  return selectedMajors.some((m) => position.suitableFor.majors.includes(m));
}

export function matchCandidateType(position: PositionRecommendation, selected: string): boolean {
  if (selected === '不限') return true;
  if (selected === '应届生') return position.suitableFor.isFreshGrad === true;
  if (selected === '往届生') return position.suitableFor.isFreshGrad !== true;
  return true;
}

export function matchPoliticalStatus(position: PositionRecommendation, selected: string): boolean {
  if (selected === '不限') return true;
  const statuses = position.suitableFor.politicalStatus;
  if (statuses.includes('不限')) return true;
  if (selected === '中共党员') {
    return statuses.some((s) => s.startsWith('中共党员'));
  }
  return statuses.includes(selected);
}

export function matchExamType(position: PositionRecommendation, selectedExamTypes: string[]): boolean {
  if (selectedExamTypes.length === 0) return true;
  return selectedExamTypes.includes(position.examType);
}

export interface PositionFilterCriteria {
  education: string;
  selectedMajors: string[];
  candidateType: string;
  politicalStatus: string;
  selectedExamTypes: string[];
}

export function matchPosition(
  position: PositionRecommendation,
  criteria: PositionFilterCriteria
): boolean {
  return (
    matchEducation(position, criteria.education) &&
    matchMajor(position, criteria.selectedMajors) &&
    matchCandidateType(position, criteria.candidateType) &&
    matchPoliticalStatus(position, criteria.politicalStatus) &&
    matchExamType(position, criteria.selectedExamTypes)
  );
}

export function calculateMatchScore(
  position: PositionRecommendation,
  criteria: PositionFilterCriteria
): number {
  let matchCount = 0;
  let totalCriteria = 0;

  if (criteria.education !== '不限') {
    totalCriteria++;
    if (matchEducation(position, criteria.education)) matchCount++;
  }
  if (criteria.selectedMajors.length > 0) {
    totalCriteria++;
    if (matchMajor(position, criteria.selectedMajors)) matchCount++;
  }
  if (criteria.candidateType !== '不限') {
    totalCriteria++;
    if (matchCandidateType(position, criteria.candidateType)) matchCount++;
  }
  if (criteria.politicalStatus !== '不限') {
    totalCriteria++;
    if (matchPoliticalStatus(position, criteria.politicalStatus)) matchCount++;
  }
  if (criteria.selectedExamTypes.length > 0) {
    totalCriteria++;
    if (matchExamType(position, criteria.selectedExamTypes)) matchCount++;
  }

  return totalCriteria > 0 ? Math.round((matchCount / totalCriteria) * 100) : 100;
}