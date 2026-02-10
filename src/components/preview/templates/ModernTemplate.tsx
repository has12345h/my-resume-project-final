import type { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: ModernTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="min-h-[297mm] bg-white text-gray-800" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex items-start gap-6">
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-24 h-24 rounded-full border-4 border-white/30 object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-xl text-white/90 mb-3">{personalInfo.title}</p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  {personalInfo.website}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  {personalInfo.linkedin}
                </span>
              )}
              {personalInfo.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  {personalInfo.github}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
              نبذة عني
            </h2>
            <p className="text-gray-600 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
              الخبرات العملية
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'حتى الآن' : exp.endDate}
                    </span>
                  </div>
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
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
              التعليم
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                      <p className="text-gray-600">
                        {edu.degree} - {edu.field}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.current ? 'حتى الآن' : edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 text-sm mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
              المهارات
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
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
            <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-3">
              المشاريع
            </h2>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800">{project.name}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {project.link}
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-600 text-sm mt-1">{project.description}</p>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
