export interface Question {
  id: string;
  type: 'single' | 'multiple';
  stem: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface KnowledgeTopic {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
  sampleQuestions: Question[];
}

export interface ExamModule {
  id: string;
  name: string;
  category: 'xingce' | 'shenlun';
  description: string;
  icon: string;
  color?: string;
  topics: KnowledgeTopic[];
}

export interface RegionData {
  province: string;
  examType: string;
  recruitmentScale: number;
  competitionRatio: number;
  entryScore: number;
  maxEntryScore: number;
  tier: number;
  salaryRange: string;
  tags: string[];
  description: string;
}

export interface PositionRecommendation {
  id: string;
  examType: string;
  positionType: string;
  category: '公务员' | '事业单位' | '军队文职' | '基层项目';
  suitableFor: {
    education: string[];
    majors: string[];
    isFreshGrad: boolean | null;
    politicalStatus: string[];
    regions?: string[];
  };
  competitionRatio: string;
  developmentProspect: string;
  salaryLevel: string;
  recommendationReason: string;
  jobDescription: string;
  examSubjects: string;
  pros: string[];
  cons: string[];
  tipsForPreparation: string;
  recruitmentScale?: string;
  entryScore?: string;
  workLocation?: string;
  workIntensity?: string;
  specificRequirements?: string[];
}

export interface ExamTip {
  id: string;
  category: string;
  title: string;
  content: string;
  icon: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface ExamComparison {
  category: string;
  guokao: string;
  shengkao: string;
}