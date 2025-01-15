export interface Investor {
  id: string;
  name: string;
  stage: string;
  status: string;
  type: string;
  checkSize: string;
  sector: string;
  coInvestors: number;
  important: string[];
  strikeZone: boolean;
  positiveAttributes?: string[];
  redFlags: string[];
}
