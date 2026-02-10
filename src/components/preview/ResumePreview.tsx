import { useRef } from 'react';
import { useResumeStore } from '@/store/resumeStore';

import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface ResumePreviewProps {
  scale?: number;
}

export default function ResumePreview({ scale = 1 }: ResumePreviewProps) {
  const { resumeData, template } = useResumeStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div
      ref={previewRef}
      className="bg-white shadow-lg"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
      }}
    >
      {renderTemplate()}
    </div>
  );
}
