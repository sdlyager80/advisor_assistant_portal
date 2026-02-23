import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  Chip,
  LinearProgress,
  alpha,
  Divider,
} from '@mui/material';
import { CloudUpload, Description, CheckCircle, Schedule, FolderOpen } from '@mui/icons-material';

const colors = {
  orange: '#F6921E',
  yellow: '#E8DE23',
  lightGreen: '#8BC53F',
  green: '#37A526',
  lightBlue: '#00ADEE',
  blue: '#1B75BB',
  red: '#D02E2E',
  paleAqua: '#F2F7F6',
};

const recentSubmissions = [
  { id: 'SUB-2026-0847', type: 'New Policy Application', client: 'James Wilson', date: 'Feb 20, 2026', status: 'Approved' },
  { id: 'SUB-2026-0831', type: 'Policy Change Request', client: 'Sarah Johnson', date: 'Feb 15, 2026', status: 'Under Review' },
  { id: 'SUB-2026-0819', type: 'Beneficiary Update', client: 'Michael Chen', date: 'Feb 8, 2026', status: 'Approved' },
  { id: 'SUB-2026-0804', type: 'New Policy Application', client: 'Emily Rodriguez', date: 'Feb 3, 2026', status: 'Approved' },
];

const acceptedTypes = ['PDF', 'DOC', 'DOCX', 'JPG', 'PNG'];

