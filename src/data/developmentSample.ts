export type SampleTexture = 'diffuse' | 'crisp';

export interface SampleCategory {
  id: string;
  label: string;
  texture: SampleTexture;
  groupLabel: string;
}

export interface SampleYear {
  id: string;
  label: string;
}

export interface SampleEdge {
  id: string;
  categoryId: string;
  yearId: string;
  texture: SampleTexture;
}

export const sampleWarning = 'DEVELOPMENT SAMPLE — NOT HISTORICAL DATA';

export const categories: SampleCategory[] = [
  { id: 'diffuse-01', label: 'Sample category A', texture: 'diffuse', groupLabel: 'DIFFUSE STUDY' },
  { id: 'diffuse-02', label: 'Sample category B', texture: 'diffuse', groupLabel: 'DIFFUSE STUDY' },
  { id: 'crisp-01', label: 'Sample category C', texture: 'crisp', groupLabel: 'CRISP STUDY' },
  { id: 'crisp-02', label: 'Sample category D', texture: 'crisp', groupLabel: 'CRISP STUDY' },
];

export const years: SampleYear[] = [
  { id: 'period-a', label: 'Year A' },
  { id: 'period-b', label: 'Year B' },
  { id: 'period-c', label: 'Year C' },
  { id: 'period-d', label: 'Year D' },
];

export const edges: SampleEdge[] = [
  { id: 'diffuse-01-period-a', categoryId: 'diffuse-01', yearId: 'period-a', texture: 'diffuse' },
  { id: 'diffuse-01-period-b', categoryId: 'diffuse-01', yearId: 'period-b', texture: 'diffuse' },
  { id: 'diffuse-01-period-c', categoryId: 'diffuse-01', yearId: 'period-c', texture: 'diffuse' },
  { id: 'diffuse-02-period-a', categoryId: 'diffuse-02', yearId: 'period-a', texture: 'diffuse' },
  { id: 'diffuse-02-period-c', categoryId: 'diffuse-02', yearId: 'period-c', texture: 'diffuse' },
  { id: 'diffuse-02-period-d', categoryId: 'diffuse-02', yearId: 'period-d', texture: 'diffuse' },
  { id: 'crisp-01-period-a', categoryId: 'crisp-01', yearId: 'period-a', texture: 'crisp' },
  { id: 'crisp-01-period-b', categoryId: 'crisp-01', yearId: 'period-b', texture: 'crisp' },
  { id: 'crisp-01-period-d', categoryId: 'crisp-01', yearId: 'period-d', texture: 'crisp' },
  { id: 'crisp-02-period-b', categoryId: 'crisp-02', yearId: 'period-b', texture: 'crisp' },
  { id: 'crisp-02-period-c', categoryId: 'crisp-02', yearId: 'period-c', texture: 'crisp' },
  { id: 'crisp-02-period-d', categoryId: 'crisp-02', yearId: 'period-d', texture: 'crisp' },
];