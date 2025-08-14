'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Badge,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Alert,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  FormControl,
  Select,
  InputLabel,
  TextareaAutosize,
} from '@mui/material';
import {
  Assignment,
  Description,
  CheckCircle,
  Cancel,
  Pending,
  Visibility,
  Download,
  Upload,
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Print,
  Share,
  Archive,
  Restore,
  Warning,
  Info,
  Error,
  CloudDownload,
  AttachFile,
  Schedule,
  Person,
  LocationOn,
  DateRange,
  ExpandMore,
  PhotoCamera,
  PictureAsPdf,
  InsertDriveFile,
  Image,
  Close,
  Approve,
  Reject,
  Flag,
  Comment,
  History,
  Notifications,
} from '@mui/icons-material';

interface Document {
  id: string;
  title: string;
  type: 'Land Certificate' | 'Identity Proof' | 'Bank Statement' | 'Crop Insurance' | 'Other';
  submittedBy: string;
  farmerAvatar: string;
  submissionDate: string;
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'Needs Correction' | 'Under Review';
  priority: 'High' | 'Medium' | 'Low';
  fileSize: string;
  fileFormat: string;
  description: string;
  comments: Comment[];
  approvalHistory: ApprovalStep[];
  tags: string[];
  expiryDate?: string;
  verificationScore: number;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  message: string;
  timestamp: string;
  type: 'comment' | 'system' | 'approval' | 'rejection';
}

interface ApprovalStep {
  step: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  officer?: string;
  notes?: string;
}

const mockDocuments: Document[] = [
  {
    id: 'DOC001',
    title: 'Land Ownership Certificate',
    type: 'Land Certificate',
    submittedBy: 'John Doe',
    farmerAvatar: '/api/placeholder/40/40',
    submissionDate: '2025-08-14T09:30:00',
    status: 'Pending Review',
    priority: 'High',
    fileSize: '2.4 MB',
    fileFormat: 'PDF',
    description: 'Official land ownership certificate for Farm Plot A-123',
    verificationScore: 85,
    expiryDate: '2026-08-14',
    tags: ['ownership', 'certificate', 'verified'],
    comments: [
      {
        id: 'C001',
        author: 'System',
        avatar: '',
        message: 'Document uploaded and queued for review',
        timestamp: '2025-08-14T09:30:00',
        type: 'system'
      }
    ],
    approvalHistory: [
      { step: 'Document Upload', status: 'completed', timestamp: '2025-08-14T09:30:00' },
      { step: 'Initial Review', status: 'current' },
      { step: 'Technical Verification', status: 'pending' },
      { step: 'Final Approval', status: 'pending' }
    ]
  },
  {
    id: 'DOC002',
    title: 'Aadhaar Card Copy',
    type: 'Identity Proof',
    submittedBy: 'Sarah Wilson',
    farmerAvatar: '/api/placeholder/40/40',
    submissionDate: '2025-08-13T14:15:00',
    status: 'Approved',
    priority: 'Medium',
    fileSize: '1.8 MB',
    fileFormat: 'JPG',
    description: 'Identity verification document - Aadhaar card',
    verificationScore: 92,
    tags: ['identity', 'aadhaar', 'verified'],
    comments: [
      {
        id: 'C002',
        author: 'Officer Kumar',
        avatar: '/api/placeholder/32/32',
        message: 'Document verified successfully. Clear and readable.',
        timestamp: '2025-08-13T16:20:00',
        type: 'approval'
      }
    ],
    approvalHistory: [
      { step: 'Document Upload', status: 'completed', timestamp: '2025-08-13T14:15:00' },
      { step: 'Initial Review', status: 'completed', timestamp: '2025-08-13T15:00:00', officer: 'Officer Kumar' },
      { step: 'Technical Verification', status: 'completed', timestamp: '2025-08-13T16:00:00' },
      { step: 'Final Approval', status: 'completed', timestamp: '2025-08-13T16:20:00', officer: 'Officer Kumar' }
    ]
  },
  {
    id: 'DOC003',
    title: 'Bank Account Statement',
    type: 'Bank Statement',
    submittedBy: 'Mike Johnson',
    farmerAvatar: '/api/placeholder/40/40',
    submissionDate: '2025-08-12T11:45:00',
    status: 'Needs Correction',
    priority: 'Medium',
    fileSize: '3.2 MB',
    fileFormat: 'PDF',
    description: 'Bank statement for subsidy verification',
    verificationScore: 45,
    tags: ['bank', 'statement', 'correction-needed'],
    comments: [
      {
        id: 'C003',
        author: 'Officer Patel',
        avatar: '/api/placeholder/32/32',
        message: 'Document quality is poor. Please resubmit with better resolution.',
        timestamp: '2025-08-12T16:30:00',
        type: 'rejection'
      }
    ],
    approvalHistory: [
      { step: 'Document Upload', status: 'completed', timestamp: '2025-08-12T11:45:00' },
      { step: 'Initial Review', status: 'completed', timestamp: '2025-08-12T15:00:00', officer: 'Officer Patel', notes: 'Quality issues detected' },
      { step: 'Technical Verification', status: 'pending' },
      { step: 'Final Approval', status: 'pending' }
    ]
  }
];

