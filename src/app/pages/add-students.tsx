import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { GradientCard } from '@/app/components/gradient-card';
import { PageHeader } from '@/app/components/page-header';
import { Progress } from '@/app/components/ui/progress';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Download, Users } from 'lucide-react';

interface AddStudentsProps {
  onNavigate: (page: string) => void;
}

export function AddStudents({ onNavigate }: AddStudentsProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
            onClick={() => onNavigate('user-management')}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            ← Back to User Management
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title="Add Students (Bulk Upload)"
          subtitle="Upload an Excel file to add multiple students at once"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <GradientCard>
            <h3 className="text-xl font-semibold mb-6">Upload Student List</h3>

            {/* Drag and Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                file ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
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
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {success && (
              <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-900 mb-1">Upload Successful!</p>
                  <p className="text-sm text-green-700">156 students have been added to the system.</p>
                </div>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={!file || uploading || success}
              className="w-full mt-6 h-12"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Students
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
                  Download our Excel template with the required format
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
                  <h4 className="font-medium">Fill Student Data</h4>
                </div>
                <p className="text-sm text-muted-foreground ml-11">
                  Add student information in the following columns:
                </p>
                <ul className="text-sm text-muted-foreground ml-11 mt-2 space-y-1">
                  <li>• Name (Required)</li>
                  <li>• Email (Required)</li>
                  <li>• Roll Number (Required)</li>
                  <li>• Department (Optional)</li>
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
                  Upload the completed Excel file using the upload area
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-start gap-2">
                <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 mb-1">Auto-Generated Passwords</p>
                  <p className="text-blue-700">
                    Temporary passwords will be generated and sent to student email addresses.
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
                  <th className="text-left p-3 bg-muted/50">Name</th>
                  <th className="text-left p-3 bg-muted/50">Email</th>
                  <th className="text-left p-3 bg-muted/50">Roll Number</th>
                  <th className="text-left p-3 bg-muted/50">Department</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">john.doe@university.edu</td>
                  <td className="p-3">CS2026001</td>
                  <td className="p-3">Computer Science</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3">Jane Smith</td>
                  <td className="p-3">jane.smith@university.edu</td>
                  <td className="p-3">CS2026002</td>
                  <td className="p-3">Computer Science</td>
                </tr>
              </tbody>
            </table>
          </div>
        </GradientCard>
      </div>
    </div>
  );
}
