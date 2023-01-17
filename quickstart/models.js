export const topic = 'eng-test';

export const disciplines = [
  'softwareEngineer',
  'projectManager',
  'devOps',
  'technicalWriter',
  'teamLead',
  'architect'
]

export const skills = [
  'pythonCoder',
  'nodeCoder',
  'javascriptCoder',
  'javaCoder',
  'storyPointer',
  'scrumMaster',
  'criticalAnalyst',
  'detailOriented'
]

export function getDiscipline() {
  return disciplines[Math.floor(Math.random() * disciplines.length)];
}

export function getSkill() {
  return skills[Math.floor(Math.random() * skills.length)];
}