// Profile type definitions for the application

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'farmer' | 'officer';
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FarmerProfile {
  _id: string;
  userId: string;
  farmLocation: {
    address: string;
    district: string;
    province: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  farmSize: number; // in acres
  cropTypes: string[];
  farmingExperience: number; // in years
  governmentId: string;
  bankDetails?: {
    accountNumber: string;
    bankName: string;
    branch: string;
  };
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OfficerProfile {
  _id: string;
  userId: string;
  employeeId: string;
  department: string;
  designation: string;
  assignedDistricts: string[];
  assignedProvinces: string[];
  workLocation: {
    office: string;
    address: string;
    district: string;
    province: string;
  };
  specializations: string[];
  qualifications: string[];
  experience: number; // in years
  contactInfo: {
    officePhone: string;
    mobilePhone: string;
    email: string;
  };
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileData {
  user: User;
  profile: FarmerProfile | OfficerProfile | null;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  profileData?: Partial<FarmerProfile> | Partial<OfficerProfile>;
}

// Sri Lankan provinces and districts
export const PROVINCES = [
  'Western',
  'Central',
  'Southern',
  'Northern',
  'Eastern',
  'North Western',
  'North Central',
  'Uva',
  'Sabaragamuwa'
];

export const DISTRICTS = {
  Western: ['Colombo', 'Gampaha', 'Kalutara'],
  Central: ['Kandy', 'Matale', 'Nuwara Eliya'],
  Southern: ['Galle', 'Matara', 'Hambantota'],
  Northern: ['Jaffna', 'Kilinochchi', 'Mannar', 'Vavuniya', 'Mullaitivu'],
  Eastern: ['Batticaloa', 'Ampara', 'Trincomalee'],
  'North Western': ['Kurunegala', 'Puttalam'],
  'North Central': ['Anuradhapura', 'Polonnaruwa'],
  Uva: ['Badulla', 'Monaragala'],
  Sabaragamuwa: ['Ratnapura', 'Kegalle']
};

export const CROP_TYPES = [
  'Rice',
  'Tea',
  'Rubber',
  'Coconut',
  'Spices',
  'Vegetables',
  'Fruits',
  'Cash Crops',
  'Export Crops',
  'Organic Crops'
];

export const DEPARTMENTS = [
  'Agriculture',
  'Livestock',
  'Fisheries',
  'Forestry',
  'Research',
  'Extension Services'
];

export const QUALIFICATIONS = [
  'BSc Agriculture',
  'MSc Agriculture',
  'PhD Agriculture',
  'Diploma in Agriculture',
  'Certificate in Agriculture',
  'BSc Veterinary Science',
  'MSc Veterinary Science',
  'Diploma in Veterinary Science',
  'BSc Forestry',
  'MSc Forestry',
  'BSc Fisheries',
  'MSc Fisheries',
  'Other'
];

export const SPECIALIZATIONS = [
  'Crop Production',
  'Soil Management',
  'Pest Management',
  'Irrigation',
  'Organic Farming',
  'Plant Breeding',
  'Agricultural Extension',
  'Farm Management',
  'Post-Harvest Technology',
  'Agricultural Economics',
  'Livestock Management',
  'Veterinary Services',
  'Fisheries Management',
  'Forest Management',
  'Research & Development'
];
