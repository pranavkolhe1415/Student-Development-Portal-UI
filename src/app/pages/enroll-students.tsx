import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Download, BookOpen } from 'lucide-react';

interface EnrollStudentsProps {
  subjectId?: string;
  onNavigate: (page: string) => void;
}

export function EnrollStudents({ subjectId, onNavigate }: EnrollStudentsProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Mock subject data
  const subject = {
    id: subjectId || '1',
    name: 'Web Development',
    code: 'CS301',
    staff: 'Dr. Sarah Johnson',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.endsWith('.xlsx') || selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload an Excel file (.xlsx or .xls)');
        setFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => onNavigate('subject-list')}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            ← Back to Subject List
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Subject Context */}
        <GradientCard gradient className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">{subject.code}</Badge>
              <h2 className="text-2xl font-semibold mb-1">{subject.name}</h2>
              <p className="text-muted-foreground">Instructor: {subject.staff}</p>
            </div>
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
        </GradientCard>

        <PageHeader
          title="Enroll Students"
          subtitle="Upload an Excel file to enroll students in this subject"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <GradientCard>
            <h3 className="text-xl font-semibold mb-6">Upload Enrollment List</h3>

            {/* Drag and Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="file"
                id="enrollment-upload"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="enrollment-upload" className="cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  {file ? <FileSpreadsheet className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                </div>
                <p className="font-medium mb-2">
                  {file ? file.name : 'Click to upload or drag and drop'}
                </p>
                <p className="text-sm text-muted-foreground">Excel files only (.xlsx, .xls)</p>
              </label>
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {uploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Enrolling students...</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Enrollment Successful!</p>
                  <p className="text-sm text-green-700">
                    42 students have been enrolled in {subject.name}.
                  </p>
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading || success}
              className="w-full mt-6 h-12"
            >
              <Upload className="w-4 h-4 mr-2" />
              Enroll Students
            </Button>
          </GradientCard>

          {/* Instructions */}
          <GradientCard gradient>
            <h3 className="text-xl font-semibold mb-6">Instructions</h3>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <h4 className="font-medium">Download Template</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-11 mb-3">
                  Download the enrollment template for this subject
                </p>
                <Button variant="outline" size="sm" className="ml-11">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <h4 className="font-medium">Add Student Information</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-11">
                  Add student details in the following columns:
                </p>
                <ul className="text-sm text-muted-foreground ml-11 mt-2 space-y-1">
                  <li>• Email (Required)</li>
                  <li>• Roll Number (Required)</li>
                  <li>• Name (Optional - for verification)</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <h4 className="font-medium">Upload File</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-11">
                  Upload the completed Excel file to enroll students
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Important Note</p>
                  <p className="text-blue-700">
                    Students must have existing accounts in the system. Only enrolled students will have access to this subject.
                  </p>
                </div>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* File Format Preview */}
        <GradientCard className="mt-6">
          <h3 className="font-semibold mb-4">Expected File Format Preview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 bg-muted/50">Email</th>
                  <th className="text-left p-3 bg-muted/50">Roll Number</th>
                  <th className="text-left p-3 bg-muted/50">Name (Optional)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3">john.doe@university.edu</td>
                  <td className="p-3">CS2026001</td>
                  <td className="p-3">John Doe</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">jane.smith@university.edu</td>
                  <td className="p-3">CS2026002</td>
                  <td className="p-3">Jane Smith</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
