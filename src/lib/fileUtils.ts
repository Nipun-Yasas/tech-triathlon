import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  fileName: string;
  filePath: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

export function validateFile(file: File): string | null {
  if (file.size > MAX_FILE_SIZE) {
    return `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`;
  }
  
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'File type not allowed';
  }
  
  return null;
}

export async function saveFile(file: File, subfolder: string = ''): Promise<UploadResult> {
  ensureUploadDir();
  
  const validationError = validateFile(file);
  if (validationError) {
    throw new Error(validationError);
  }
  
  const fileExtension = path.extname(file.name);
  const fileName = `${uuidv4()}${fileExtension}`;
  const uploadPath = subfolder ? path.join(UPLOAD_DIR, subfolder) : UPLOAD_DIR;
  
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  
  const filePath = path.join(uploadPath, fileName);
  const relativePath = subfolder ? path.join('uploads', subfolder, fileName) : path.join('uploads', fileName);
  const fileUrl = `/${relativePath.replace(/\\/g, '/')}`;
  
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  
  return {
    fileName,
    filePath,
    fileUrl,
    fileSize: file.size,
    mimeType: file.type
  };
}

export function deleteFile(filePath: string): boolean {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

export function getFileInfo(filePath: string) {
  try {
    const stats = fs.statSync(filePath);
    return {
      exists: true,
      size: stats.size,
      modified: stats.mtime,
      created: stats.birthtime
    };
  } catch {
    return {
      exists: false,
      size: 0,
      modified: null,
      created: null
    };
  }
}
