import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderGit, Plus, Trash2, Edit2, X, Check, Link } from 'lucide-react';
import type { Project } from '@/types/resume';

export default function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const { projects } = resumeData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    description: '',
    technologies: [],
    link: '',
  });
  const [techInput, setTechInput] = useState('');

  const handleAdd = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      technologies: [],
      link: '',
    });
    setTechInput('');
  };

  const handleEdit = (project: Project) => {
    setIsEditing(true);
    setEditingId(project.id);
    setFormData(project);
    setTechInput('');
  };

  const handleSave = () => {
    if (!formData.name) return;

    if (editingId) {
      updateProject(editingId, formData);
    } else {
      addProject({
        ...formData,
        id: crypto.randomUUID(),
      } as Project);
    }

    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    removeProject(id);
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((t) => t !== tech) || [],
    });
  };

  return (
    <Card className="form-section">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl">
          <FolderGit className="w-5 h-5 text-blue-600" />
          المشاريع
        </CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={handleAdd}
          disabled={isEditing}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة مشروع
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="project-name">اسم المشروع</Label>
              <Input
                id="project-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="اسم المشروع"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-link" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                رابط المشروع
              </Label>
              <Input
                id="project-link"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">الوصف</Label>
              <Textarea
                id="project-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف المشروع وأهم الميزات..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>التقنيات المستخدمة</Label>
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                  placeholder="أضف تقنية..."
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  disabled={!techInput.trim()}
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.technologies && formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 rounded text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                حفظ
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                إلغاء
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                لا توجد مشاريع. اضغط على "إضافة مشروع" لإضافة مشاريعك.
              </p>
            ) : (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{project.name}</h4>
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
                    {project.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
