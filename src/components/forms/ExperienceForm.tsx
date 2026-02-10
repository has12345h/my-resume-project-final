import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import type { Experience } from '@/types/resume';

export default function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const { experience } = resumeData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const handleAdd = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  const handleEdit = (exp: Experience) => {
    setIsEditing(true);
    setEditingId(exp.id);
    setFormData(exp);
  };

  const handleSave = () => {
    if (!formData.company || !formData.position) return;

    if (editingId) {
      updateExperience(editingId, formData);
    } else {
      addExperience({
        ...formData,
        id: crypto.randomUUID(),
      } as Experience);
    }

    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    removeExperience(id);
  };

  return (
    <Card className="form-section">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Briefcase className="w-5 h-5 text-blue-600" />
          الخبرات العملية
        </CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={handleAdd}
          disabled={isEditing}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة خبرة
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">اسم الشركة</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="اسم الشركة"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">المسمى الوظيفي</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="المسمى الوظيفي"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">تاريخ البدء</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">تاريخ الانتهاء</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.current}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: '' })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="current" className="text-sm cursor-pointer">
                ما زلت أعمل هنا
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="اكتب وصفاً لمهامك وإنجازاتك..."
                rows={3}
              />
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
            {experience.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                لا توجد خبرات عملية. اضغط على "إضافة خبرة" لإضافة خبرتك الأولى.
              </p>
            ) : (
              experience.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? 'حتى الآن' : exp.endDate}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(exp)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(exp.id)}
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
