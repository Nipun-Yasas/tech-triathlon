'use client';

import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Card, 
  CardContent, 
  LinearProgress,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Alert,
  Fade,
  Grow,
  CircularProgress,
  Backdrop,
  Zoom
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryIcon from '@mui/icons-material/History';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error' | 'pending';
  progress: number;
  category: string;
  uploadDate: Date;
  preview?: string;
  originalFile: File;
}

interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactElement;
  required: boolean;
  acceptedTypes: string[];
  maxSize: number;
  examples: string[];
}

const documentCategories: DocumentCategory[] = [
  {
    id: 'identity',
    name: 'Identity Documents',
    description: 'National ID, Passport, Driving License',
    icon: <VerifiedUserIcon sx={{ fontSize: 40, color: '#4CAF50' }} />,
    required: true,
    acceptedTypes: ['image/*', 'application/pdf'],
    maxSize: 5 * 1024 * 1024, // 5MB
    examples: ['National Identity Card', 'Passport', 'Driving License']
  },
  {
    id: 'address',
    name: 'Address Proof',
    description: 'Utility bills, Bank statements, Rental agreements',
    icon: <DescriptionIcon sx={{ fontSize: 40, color: '#2196F3' }} />,
    required: true,
    acceptedTypes: ['image/*', 'application/pdf'],
    maxSize: 5 * 1024 * 1024,
    examples: ['Electricity Bill', 'Water Bill', 'Bank Statement', 'Rental Agreement']
  },
  {
    id: 'income',
    name: 'Income Documents',
    description: 'Salary slips, Tax returns, Bank statements',
    icon: <PictureAsPdfIcon sx={{ fontSize: 40, color: '#FF9800' }} />,
    required: false,
    acceptedTypes: ['application/pdf', 'image/*'],
    maxSize: 10 * 1024 * 1024, // 10MB
    examples: ['Salary Certificate', 'Tax Returns', 'Business Registration']
  },
  {
    id: 'supporting',
    name: 'Supporting Documents',
    description: 'Additional documents specific to your service',
    icon: <ImageIcon sx={{ fontSize: 40, color: '#9C27B0' }} />,
    required: false,
    acceptedTypes: ['image/*', 'application/pdf', '.doc', '.docx'],
    maxSize: 15 * 1024 * 1024, // 15MB
    examples: ['Medical Certificates', 'Educational Certificates', 'Marriage Certificate']
  }
];

