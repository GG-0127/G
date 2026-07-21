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
  suitableFor: {
    education: string[];
    majors: string[];
    isFreshGrad: boolean | null;
    politicalStatus: string[];
  };
  competitionRatio: string;
  developmentProspect: string;
  salaryLevel: string;
  recommendationReason: string;
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