import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all adaptations
export async function GET() {
  try {
    const adaptations = await prisma.adaptation.findMany({
      include: {
        book: {
          include: {
            author: true,
          },
        },
      },
      orderBy: {
        releaseYear: "desc",
      },
    });
    return NextResponse.json(adaptations);
  } catch (error) {
    console.error("Error fetching adaptations:", error);
    return NextResponse.json(
      { error: "Failed to fetch adaptations" },
      { status: 500 }
    );
  }
}

// POST new adaptation
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const adaptation = await prisma.adaptation.create({
      data: body,
    });
    return NextResponse.json(adaptation, { status: 201 });
  } catch (error) {
    console.error("Error creating adaptation:", error);
    return NextResponse.json(
      { error: "Failed to create adaptation" },
      { status: 500 }
    );
  }
}