const SubmissionIntakeScreen = () => {
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | processing | complete
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submissionId, setSubmissionId] = useState(null);
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    setSelectedFile(file);
    setUploadState('uploading');
    setUploadProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 12;
      setUploadProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(interval);
        setUploadState('processing');
        setTimeout(() => {
          const id = `SUB-2026-${Math.floor(1000 + Math.random() * 8999)}`;
          setSubmissionId(id);
          setUploadState('complete');
        }, 1800);
      }
    }, 180);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleReset = () => {
    setUploadState('idle');
    setSelectedFile(null);
    setUploadProgress(0);
    setSubmissionId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', py: 3 }}>
      <Container maxWidth="lg" sx={{ pb: 10, pt: 3 }}>
        {/* Header */}
        <Typography
          variant="h4"
          sx={{ fontFamily: 'Roboto Slab, serif', fontWeight: 700, color: colors.blue, mb: 0.5 }}
        >
          Submission Intake
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload policy applications, change requests, and supporting documents
        </Typography>

        {/* Upload Card */}
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 3,
            border: `1px solid ${alpha(colors.blue, 0.15)}`,
            borderLeft: `4px solid ${colors.blue}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontFamily: 'Roboto Slab, serif', color: colors.blue, mb: 2.5 }}
            >
              Upload Document
            </Typography>

            {/* IDLE state */}
            {uploadState === 'idle' && (
              <>
                <Box
                  onDrop={handleDrop}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    border: `2px dashed ${isDragOver ? colors.blue : alpha(colors.blue, 0.3)}`,
                    borderRadius: 2,
                    p: 5,
                    textAlign: 'center',
                    bgcolor: isDragOver ? alpha(colors.blue, 0.05) : alpha(colors.paleAqua, 0.5),
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    mb: 2.5,
                    '&:hover': { bgcolor: alpha(colors.blue, 0.04), borderColor: colors.blue },
                  }}
                >
                  <CloudUpload sx={{ fontSize: 48, color: alpha(colors.blue, 0.5), mb: 2 }} />
                  <Typography variant="h6" fontWeight={600} color={colors.blue} sx={{ mb: 0.5 }}>
                    Drop your document here
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                    or click to browse files
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {acceptedTypes.map(type => (
                      <Chip
                        key={type}
                        label={type}
                        size="small"
                        sx={{
                          bgcolor: alpha(colors.lightBlue, 0.08),
                          color: '#000000',
                          border: `1px solid ${alpha(colors.lightBlue, 0.25)}`,
                          fontWeight: 600,
                          fontSize: '0.7rem',
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  startIcon={<FolderOpen />}
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ bgcolor: colors.blue, '&:hover': { bgcolor: alpha(colors.blue, 0.85) } }}
                >
                  Browse Files
                </Button>
              </>
            )}

            {/* UPLOADING state */}
            {uploadState === 'uploading' && (
              <Box sx={{ p: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Description sx={{ color: colors.blue }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>{selectedFile?.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedFile ? `${(selectedFile.size / 1024).toFixed(0)} KB` : ''}
                    </Typography>
                  </Box>
                  <Chip
                    label="Uploading..."
                    size="small"
                    sx={{
                      bgcolor: alpha(colors.lightBlue, 0.1),
                      color: '#000000',
                      border: `1px solid ${alpha(colors.lightBlue, 0.3)}`,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha(colors.blue, 0.1),
                    '& .MuiLinearProgress-bar': { background: colors.blue, borderRadius: 4 },
                  }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  <Box component="span" sx={{ fontWeight: 700, color: '#000000' }}>{uploadProgress}%</Box> uploaded
                </Typography>
              </Box>
            )}

            {/* PROCESSING state */}
            {uploadState === 'processing' && (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Schedule sx={{ fontSize: 48, color: colors.orange, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} color={colors.orange} sx={{ mb: 1 }}>
                  Processing Document...
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                  Validating and extracting document data
                </Typography>
                <LinearProgress
                  sx={{
                    borderRadius: 4,
                    bgcolor: alpha(colors.orange, 0.1),
                    '& .MuiLinearProgress-bar': { background: colors.orange },
                  }}
                />
              </Box>
            )}

            {/* COMPLETE state */}
            {uploadState === 'complete' && (
              <Box>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(colors.green, 0.06),
                    border: `1px solid ${alpha(colors.green, 0.2)}`,
                    mb: 2.5,
                    textAlign: 'center',
                  }}
                >
                  <CheckCircle sx={{ fontSize: 48, color: colors.green, mb: 1.5 }} />
                  <Typography variant="h6" fontWeight={700} color={colors.green} sx={{ mb: 0.5 }}>
                    Submission Received
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Your document has been submitted successfully
                  </Typography>
                  <Chip
                    label={`Submission ID: ${submissionId}`}
                    sx={{
                      bgcolor: '#FFFFFF',
                      color: '#000000',
                      border: `1px solid ${alpha(colors.green, 0.3)}`,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                    }}
                  />
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 2,
                    border: `1px solid ${alpha(colors.blue, 0.15)}`,
                    mb: 2.5,
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    sx={{ textTransform: 'uppercase', letterSpacing: 0.8, display: 'block', mb: 1 }}
                  >
                    Document Details
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>{selectedFile?.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Submitted on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    {selectedFile ? ` · ${(selectedFile.size / 1024).toFixed(0)} KB` : ''}
                  </Typography>
                </Paper>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  sx={{ borderColor: colors.blue, color: colors.blue }}
                >
                  Submit Another Document
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card
          elevation={0}
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(colors.lightBlue, 0.15)}`,
            borderLeft: `4px solid ${colors.lightBlue}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ fontFamily: 'Roboto Slab, serif', color: colors.blue, mb: 2.5 }}
            >
              Recent Submissions
            </Typography>
            {recentSubmissions.map((sub, idx) => (
              <React.Fragment key={sub.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', py: 1.5 }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{sub.type}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {sub.client} · {sub.date}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', fontFamily: 'monospace', mt: 0.25, fontSize: '0.7rem' }}
                    >
                      {sub.id}
                    </Typography>
                  </Box>
                  <Chip
                    label={sub.status}
                    size="small"
                    sx={{
                      bgcolor: sub.status === 'Approved' ? alpha(colors.green, 0.1) : alpha(colors.orange, 0.1),
                      color: '#000000',
                      border: `1px solid ${sub.status === 'Approved' ? alpha(colors.green, 0.3) : alpha(colors.orange, 0.3)}`,
                      fontWeight: 600,
                    }}
                  />
                </Box>
                {idx < recentSubmissions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SubmissionIntakeScreen;
