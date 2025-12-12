// app/api/auth/check-admin/route.js
import { checkAdmin } from "@/app/lib/checkAdmin";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const isAdmin = await checkAdmin();
    return NextResponse.json({ success: true, isAdmin });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json(
      { success: false, isAdmin: false },
      { status: 500 }
    );
  }
}