import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { BookOpen, Mail, CheckCircle2, User, AlertCircle } from 'lucide-react';

interface CreateSubjectProps {
  onNavigate: (page: string) => void;
}

export function CreateSubject({ onNavigate }: CreateSubjectProps) {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    description: '',
    staffEmail: '',
  });
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [staffData, setStaffData] = useState({ name: '', email: '' });
  const [success, setSuccess] = useState(false);

  const handleVerifyStaff = () => {
    setVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
      setStaffData({
        name: 'Dr. Sarah Johnson',
        email: formData.staffEmail,
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) return;

    // Simulate success
    setSuccess(true);
    setTimeout(() => {
      onNavigate('subject-list');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('subject-management')}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            ← Back to Subject Management
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="Create New Subject"
          subtitle="Add a new subject and assign a staff member"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <GradientCard>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Subject Details</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject-name">Subject Name</Label>
                <Input
                  id="subject-name"
                  type="text"
                  placeholder="Web Development"
                  value={formData.subjectName}
                  onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                  className="h-12 bg-input-background border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject-code">Subject Code</Label>
                <Input
                  id="subject-code"
                  type="text"
                  placeholder="CS301"
                  value={formData.subjectCode}
                  onChange={(e) => setFormData({ ...formData, subjectCode: e.target.value })}
                  className="h-12 bg-input-background border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the subject..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-24 bg-input-background border-border"
                />
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-semibold mb-4">Assign Staff Member</h4>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="staff-email">Staff Email Address</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="staff-email"
                          type="email"
                          placeholder="staff@university.edu"
                          value={formData.staffEmail}
                          onChange={(e) => {
                            setFormData({ ...formData, staffEmail: e.target.value });
                            setVerified(false);
                          }}
                          className="pl-10 h-12 bg-input-background border-border"
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleVerifyStaff}
                        disabled={!formData.staffEmail || verified || verifying}
                        variant="outline"
                        className="h-12"
                      >
                        {verifying ? 'Verifying...' : verified ? 'Verified' : 'Verify'}
                      </Button>
                    </div>
                  </div>

                  {verified && staffData && (
                    <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <User className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-green-900">{staffData.name}</p>
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </div>
                          <p className="text-sm text-green-700">{staffData.email}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {success && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 mb-1">Subject Created!</p>
                    <p className="text-sm text-green-700">
                      {formData.subjectName} has been added to the system.
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={!verified || success}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                Create Subject
              </Button>
            </form>
          </GradientCard>

          {/* Info Panel */}
          <div className="space-y-6">
            <GradientCard gradient>
              <h3 className="font-semibold mb-4">Creation Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <p className="font-medium mb-1">Enter Subject Information</p>
                    <p className="text-sm text-muted-foreground">
                      Provide the subject name and unique subject code
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <p className="font-medium mb-1">Verify Staff Member</p>
                    <p className="text-sm text-muted-foreground">
                      Enter staff email and verify they exist in the system
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <p className="font-medium mb-1">Create Subject</p>
                    <p className="text-sm text-muted-foreground">
                      Submit to create the subject with assigned staff
                    </p>
                  </div>
                </div>
              </div>
            </GradientCard>

            <GradientCard>
              <h3 className="font-semibold mb-4">Important Notes</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p>Subject codes must be unique across the system</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p>Staff must have an active account before assignment</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p>Students can be enrolled after subject creation</p>
                </div>
              </div>
            </GradientCard>

            <GradientCard className="bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Next Steps</p>
                  <p className="text-blue-700">
                    After creating the subject, you can enroll students through the Subject List page.
                  </p>
                </div>
              </div>
            </GradientCard>
          </div>
        </div>
      </div>
    </div>
  );
}
