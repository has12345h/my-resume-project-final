import { useRef } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Link, FileText, Camera } from 'lucide-react';

export default function PersonalInfoForm() {
  const { resumeData, setPersonalInfo, setPhoto } = useResumeStore();
  const { personalInfo } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="form-section">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <User className="w-5 h-5 text-blue-600" />
          المعلومات الشخصية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Photo Upload */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors overflow-hidden bg-gray-50"
            onClick={() => fileInputRef.current?.click()}
          >
            {personalInfo.photo ? (
              <img
                src={personalInfo.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {personalInfo.photo ? 'تغيير الصورة' : 'إضافة صورة'}
          </Button>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">الاسم الأول</Label>
            <Input
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo({ firstName: e.target.value })}
              placeholder="مثال: هاشم"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">اسم العائلة</Label>
            <Input
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo({ lastName: e.target.value })}
              placeholder="مثال: محمد"
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">المسمى الوظيفي</Label>
          <Input
            id="title"
            value={personalInfo.title}
            onChange={(e) => setPersonalInfo({ title: e.target.value })}
            placeholder="مثال: مطور ويب Full Stack"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ email: e.target.value })}
              placeholder="example@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              رقم الهاتف
            </Label>
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ phone: e.target.value })}
              placeholder="+966 50 123 4567"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            الموقع
          </Label>
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => setPersonalInfo({ location: e.target.value })}
            placeholder="مثال: الرياض، السعودية"
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Link className="w-4 h-4" />
              الموقع الشخصي
            </Label>
            <Input
              id="website"
              value={personalInfo.website}
              onChange={(e) => setPersonalInfo({ website: e.target.value })}
              placeholder="www.example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => setPersonalInfo({ linkedin: e.target.value })}
              placeholder="linkedin.com/in/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              value={personalInfo.github}
              onChange={(e) => setPersonalInfo({ github: e.target.value })}
              placeholder="github.com/username"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <Label htmlFor="summary" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            نبذة عني
          </Label>
          <Textarea
            id="summary"
            value={personalInfo.summary}
            onChange={(e) => setPersonalInfo({ summary: e.target.value })}
            placeholder="اكتب نبذة مختصرة عن خبراتك ومهاراتك..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