// Beautiful Loading Spinner Component
const BeautifulLoader = () => (
  <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    gap: 4
  }}>
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 600, mb: 1 }}>
        🌱 Preparing Your Secure Portal
      </Typography>
      <Typography variant="body1" sx={{ color: '#7E7E7E' }}>
        Setting up document encryption and validation systems...
      </Typography>
    </Box>
    
    {/* Loading dots */}
    <Box sx={{ display: 'flex', gap: 1 }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: '#4CAF50',
            animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite both`,
            '@keyframes bounce': {
              '0%, 80%, 100%': { 
                transform: 'scale(0.8)',
                opacity: 0.5
              },
              '40%': { 
                transform: 'scale(1.2)',
                opacity: 1
              }
            }
          }}
        />
      ))}
    </Box>
  </Box>
);

// Upload Progress Animation Component
const UploadProgressAnimation = ({ file }: { file: UploadedFile }) => (
  <Box sx={{ position: 'relative', width: '100%' }}>
    <LinearProgress 
      variant="determinate" 
      value={file.progress} 
      sx={{ 
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        '& .MuiLinearProgress-bar': {
          backgroundColor: file.progress < 30 ? '#FF9800' : 
                          file.progress < 70 ? '#2196F3' : '#4CAF50',
          borderRadius: 4,
          background: file.progress < 30 ? 
            'linear-gradient(90deg, #FF9800 0%, #FFB74D 100%)' :
            file.progress < 70 ?
            'linear-gradient(90deg, #2196F3 0%, #64B5F6 100%)' :
            'linear-gradient(90deg, #4CAF50 0%, #81C784 100%)',
          animation: 'shimmer 2s infinite',
          '@keyframes shimmer': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          }
        }
      }}
    />
    <Box sx={{ 
      position: 'absolute', 
      top: -2, 
      left: `${file.progress}%`, 
      transform: 'translateX(-50%)',
      transition: 'all 0.3s ease'
    }}>
      <Box sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        border: '2px solid #4CAF50',
        animation: file.status === 'uploading' ? 'pulse-dot 1s ease-in-out infinite' : 'none',
        '@keyframes pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)' },
          '50%': { transform: 'scale(1.2)', boxShadow: '0 0 0 4px rgba(76, 175, 80, 0)' }
        }
      }} />
    </Box>
  </Box>
);

export default function DocumentUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Simulate initial loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[], category: string) => {
    const categoryInfo = documentCategories.find(cat => cat.id === category);
    if (!categoryInfo) return;

    acceptedFiles.forEach((file) => {
      // Validate file size
      if (file.size > categoryInfo.maxSize) {
        alert(`File ${file.name} is too large. Maximum size is ${categoryInfo.maxSize / (1024 * 1024)}MB`);
        return;
      }

      const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        category: category,
        uploadDate: new Date(),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        originalFile: file,
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload progress with beautiful animation
      const uploadInterval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === fileId) {
            if (f.progress >= 100) {
              clearInterval(uploadInterval);
              return { ...f, status: 'success', progress: 100 };
            }
            return { ...f, progress: Math.min(f.progress + Math.random() * 15 + 5, 100) };
          }
          return f;
        }));
      }, 150);
    });
  }, []);

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <PictureAsPdfIcon sx={{ color: '#E53E3E' }} />;
    if (type.includes('image')) return <ImageIcon sx={{ color: '#4CAF50' }} />;
    return <DescriptionIcon sx={{ color: '#2196F3' }} />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />;
      case 'error': return <ErrorIcon sx={{ color: '#F44336', fontSize: 20 }} />;
      case 'uploading': return (
        <CircularProgress 
          size={20} 
          thickness={5}
          sx={{ 
            color: '#FF9800',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} 
        />
      );
      default: return <PendingIcon sx={{ color: '#9E9E9E', fontSize: 20 }} />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  // Submit all successfully uploaded files to the backend
  const handleSubmitAll = async () => {
    setIsProcessing(true);
    setUploadError(null);
    try {
      // Only submit files that are not already uploaded (status === 'success')
      const filesToSubmit = uploadedFiles.filter(f => f.status === 'success');
      for (const file of filesToSubmit) {
        // Prepare FormData
        const formData = new FormData();
        formData.append('file', file.originalFile);
        formData.append('title', file.name);
        formData.append('description', file.name); // You can customize this
        formData.append('category', file.category);
        formData.append('type', file.type);
        formData.append('visibility', 'private');

        const res = await fetch('/api/documents', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }
      setShowSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setUploadError(err.message || 'Failed to upload documents');
      } else {
        setUploadError('Failed to upload documents');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const CategoryUploadZone = ({ category }: { category: DocumentCategory }) => {
    const categoryFiles = uploadedFiles.filter(f => f.category === category.id);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: (files) => onDrop(files, category.id),
      accept: category.acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
      maxSize: category.maxSize,
      multiple: true
    });

    return (
      <Grow in={true} timeout={800}>
        <Card sx={{ 
          height: '100%',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,249,246,0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: isDragActive ? '3px dashed #4CAF50' : '2px solid rgba(76, 175, 80, 0.2)',
          borderRadius: 4,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(76, 175, 80, 0.15)',
            borderColor: '#4CAF50'
          }
        }}>
          <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Category Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ mr: 2 }}>
                {category.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ color: '#333333', fontWeight: 600, mb: 0.5 }}>
                  {category.name}
                  {category.required && (
                    <Chip 
                      label="Required" 
                      size="small" 
                      sx={{ 
                        ml: 1,
                        backgroundColor: 'rgba(229, 62, 62, 0.1)',
                        color: '#E53E3E',
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }} 
                    />
                  )}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  {category.description}
                </Typography>
              </Box>
            </Box>

            {/* Upload Zone */}
            <Box 
              {...getRootProps()} 
              sx={{ 
                flex: 1,
                border: '2px dashed rgba(126, 126, 126, 0.3)',
                borderRadius: 3,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: isDragActive ? 'rgba(76, 175, 80, 0.05)' : 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  borderColor: '#4CAF50'
                }
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ 
                fontSize: 48, 
                color: isDragActive ? '#4CAF50' : '#A5D6A7', 
                mb: 2,
                animation: isDragActive ? 'bounce 0.6s ease-in-out infinite' : 'none',
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' }
                }
              }} />
              
              {isDragActive ? (
                <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>
                  ✨ Drop files here...
                </Typography>
              ) : (
                <>
                  <Typography variant="h6" sx={{ color: '#333333', mb: 1, fontWeight: 600 }}>
                    Drop files or click to upload
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7E7E7E', mb: 2 }}>
                    Max size: {formatFileSize(category.maxSize)}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {category.examples.slice(0, 2).map((example, index) => (
                      <Chip 
                        key={index}
                        label={example} 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          borderColor: 'rgba(76, 175, 80, 0.3)',
                          color: '#4CAF50',
                          fontSize: '0.7rem'
                        }} 
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>

            {/* Uploaded Files */}
            {categoryFiles.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Divider sx={{ mb: 2, borderColor: 'rgba(76, 175, 80, 0.2)' }} />
                <Typography variant="subtitle2" sx={{ color: '#333333', mb: 2, fontWeight: 600 }}>
                  📁 Uploaded Files ({categoryFiles.length})
                </Typography>
                
                {categoryFiles.map((file) => (
                  <Zoom key={file.id} in={true} timeout={500}>
                    <Paper sx={{ 
                      p: 2, 
                      mb: 1.5,
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(5px)',
                      border: '1px solid rgba(76, 175, 80, 0.1)',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(4px)',
                        boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)'
                      }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                          {getFileIcon(file.type)}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography variant="body2" sx={{ 
                              color: '#333333', 
                              fontWeight: 500,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {file.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#7E7E7E' }}>
                              {formatFileSize(file.size)} • {file.uploadDate.toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(file.status)}
                          {file.preview && (
                            <IconButton 
                              size="small" 
                              onClick={() => setPreviewFile(file)}
                              sx={{ 
                                color: '#4CAF50',
                                '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                              }}
                            >
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton 
                            size="small" 
                            onClick={() => removeFile(file.id)}
                            sx={{ 
                              color: '#F44336',
                              '&:hover': { backgroundColor: 'rgba(244, 67, 54, 0.1)' }
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                      
                      {file.status === 'uploading' && (
                        <Box sx={{ mt: 1.5 }}>
                          <UploadProgressAnimation file={file} />
                          <Typography variant="caption" sx={{ color: '#7E7E7E', mt: 0.5, display: 'block' }}>
                            Uploading... {Math.round(file.progress)}%
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Zoom>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Grow>
    );
  };

  // Show loading screen
  if (isLoading) {
    return (
      <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
        <BeautifulLoader />
      </Box>
    );
  }

  const requiredCategoriesComplete = documentCategories
    .filter(cat => cat.required)
    .every(cat => uploadedFiles.some(file => file.category === cat.id && file.status === 'success'));

  const totalFiles = uploadedFiles.length;
  const completedFiles = uploadedFiles.filter(f => f.status === 'success').length;
  const uploadingFiles = uploadedFiles.filter(f => f.status === 'uploading').length;
  const errorFiles = uploadedFiles.filter(f => f.status === 'error').length;
  
  // Calculate overall progress including partial uploads
  const overallProgress = totalFiles > 0 ? 
    uploadedFiles.reduce((acc, file) => acc + file.progress, 0) / (totalFiles * 100) * 100 : 0;

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
      {/* Processing Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isProcessing}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress 
            size={80} 
            thickness={4}
            sx={{ 
              color: '#4CAF50',
              mb: 3,
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 }
              }
            }} 
          />
          <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 600, mb: 1 }}>
            🔒 Processing Your Documents
          </Typography>
          <Typography variant="body1" sx={{ color: '#7E7E7E' }}>
            Encrypting and validating files securely...
          </Typography>
        </Box>
      </Backdrop>

      {/* Header Section with Glass Effect */}
      <Fade in={true} timeout={1000}>
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(165, 214, 167, 0.05) 100%)',
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            zIndex: -1
          }
        }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ 
            color: '#333333', 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #333333 0%, #4CAF50 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📄 Document Upload Portal
          </Typography>
          <Typography variant="h6" sx={{ color: '#7E7E7E', maxWidth: '800px', mx: 'auto', mb: 3 }}>
            Securely upload and manage your government service documents with our advanced encryption system
          </Typography>
          
          {/* Security Badge */}
          <Paper sx={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 3,
            py: 1.5,
            background: 'rgba(76, 175, 80, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(76, 175, 80, 0.2)',
            borderRadius: 3
          }}>
            <SecurityIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
              🔒 256-bit SSL Encrypted • Government Verified Secure
            </Typography>
          </Paper>
        </Box>
      </Fade>

      {/* Progress Summary */}
      {totalFiles > 0 && (
        <Fade in={true} timeout={1200}>
          <Paper sx={{ 
            p: 4, 
            mb: 4,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(232, 245, 233, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(76, 175, 80, 0.2)',
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(76, 175, 80, 0.1)'
          }}>
            {/* Header with Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 2, 
                  background: 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                }}>
                  <Typography variant="h5" sx={{ color: '#FFFFFF' }}>📊</Typography>
                </Box>
                <Box>
                  <Typography variant="h5" sx={{ color: '#333333', fontWeight: 700, mb: 0.5 }}>
                    Upload Progress
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                    Track your document upload status in real-time
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 700, lineHeight: 1 }}>
                  {Math.round(overallProgress)}%
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  Complete
                </Typography>
              </Box>
            </Box>

            {/* Enhanced Progress Bar */}
            <Box sx={{ mb: 3 }}>
              <LinearProgress 
                variant="determinate" 
                value={overallProgress}
                sx={{ 
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: overallProgress < 30 ? '#FF9800' :
                                   overallProgress < 70 ? '#2196F3' : '#4CAF50',
                    borderRadius: 8,
                    background: overallProgress < 30 ? 
                      'linear-gradient(90deg, #FF9800 0%, #FFB74D 50%, #FFCC80 100%)' :
                      overallProgress < 70 ?
                      'linear-gradient(90deg, #2196F3 0%, #64B5F6 50%, #90CAF9 100%)' :
                      'linear-gradient(90deg, #4CAF50 0%, #81C784 50%, #A5D6A7 100%)',
                    animation: uploadingFiles > 0 ? 'shimmer 2s infinite' : 'none',
                    position: 'relative',
                    '&::after': uploadingFiles > 0 ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                      animation: 'slide 2s infinite',
                    } : {},
                    '@keyframes shimmer': {
                      '0%': { backgroundPosition: '0% 50%' },
                      '50%': { backgroundPosition: '100% 50%' },
                      '100%': { backgroundPosition: '0% 50%' }
                    },
                    '@keyframes slide': {
                      '0%': { transform: 'translateX(-100%)' },
                      '100%': { transform: 'translateX(100%)' }
                    }
                  }
                }}
              />
              
              {/* Progress indicator dot */}
              <Box sx={{ 
                position: 'relative', 
                height: 0,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -8,
                  left: `${overallProgress}%`,
                  transform: 'translateX(-50%)',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '3px solid #4CAF50',
                  boxShadow: '0 2px 8px rgba(76, 175, 80, 0.4)',
                  animation: uploadingFiles > 0 ? 'pulse-dot 1.5s ease-in-out infinite' : 'none',
                  '@keyframes pulse-dot': {
                    '0%, 100%': { 
                      transform: 'translateX(-50%) scale(1)', 
                      boxShadow: '0 2px 8px rgba(76, 175, 80, 0.4)' 
                    },
                    '50%': { 
                      transform: 'translateX(-50%) scale(1.2)', 
                      boxShadow: '0 4px 16px rgba(76, 175, 80, 0.6)' 
                    }
                  }
                }
              }} />
            </Box>
            
            {/* File Status Summary */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: 2,
              mb: 3 
            }}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 2, 
                background: 'rgba(76, 175, 80, 0.1)', 
                borderRadius: 2,
                border: '1px solid rgba(76, 175, 80, 0.2)'
              }}>
                <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                  {completedFiles}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  ✅ Completed
                </Typography>
              </Box>
              
              {uploadingFiles > 0 && (
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 2, 
                  background: 'rgba(33, 150, 243, 0.1)', 
                  borderRadius: 2,
                  border: '1px solid rgba(33, 150, 243, 0.2)',
                  animation: 'pulse-card 2s ease-in-out infinite',
                  '@keyframes pulse-card': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.02)' }
                  }
                }}>
                  <Typography variant="h6" sx={{ color: '#2196F3', fontWeight: 700 }}>
                    {uploadingFiles}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                    ⏳ Uploading
                  </Typography>
                </Box>
              )}
              
              {errorFiles > 0 && (
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 2, 
                  background: 'rgba(244, 67, 54, 0.1)', 
                  borderRadius: 2,
                  border: '1px solid rgba(244, 67, 54, 0.2)'
                }}>
                  <Typography variant="h6" sx={{ color: '#F44336', fontWeight: 700 }}>
                    {errorFiles}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                    ❌ Failed
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ 
                textAlign: 'center', 
                p: 2, 
                background: 'rgba(126, 126, 126, 0.1)', 
                borderRadius: 2,
                border: '1px solid rgba(126, 126, 126, 0.2)'
              }}>
                <Typography variant="h6" sx={{ color: '#7E7E7E', fontWeight: 700 }}>
                  {totalFiles}
                </Typography>
                <Typography variant="body2" sx={{ color: '#7E7E7E' }}>
                  📄 Total Files
                </Typography>
              </Box>
            </Box>
            
            {/* Status Message */}
            {uploadingFiles > 0 ? (
              <Alert 
                severity="info" 
                sx={{ 
                  backgroundColor: 'rgba(33, 150, 243, 0.1)',
                  border: '1px solid rgba(33, 150, 243, 0.3)',
                  '& .MuiAlert-icon': {
                    animation: 'spin 2s linear infinite',
                    '@keyframes spin': {
                      '0%': { transform: 'rotate(0deg)' },
                      '100%': { transform: 'rotate(360deg)' }
                    }
                  }
                }}
              >
                🔄 Uploading {uploadingFiles} file{uploadingFiles > 1 ? 's' : ''}... Please wait while we securely process your documents.
              </Alert>
            ) : requiredCategoriesComplete ? (
              <Alert 
                severity="success" 
                sx={{ 
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  border: '1px solid rgba(76, 175, 80, 0.3)'
                }}
              >
                🎉 All required documents have been uploaded successfully! You&apos;re ready to submit.
              </Alert>
            ) : (
              <Alert 
                severity="warning" 
                sx={{ 
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  border: '1px solid rgba(255, 152, 0, 0.3)'
                }}
              >
                📋 Please upload all required documents (Identity and Address proof) to continue.
              </Alert>
            )}
          </Paper>
        </Fade>
      )}

      {/* Document Categories Grid */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 4,
        mb: 6 
      }}>
        {documentCategories.map((category) => (
          <CategoryUploadZone key={category.id} category={category} />
        ))}
      </Box>

      {/* Action Buttons */}
      <Fade in={true} timeout={1500}>
        <Paper sx={{ 
          p: 4,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,249,246,0.8) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(76, 175, 80, 0.2)',
          borderRadius: 4,
          textAlign: 'center'
        }}>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              disabled={!requiredCategoriesComplete || isProcessing}
              onClick={handleSubmitAll}
              startIcon={<CloudDoneIcon />}
              sx={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                color: '#FFFFFF',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 32px rgba(76, 175, 80, 0.4)'
                },
                '&:disabled': {
                  background: 'rgba(126, 126, 126, 0.3)',
                  color: 'rgba(126, 126, 126, 0.6)'
                }
              }}
            >
              🚀 Submit All Documents
            </Button>
      {/* Show upload error if any */}
      {uploadError && (
        <Box sx={{ color: 'red', textAlign: 'center', mt: 2 }}>{uploadError}</Box>
      )}
            
            <Button
              variant="outlined"
              size="large"
              href="/dashboard"
              sx={{
                borderColor: '#4CAF50',
                color: '#4CAF50',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.05)',
                  borderColor: '#388E3C',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              📋 Save & Continue Later
            </Button>
            
            <Button
              variant="text"
              size="large"
              startIcon={<HistoryIcon />}
              sx={{
                color: '#7E7E7E',
                px: 3,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'rgba(126, 126, 126, 0.05)'
                }
              }}
            >
              📜 View Upload History
            </Button>
          </Box>
        </Paper>
      </Fade>

      {/* File Preview Dialog */}
      <Dialog 
        open={!!previewFile} 
        onClose={() => setPreviewFile(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
          background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(165, 214, 167, 0.05) 100%)'
        }}>
          {previewFile && getFileIcon(previewFile.type)}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {previewFile?.name}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {previewFile?.preview && (
            <Box sx={{ textAlign: 'center', p: 3 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={previewFile.preview} 
                alt={previewFile.name}
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '500px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)}>
        <DialogContent sx={{ 
          textAlign: 'center', 
          p: 4,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(232, 245, 233, 0.9) 100%)',
          backdropFilter: 'blur(20px)'
        }}>
          <Box sx={{
            animation: 'success-bounce 0.6s ease-in-out',
            '@keyframes success-bounce': {
              '0%': { transform: 'scale(0.3)' },
              '50%': { transform: 'scale(1.1)' },
              '100%': { transform: 'scale(1)' }
            }
          }}>
            <CheckCircleIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
          </Box>
          <Typography variant="h4" gutterBottom sx={{ color: '#333333', fontWeight: 700 }}>
            🎉 Documents Submitted!
          </Typography>
          <Typography variant="body1" sx={{ color: '#7E7E7E', mb: 3 }}>
            Your documents have been securely uploaded and are being processed.
            You will receive a confirmation email shortly.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setShowSuccess(false)}
            href="/dashboard"
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
              px: 4,
              py: 1.5
            }}
          >
            Return to Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}