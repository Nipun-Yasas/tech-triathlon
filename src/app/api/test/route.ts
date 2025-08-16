// Test endpoint to check database state and user creation
import { NextRequest } from "next/server";
import { User } from "@/models/User";
import { Officer } from "@/models/Officer";
import dbConnect from "@/lib/mongoose";
import { apiResponse } from "@/lib/apiHelpers";

export async function GET() {
  try {
    await dbConnect();
    
    const users = await User.find({}).limit(10);
    const officers = await Officer.find({}).limit(10);
    
    return apiResponse({
      message: "Database status",
      userCount: await User.countDocuments(),
      officerCount: await Officer.countDocuments(),
      users: users.map(u => ({
        id: u._id,
        email: u.email,
        userType: u.userType,
        createdAt: u.createdAt
      })),
      officers: officers.map(o => ({
        id: o._id,
        userId: o.userId,
        employeeId: o.employeeId,
        department: o.department,
        createdAt: o.createdAt
      }))
    });
    
  } catch (error: unknown) {
    console.error('Database check error:', error);
    return apiResponse({
      error: "Database check failed",
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    
    const body = await req.json();
    const { action } = body;
    
    if (action === 'test_officer_creation') {
      const testOfficer = new Officer({
        userId: "507f1f77bcf86cd799439011", // Test ObjectId
        employeeId: '',
        department: 'Agriculture',
        designation: '',
        assignedDistricts: [],
        assignedProvinces: [],
        workLocation: {
          office: '',
          address: '',
          district: '',
          province: ''
        },
        specializations: [],
        qualifications: [],
        experience: 0,
        contactInfo: {
          email: 'test@example.com',
          mobilePhone: '',
          officePhone: ''
        },
        isActive: true
      });
      
      // Validate without saving
      const validationError = testOfficer.validateSync();
      
      return apiResponse({
        message: "Officer validation test",
        validationError: validationError ? validationError.message : null,
        isValid: !validationError
      });
    }
    
    return apiResponse({
      message: "Use action: 'test_officer_creation' to test officer creation"
    });
    
  } catch (error: unknown) {
    console.error('Test error:', error);
    return apiResponse({
      error: "Test failed",
      message: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
}
