import type { PositionRecommendation } from '@/types';

export const EDUCATION_OPTIONS = ['不限', '大专', '本科', '硕士及以上'];
export const MAJOR_OPTIONS = ['法学', '经济学', '会计学', '计算机', '汉语言文学', '公共管理', '医学', '金融', '不限'];
export const CANDIDATE_TYPE_OPTIONS = ['不限', '应届生', '往届生'];
export const POLITICAL_STATUS_OPTIONS = ['不限', '中共党员', '共青团员'];
export const EXAM_TYPE_OPTIONS = ['国考', '省考', '选调生', '军队文职', '三支一扶'];
export const CATEGORY_OPTIONS = ['不限', '公务员', '事业单位', '军队文职', '基层项目'];
export const REGION_OPTIONS = ['不限', '华东', '华南', '华北', '华中', '西南', '西北', '东北'];
export const SALARY_OPTIONS = ['不限', '10万以下', '10-15万', '15-20万', '20万以上'];
export const INTENSITY_OPTIONS = ['不限', '轻松', '适中', '较忙', '高强度'];

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

export function matchCategory(position: PositionRecommendation, selected: string): boolean {
  if (selected === '不限') return true;
  return position.category === selected;
}

export function matchRegion(position: PositionRecommendation, selected: string): boolean {
  if (selected === '不限') return true;
  if (!position.suitableFor.regions) return true;
  return position.suitableFor.regions.includes(selected);
}

export function matchSalary(position: PositionRecommendation, selected: string): boolean {
  if (selected === '不限') return true;
  const salary = position.salaryLevel;
  const match = salary.match(/(\d+)/g);
  if (!match) return true;
  const min = parseInt(match[0]);
  if (selected === '10万以下') return min < 10;
  if (selected === '10-15万') return min >= 10 && min < 15;
  if (selected === '15-20万') return min >= 15 && min < 20;
  if (selected === '20万以上') return min >= 20;
  return true;
}

export function matchIntensity(position: PositionRecommendation, selected: string): boolean {
  if (selected === '不限') return true;
  if (!position.workIntensity) return true;
  return position.workIntensity === selected;
}

export interface PositionFilterCriteria {
  education: string;
  selectedMajors: string[];
  candidateType: string;
  politicalStatus: string;
  selectedExamTypes: string[];
  selectedCategory: string;
  selectedRegion: string;
  selectedSalary: string;
  selectedIntensity: string;
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
    matchExamType(position, criteria.selectedExamTypes) &&
    matchCategory(position, criteria.selectedCategory) &&
    matchRegion(position, criteria.selectedRegion) &&
    matchSalary(position, criteria.selectedSalary) &&
    matchIntensity(position, criteria.selectedIntensity)
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
  if (criteria.selectedCategory !== '不限') {
    totalCriteria++;
    if (matchCategory(position, criteria.selectedCategory)) matchCount++;
  }
  if (criteria.selectedRegion !== '不限') {
    totalCriteria++;
    if (matchRegion(position, criteria.selectedRegion)) matchCount++;
  }
  if (criteria.selectedSalary !== '不限') {
    totalCriteria++;
    if (matchSalary(position, criteria.selectedSalary)) matchCount++;
  }
  if (criteria.selectedIntensity !== '不限') {
    totalCriteria++;
    if (matchIntensity(position, criteria.selectedIntensity)) matchCount++;
  }

  return totalCriteria > 0 ? Math.round((matchCount / totalCriteria) * 100) : 100;
}