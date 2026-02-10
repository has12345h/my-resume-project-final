import type { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="min-h-[297mm] bg-white text-gray-800 p-12" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-500 mb-4">{personalInfo.title}</p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>|</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
            الخبرة
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                <h3 className="font-medium text-gray-900">{exp.position}</h3>
                <p className="text-gray-600 text-sm">{exp.company}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {exp.startDate} - {exp.current ? 'حتى الآن' : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-gray-600 text-sm mt-2 whitespace-pre-line">
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
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
            التعليم
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                <p className="text-gray-600 text-sm">
                  {edu.degree} - {edu.field}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {edu.startDate} - {edu.current ? 'حتى الآن' : edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
            المهارات
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 border border-gray-200 text-gray-600 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
            المشاريع
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-gray-400 text-xs mt-1">
                    {project.technologies.join(' • ')}
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
