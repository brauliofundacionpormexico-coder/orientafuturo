export interface CareerSuggestion {
  title: string;
  description: string;
  matchScore: number;
  salaryRangeUSD: string;
  educationPath: string;
  requiredSkills: string[];
  whyItFits: string;
  growthOutlook: string;
}

export interface UserProfile {
  passions: string;
  skills: string;
  preferredWorkStyle: string; // e.g., Remote, Office, Field
}

export enum AppState {
  LANDING = 'LANDING',
  ASSESSMENT = 'ASSESSMENT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}