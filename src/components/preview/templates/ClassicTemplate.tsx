import type { ResumeData } from '@/types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 p-10" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-600 mb-3">{personalInfo.title}</p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.github && <span>• {personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            نبذة عني
          </h2>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            الخبرات العملية
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.current ? 'حتى الآن' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            التعليم
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                    <p className="text-gray-700">
                      {edu.degree} - {edu.field}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.current ? 'حتى الآن' : edu.endDate}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            المهارات
          </h2>
          <p className="text-gray-700">
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide border-b border-gray-300 pb-1 mb-3">
            المشاريع
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:underline"
                    >
                      {project.link}
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm mt-1">{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-gray-600 text-sm mt-1">
                    التقنيات: {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
