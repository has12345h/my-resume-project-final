import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Plus, X } from 'lucide-react';

const suggestedSkills = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
  'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go',
  'HTML', 'CSS', 'Sass', 'Tailwind CSS', 'Bootstrap',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
  'Git', 'GitHub', 'GitLab', 'CI/CD',
  'REST API', 'GraphQL', 'WebSocket',
  'Agile', 'Scrum', 'Jira',
];

export default function SkillsForm() {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const { skills } = resumeData;
  
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      addSkill(skill);
    }
  };

  return (
    <Card className="form-section">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Wrench className="w-5 h-5 text-blue-600" />
          المهارات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new skill */}
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="أضف مهارة جديدة..."
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            إضافة
          </Button>
        </div>

        {/* Current skills */}
        {skills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">مهاراتك</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="w-4 h-4 rounded-full hover:bg-blue-200 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Suggested skills */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">مهارات مقترحة</h4>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills
              .filter((skill) => !skills.includes(skill))
              .map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSuggestedSkill(skill)}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  + {skill}
                </button>
              ))}
          </div>
        </div>

        {skills.length === 0 && (
          <p className="text-gray-500 text-center py-4">
            لم تضف أي مهارات بعد. أضف مهاراتك أو اختر من المهارات المقترحة.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
