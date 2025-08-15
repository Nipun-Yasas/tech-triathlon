
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import dbConnect from "@/lib/mongoose";
import { generateToken } from "@/lib/auth";
import { apiError, apiResponse, validateRequired } from "@/lib/apiHelpers";

export async function POST(req: NextRequest) {
	try {
		await dbConnect();
		
		const body = await req.json();
		const { email, password } = body;

		// Validate required fields
		const validationError = validateRequired(body, ['email', 'password']);
		if (validationError) {
			return apiError(validationError, 400);
		}

		// Find user
		const user = await User.findOne({ email });
		if (!user) {
			return apiError("Invalid credentials", 401);
		}

		// Check if user is active
		if (!user.isActive) {
			return apiError("Account is deactivated. Please contact support.", 401);
		}

		// Verify password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return apiError("Invalid credentials", 401);
		}

		// Generate JWT token
		const token = generateToken({
			userId: (user._id as string).toString(),
			email: user.email,
			userType: user.userType as 'farmer' | 'officer'
		});

		// Update last login
		user.lastLogin = new Date();
		await user.save();

		// Create response
		const response = apiResponse({
			message: "Login successful",
			user: {
				id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				userType: user.userType,
				lastLogin: user.lastLogin
			},
			token
		});

		// Set HTTP-only cookie
		response.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
		});

		return response;

	} catch (error: unknown) {
		console.error('Login error:', error);
		return apiError("Login failed. Please try again.", 500);
	}
}
