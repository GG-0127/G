import { ExamModule } from '@/types';
import { politicalTheory } from '@/data/xingce/politicalTheory';
import { commonKnowledgeModule } from '@/data/xingce/commonKnowledge';
import { languageComprehensionModule } from '@/data/xingce/languageComprehension';
import { quantitativeReasoning } from '@/data/xingce/quantitativeReasoning';
import { judgmentReasoning } from '@/data/xingce/judgmentReasoning';
import { dataAnalysis } from '@/data/xingce/dataAnalysis';
import { recentXingceModule } from '@/data/xingce/recentExam';
import { shenlunSummary } from '@/data/shenlun/summary';
import { shenlunComprehensiveAnalysis } from '@/data/shenlun/comprehensiveAnalysis';
import { shenlunCountermeasures } from '@/data/shenlun/countermeasures';
import { practicalWritingModule } from '@/data/shenlun/practicalWriting';
import { essayModule } from '@/data/shenlun/essay';
import { recentShenlunExamModule } from '@/data/shenlun/recentExam';

export const questionBank: ExamModule[] = [
  politicalTheory,
  commonKnowledgeModule,
  languageComprehensionModule,
  quantitativeReasoning,
  judgmentReasoning,
  dataAnalysis,
  recentXingceModule,
  shenlunSummary,
  shenlunComprehensiveAnalysis,
  shenlunCountermeasures,
  practicalWritingModule,
  essayModule,
  recentShenlunExamModule,
];

export default questionBank;
export { questionBank as examModules };