
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { Farmer } from "@/models/Farmer";
import { Officer } from "@/models/Officer";
import dbConnect from "@/lib/mongoose";
import { generateToken } from "@/lib/auth";
import { apiError, apiResponse, validateRequired } from "@/lib/apiHelpers";

export async function POST(req: NextRequest) {
	try {
		await dbConnect();
		
		const body = await req.json();
		const { firstName, lastName, email, password, confirmPassword, userType, phone, farmData } = body;

		// Validate required fields
		const validationError = validateRequired(body, ['firstName', 'lastName', 'email', 'password', 'confirmPassword']);
		if (validationError) {
			return apiError(validationError, 400);
		}

		// Validate password match
		if (password !== confirmPassword) {
			return apiError("Passwords do not match", 400);
		}

		// Validate password strength
		if (password.length < 6) {
			return apiError("Password must be at least 6 characters long", 400);
		}

		// Additional validation for farmers
		if (userType === 'farmer' && farmData) {
			const { farmLocation, farmSize, farmingExperience, governmentId } = farmData;
			if (!farmLocation?.province || !farmLocation?.district || !farmLocation?.address) {
				return apiError("Please provide complete farm location details", 400);
			}
			if (!farmSize || farmSize <= 0) {
				return apiError("Please provide a valid farm size", 400);
			}
			if (!farmingExperience || farmingExperience < 0) {
				return apiError("Please provide farming experience", 400);
			}
			if (!governmentId?.trim()) {
				return apiError("Please provide a valid government ID", 400);
			}
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return apiError("User with this email already exists", 409);
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Create user
		const user = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			userType: userType || 'farmer',
			phone,
			isActive: true
		});

		await user.save();

		// Create user-specific profile
		if (userType === 'farmer') {
			const farmer = new Farmer({
				userId: user._id,
				farmLocation: farmData ? {
					address: farmData.farmLocation.address,
					district: farmData.farmLocation.district,
					province: farmData.farmLocation.province
				} : {
					address: '',
					district: '',
					province: ''
				},
				farmSize: farmData?.farmSize || 0,
				cropTypes: [],
				farmingExperience: farmData?.farmingExperience || 0,
				governmentId: farmData?.governmentId || '',
				isVerified: false
			});
			await farmer.save();
		} else if (userType === 'officer') {
			const officer = new Officer({
				userId: user._id,
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
					email: email,
					mobilePhone: phone || '',
					officePhone: ''
				},
				isActive: true
			});
			await officer.save();
		}

		// Generate JWT token
		const token = generateToken({
			userId: (user._id as string).toString(),
			email: user.email,
			userType: user.userType as 'farmer' | 'officer'
		});

		// Create response with token in cookie
		const response = apiResponse({
			message: "Registration successful",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userType: user.userType
			},
			token
		}, 201);

		// Set HTTP-only cookie
		response.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
		});

		return response;

	} catch (error: unknown) {
		console.error('Signup error:', error);
		return apiError("Registration failed. Please try again.", 500);
	}
}
