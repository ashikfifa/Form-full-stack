import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import About from "@/models/About";

// GET: Fetch all posts
export async function GET() {
  try {
    await connectToDatabase();
    const about = await About.find();
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch about" },
      { status: 500 }
    );
  }
}


// POST: Create a new about
export async function POST(req: Request) {
  try {
    const { title, content, image } = await req.json(); // Include image

    await connectToDatabase();
    const about = await About.create({ title, content, image }); // Pass image
    return NextResponse.json(about, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to create post",
        message: error.message, // Provide detailed error message
        stack: error.stack, // Optional: Include stack trace for debugging
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete a post by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await connectToDatabase();
    const deletedPost = await About.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

// PUT: Update a post by ID
export async function PUT(req: Request) {
  try {
    const { id, title, content, image } = await req.json(); // Include image
    await connectToDatabase();
    const updatedPost = await About.findByIdAndUpdate(
      id,
      { title, content, image }, // Pass image
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