export default function DocumentsPage() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request-correction'>('approve');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'error';
      case 'Needs Correction': return 'warning';
      case 'Under Review': return 'info';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      default: return 'default';
    }
  };

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return <PictureAsPdf sx={{ color: '#d32f2f' }} />;
      case 'jpg':
      case 'jpeg':
      case 'png': return <Image sx={{ color: '#1976d2' }} />;
      default: return <InsertDriveFile sx={{ color: '#666' }} />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
    setDialogOpen(true);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, docId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocId(docId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDocId(null);
  };

  const handleAction = (type: 'approve' | 'reject' | 'request-correction') => {
    setActionType(type);
    setActionDialogOpen(true);
    handleMenuClose();
  };

  const handleSubmitAction = () => {
    console.log(`${actionType} document ${selectedDocId} with comment: ${commentText}`);
    setActionDialogOpen(false);
    setCommentText('');
  };

  const pendingCount = documents.filter(d => d.status === 'Pending Review').length;
  const approvedToday = documents.filter(d => d.status === 'Approved' && 
    new Date(d.submissionDate).toDateString() === new Date().toDateString()).length;
  const needsAttention = documents.filter(d => d.status === 'Needs Correction' || d.priority === 'High').length;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600, color: '#2E7D32' }}>
          📋 Documents Review & Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review, approve, and manage farmer submitted documents
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Pending Review
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#F57C00' }}>
                    {pendingCount}
                  </Typography>
                </Box>
                <Badge badgeContent={pendingCount} color="warning">
                  <Pending sx={{ fontSize: 40, color: '#F57C00' }} />
                </Badge>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Approved Today
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    {approvedToday}
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 40, color: '#2E7D32' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Needs Attention
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#D32F2F' }}>
                    {needsAttention}
                  </Typography>
                </Box>
                <Badge badgeContent={needsAttention} color="error">
                  <Warning sx={{ fontSize: 40, color: '#D32F2F' }} />
                </Badge>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Documents
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#1976D2' }}>
                    {documents.length}
                  </Typography>
                </Box>
                <Assignment sx={{ fontSize: 40, color: '#1976D2' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts */}
      {needsAttention > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <strong>{needsAttention}</strong> documents require immediate attention. High priority items and correction requests pending.
        </Alert>
      )}

      {/* Main Content */}
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="All Documents" />
          <Tab label="Pending Review" />
          <Tab label="Approved" />
          <Tab label="Needs Correction" />
        </Tabs>

        {/* Search and Filter */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status Filter</InputLabel>
            <Select
              value={filterStatus}
              label="Status Filter"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Pending Review">Pending Review</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Needs Correction">Needs Correction</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<FilterList />}
          >
            More Filters
          </Button>
        </Box>

        {/* Documents Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Submitted By</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Verification Score</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {getFileIcon(document.fileFormat)}
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {document.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {document.fileFormat} • {document.fileSize}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={document.farmerAvatar} sx={{ width: 32, height: 32 }} />
                      <Typography variant="body2" fontWeight={500}>
                        {document.submittedBy}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={document.type} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={document.status}
                      size="small"
                      color={getStatusColor(document.status) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={document.priority}
                      size="small"
                      color={getPriorityColor(document.priority) as any}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={document.verificationScore}
                        sx={{ width: 60, height: 6, borderRadius: 3 }}
                        color={document.verificationScore > 80 ? 'success' : 
                               document.verificationScore > 60 ? 'warning' : 'error'}
                      />
                      <Typography variant="caption">
                        {document.verificationScore}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {new Date(document.submissionDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleViewDocument(document)}
                        sx={{ color: '#1976D2' }}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleMenuOpen(e, document.id)}
                        sx={{ color: '#666' }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Document Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        {selectedDocument && (
          <>
            <DialogTitle sx={{ 
              background: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Box>
                <Typography variant="h6">{selectedDocument.title}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>
                  Document ID: {selectedDocument.id}
                </Typography>
              </Box>
              <IconButton onClick={() => setDialogOpen(false)} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent sx={{ p: 0 }}>
              <Grid container sx={{ height: '100%' }}>
                {/* Left Panel - Document Preview */}
                <Grid item xs={12} md={7} sx={{ borderRight: '1px solid #e0e0e0' }}>
                  <Box sx={{ p: 3 }}>
                    <Box sx={{ 
                      height: 500, 
                      bgcolor: '#f5f5f5', 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}>
                      <Box sx={{ textAlign: 'center' }}>
                        {getFileIcon(selectedDocument.fileFormat)}
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                          Document Preview
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                          {selectedDocument.fileFormat} • {selectedDocument.fileSize}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                          <Button variant="contained" startIcon={<CloudDownload />}>
                            Download
                          </Button>
                          <Button variant="outlined" startIcon={<Print />}>
                            Print
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>

                {/* Right Panel - Document Details */}
                <Grid item xs={12} md={5}>
                  <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
                    {/* Document Info */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>Document Information</Typography>
                      <List dense>
                        <ListItem>
                          <ListItemIcon><Person /></ListItemIcon>
                          <ListItemText 
                            primary="Submitted By" 
                            secondary={selectedDocument.submittedBy}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><DateRange /></ListItemIcon>
                          <ListItemText 
                            primary="Submission Date" 
                            secondary={new Date(selectedDocument.submissionDate).toLocaleString()}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon><Assignment /></ListItemIcon>
                          <ListItemText 
                            primary="Document Type" 
                            secondary={selectedDocument.type}
                          />
                        </ListItem>
                        {selectedDocument.expiryDate && (
                          <ListItem>
                            <ListItemIcon><Schedule /></ListItemIcon>
                            <ListItemText 
                              primary="Expiry Date" 
                              secondary={selectedDocument.expiryDate}
                            />
                          </ListItem>
                        )}
                      </List>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Status and Priority */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>Status & Priority</Typography>
                      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <Chip 
                          label={selectedDocument.status}
                          color={getStatusColor(selectedDocument.status) as any}
                        />
                        <Chip 
                          label={`${selectedDocument.priority} Priority`}
                          color={getPriorityColor(selectedDocument.priority) as any}
                        />
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          Verification Score: {selectedDocument.verificationScore}%
                        </Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={selectedDocument.verificationScore}
                          sx={{ height: 8, borderRadius: 4 }}
                          color={selectedDocument.verificationScore > 80 ? 'success' : 
                                 selectedDocument.verificationScore > 60 ? 'warning' : 'error'}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Description */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>Description</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedDocument.description}
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Approval Process */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>Approval Process</Typography>
                      <Stepper orientation="vertical">
                        {selectedDocument.approvalHistory.map((step, index) => (
                          <Step key={index} active={step.status === 'current'} completed={step.status === 'completed'}>
                            <StepLabel>
                              {step.step}
                              {step.timestamp && (
                                <Typography variant="caption" display="block">
                                  {new Date(step.timestamp).toLocaleString()}
                                </Typography>
                              )}
                            </StepLabel>
                            {step.notes && (
                              <StepContent>
                                <Typography variant="body2" color="text.secondary">
                                  {step.notes}
                                </Typography>
                              </StepContent>
                            )}
                          </Step>
                        ))}
                      </Stepper>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Comments */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>Comments & History</Typography>
                      <List>
                        {selectedDocument.comments.map((comment) => (
                          <ListItem key={comment.id} sx={{ px: 0 }}>
                            <ListItemIcon>
                              {comment.avatar ? (
                                <Avatar src={comment.avatar} sx={{ width: 32, height: 32 }} />
                              ) : (
                                <Avatar sx={{ width: 32, height: 32, bgcolor: '#4CAF50' }}>
                                  S
                                </Avatar>
                              )}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="body2" fontWeight={600}>
                                    {comment.author}
                                  </Typography>
                                  <Chip 
                                    label={comment.type} 
                                    size="small" 
                                    variant="outlined"
                                    color={comment.type === 'approval' ? 'success' : 
                                           comment.type === 'rejection' ? 'error' : 'default'}
                                  />
                                </Box>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    {comment.message}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {new Date(comment.timestamp).toLocaleString()}
                                  </Typography>
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, borderTop: '1px solid #e0e0e0' }}>
              <Button onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              {selectedDocument.status === 'Pending Review' && (
                <>
                  <Button
                    variant="outlined"
                    color="warning"
                    startIcon={<Edit />}
                    onClick={() => handleAction('request-correction')}
                  >
                    Request Correction
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={() => handleAction('reject')}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleAction('approve')}
                  >
                    Approve
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleViewDocument(documents.find(d => d.id === selectedDocId)!)}>
          <Visibility sx={{ mr: 1 }} /> View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Download sx={{ mr: 1 }} /> Download
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Share sx={{ mr: 1 }} /> Share
        </MenuItem>
        <Divider />
        {selectedDocId && documents.find(d => d.id === selectedDocId)?.status === 'Pending Review' && (
          <>
            <MenuItem onClick={() => handleAction('approve')}>
              <CheckCircle sx={{ mr: 1, color: 'success.main' }} /> Approve
            </MenuItem>
            <MenuItem onClick={() => handleAction('reject')}>
              <Cancel sx={{ mr: 1, color: 'error.main' }} /> Reject
            </MenuItem>
            <MenuItem onClick={() => handleAction('request-correction')}>
              <Edit sx={{ mr: 1, color: 'warning.main' }} /> Request Correction
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Action Dialog */}
      <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {actionType === 'approve' ? 'Approve Document' :
           actionType === 'reject' ? 'Reject Document' : 'Request Correction'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {actionType === 'approve' ? 'Please provide approval comments (optional):' :
             actionType === 'reject' ? 'Please provide reason for rejection:' : 
             'Please specify what corrections are needed:'}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder={
              actionType === 'approve' ? 'Document verified and approved...' :
              actionType === 'reject' ? 'Reason for rejection...' : 
              'Corrections needed...'
            }
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color={actionType === 'approve' ? 'success' : actionType === 'reject' ? 'error' : 'warning'}
            onClick={handleSubmitAction}
          >
            {actionType === 'approve' ? 'Approve' :
             actionType === 'reject' ? 'Reject' : 'Request Correction'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
