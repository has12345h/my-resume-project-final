import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Plus, Trash2, Edit2, X, Check } from 'lucide-react';
import type { Education } from '@/types/resume';

export default function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = resumeData;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const handleAdd = () => {
    setIsEditing(true);
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  const handleEdit = (edu: Education) => {
    setIsEditing(true);
    setEditingId(edu.id);
    setFormData(edu);
  };

  const handleSave = () => {
    if (!formData.institution || !formData.degree) return;

    if (editingId) {
      updateEducation(editingId, formData);
    } else {
      addEducation({
        ...formData,
        id: crypto.randomUUID(),
      } as Education);
    }

    setIsEditing(false);
    setEditingId(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    removeEducation(id);
  };

  return (
    <Card className="form-section">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-xl">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          التعليم
        </CardTitle>
        <Button
          type="button"
          size="sm"
          onClick={handleAdd}
          disabled={isEditing}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          إضافة تعليم
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="institution">المؤسسة التعليمية</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="اسم الجامعة أو المؤسسة"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">الشهادة</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="مثال: بكالوريوس"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">التخصص</Label>
                <Input
                  id="field"
                  value={formData.field}
                  onChange={(e) => setFormData({ ...formData, field: e.target.value })}
                  placeholder="مثال: علوم الحاسب"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edu-startDate">تاريخ البدء</Label>
                <Input
                  id="edu-startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edu-endDate">تاريخ الانتهاء</Label>
                <Input
                  id="edu-endDate"
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
                id="edu-current"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked, endDate: '' })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="edu-current" className="text-sm cursor-pointer">
                ما زلت أدرس هنا
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edu-description">الوصف</Label>
              <Textarea
                id="edu-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="معلومات إضافية عن دراستك..."
                rows={2}
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
            {education.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                لا توجد بيانات تعليمية. اضغط على "إضافة تعليم" لإضافة تعليمك.
              </p>
            ) : (
              education.map((edu) => (
                <div
                  key={edu.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{edu.institution}</h4>
                    <p className="text-gray-600">
                      {edu.degree} - {edu.field}
                    </p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.current ? 'حتى الآن' : edu.endDate}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(edu)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(edu.id)}
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
