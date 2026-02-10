import { useRef } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import ProjectsForm from '@/components/forms/ProjectsForm';
import ResumePreview from '@/components/preview/ResumePreview';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderGit, 
  Eye, 
  Download, 
  RotateCcw, 
  FileText,
  Layout,
  Check
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

const templates = [
  { id: 'modern', name: 'عصري', description: 'تصميم ملون وعصري' },
  { id: 'classic', name: 'كلاسيكي', description: 'تصميم تقليدي أنيق' },
  { id: 'minimal', name: 'بسيط', description: 'تصميم نظيف وبسيط' },
] as const;

export default function App() {
  const { template, setTemplate, resetResume, loadExample } = useResumeStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">صانع السيرة الذاتية</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={loadExample}
                className="hidden sm:flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                تحميل مثال
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetResume}
                className="hidden sm:flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة تعيين
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Forms Section */}
          <div className="space-y-6 no-print">
            {/* Template Selection */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                اختر القالب
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id as typeof template)}
                    className={`p-3 rounded-lg border-2 text-right transition-all ${
                      template === t.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{t.name}</span>
                      {template === t.id && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{t.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Forms Tabs */}
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="personal" className="flex flex-col items-center gap-1 py-2">
                  <User className="w-4 h-4" />
                  <span className="text-xs">شخصي</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex flex-col items-center gap-1 py-2">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs">خبرة</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="flex flex-col items-center gap-1 py-2">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs">تعليم</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex flex-col items-center gap-1 py-2">
                  <Wrench className="w-4 h-4" />
                  <span className="text-xs">مهارات</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex flex-col items-center gap-1 py-2">
                  <FolderGit className="w-4 h-4" />
                  <span className="text-xs">مشاريع</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-4">
                <PersonalInfoForm />
              </TabsContent>
              <TabsContent value="experience" className="mt-4">
                <ExperienceForm />
              </TabsContent>
              <TabsContent value="education" className="mt-4">
                <EducationForm />
              </TabsContent>
              <TabsContent value="skills" className="mt-4">
                <SkillsForm />
              </TabsContent>
              <TabsContent value="projects" className="mt-4">
                <ProjectsForm />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between no-print">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                معاينة السيرة الذاتية
              </h2>
              <Button
                onClick={handlePrint}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                طباعة / PDF
              </Button>
            </div>

            {/* Preview Container */}
            <div 
              ref={previewRef}
              className="bg-gray-200 p-4 rounded-lg overflow-auto max-h-[calc(100vh-12rem)]"
            >
              <ResumePreview scale={0.7} />
            </div>

            <p className="text-sm text-gray-500 text-center no-print">
              انقر على "طباعة / PDF" لحفظ السيرة الذاتية كملف PDF
            </p>
          </div>
        </div>
      </main>
      <Analytics />
    </div>
  );
}
