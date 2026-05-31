import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { carId, author, rating, comment } = await request.json();

    if (!carId || !author?.trim() || !comment?.trim() || !rating) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const r = parseFloat(rating);
    if (isNaN(r) || r < 1 || r > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5.' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        carId: parseInt(carId),
        author: author.trim(),
        rating: r,
        comment: comment.trim(),
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
