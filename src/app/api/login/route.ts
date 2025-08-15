
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import dbConnect from "@/lib/mongoose";

export async function POST(req: NextRequest) {
	await dbConnect(); // Ensure DB connection
	const { email, password } = await req.json();
	if (!email || !password) {
		return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
		}
		// You can add JWT or session logic here
		return NextResponse.json({ message: "Login successful.", user: { firstName: user.firstName, lastName: user.lastName, email: user.email } });
	} catch (error: unknown) {
		console.error('Login error:', error);
		return NextResponse.json({ error: "Server error." }, { status: 500 });
	}
}
