import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // Delete in order due to foreign key constraints
    await prisma.adaptation.deleteMany();
    await prisma.book.deleteMany();
    await prisma.author.deleteMany();
    
    return NextResponse.json({ message: "Database cleared" });
  } catch (error) {
    console.error("Error clearing:", error);
    return NextResponse.json({ error: "Failed to clear" }, { status: 500 });
  }
}