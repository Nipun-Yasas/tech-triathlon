
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function POST(req: NextRequest) {
	await dbConnect(); // Ensure DB connection
	const { firstName, lastName, email, password, confirmPassword } = await req.json();

	if (!firstName || !lastName || !email || !password || !confirmPassword) {
		return NextResponse.json({ error: "All fields are required." }, { status: 400 });
	}
	if (password !== confirmPassword) {
		return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
	}
	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json({ error: "Email already registered." }, { status: 409 });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = new User({ firstName, lastName, email, password: hashedPassword });
		await user.save();
		return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
	} catch (error: unknown) {
		console.error('Signup error:', error);
		const errorMessage = error instanceof Error ? error.message : "Server error.";
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
