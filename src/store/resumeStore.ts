import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeData, PersonalInfo, Experience, Education, Project, TemplateType } from '@/types/resume';
import { defaultResumeData } from '@/types/resume';

interface ResumeState {
  // Data
  resumeData: ResumeData;
  template: TemplateType;
  
  // Actions
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (experience: Experience) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Education) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  setTemplate: (template: TemplateType) => void;
  setPhoto: (photo: string) => void;
  resetResume: () => void;
  loadExample: () => void;
}

const exampleData: ResumeData = {
  personalInfo: {
    firstName: 'أحمد',
    lastName: 'محمد',
    title: 'مطور ويب Full Stack',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    location: 'الرياض، السعودية',
    website: 'www.ahmed.dev',
    linkedin: 'linkedin.com/in/ahmed',
    github: 'github.com/ahmed',
    summary: 'مطور ويب شغوف مع أكثر من 5 سنوات من الخبرة في بناء تطبيقات ويب حديثة باستخدام React و Node.js. أمتلك خبرة في العمل مع فرق متعددة التخصصات وتقديم حلول تقنية مبتكرة.',
    photo: '',
  },
  experience: [
    {
      id: '1',
      company: 'شركة التقنية المتقدمة',
      position: 'مطور ويب أول',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• قيادة فريق من 5 مطورين في بناء منصة SaaS للتحليلات\n• تطوير واجهات مستخدم تفاعلية باستخدام React و TypeScript\n• تحسين أداء التطبيق بنسبة 40% من خلال تحسين الكود',
    },
    {
      id: '2',
      company: 'وكالة الإبداع الرقمي',
      position: 'مطور Full Stack',
      startDate: '2020-03',
      endDate: '2021-12',
      current: false,
      description: '• بناء مواقع وتطبيقات ويب لعملاء متنوعين\n• العمل مع تقنيات متعددة مثل Node.js و MongoDB و Vue.js',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'جامعة الملك سعود',
      degree: 'بكالوريوس',
      field: 'علوم الحاسب',
      startDate: '2015-09',
      endDate: '2019-06',
      current: false,
      description: 'تخصص في هندسة البرمجيات مع معدل تراكمي 3.8',
    },
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'Next.js', 'Tailwind CSS', 'Git', 'Docker', 'AWS'],
  projects: [
    {
      id: '1',
      name: 'منصة التجارة الإلكترونية',
      description: 'منصة متكاملة للتجارة الإلكترونية مع نظام دفع وإدارة مخزون',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://example.com',
    },
  ],
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      template: 'modern',

      setPersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info },
          },
        })),

      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, experience],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...new Set([...state.resumeData.skills, skill])],
          },
        })),

      removeSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((s) => s !== skill),
          },
        })),

      addProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...state.resumeData.projects, project],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
        })),

      setTemplate: (template) => set({ template }),

      setPhoto: (photo) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, photo },
          },
        })),

      resetResume: () => set({ resumeData: defaultResumeData }),

      loadExample: () => set({ resumeData: exampleData }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
