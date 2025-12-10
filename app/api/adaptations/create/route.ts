import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Create author
    const author = await prisma.author.create({
      data: {
        name: data.authorName,
        nationality: data.authorNationality || null,
      },
    });

    // Create book
    const book = await prisma.book.create({
      data: {
        title: data.bookTitle,
        publicationYear: data.bookYear ? parseInt(data.bookYear) : null,
        genre: data.bookGenre || null,
        authorId: author.id,
      },
    });

    // Create adaptation
    const adaptation = await prisma.adaptation.create({
      data: {
        title: data.adaptationTitle,
        type: data.adaptationType,
        releaseYear: data.releaseYear ? parseInt(data.releaseYear) : null,
        platform: data.platform || null,
        status: data.status,
        imdbRating: data.imdbRating ? parseFloat(data.imdbRating) : null,
        rtScore: data.rtScore ? parseInt(data.rtScore) : null,
        bookId: book.id,
      },
    });

    return NextResponse.json({ author, book, adaptation }, { status: 201 });
  } catch (error) {
    console.error("Error creating:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}