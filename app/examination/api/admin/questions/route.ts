// app/examination/api/admin/questions/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/db";
import Question from "@/models/Question";
import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { extension } from "mime-types"; // ← use extension(), not lookup()
import { Buffer } from "buffer";

export async function GET() {
  await connectDB();
  const questions = await Question.find().sort({ createdAt: -1 });
  return NextResponse.json(questions);
}

// const uploadImage = async (
//   base64String: string | null | undefined,
// ): Promise<string | null> => {
//   if (!base64String || !base64String.startsWith("data:image")) {
//     return null;
//   }

//   // Extract mime type from "data:image/png;base64,..."
//   const mimeMatch = base64String.match(/^data:(image\/[a-zA-Z+]+);base64,/);
//   if (!mimeMatch) {
//     console.error("Could not parse mime type from base64 string");
//     return null;
//   }

//   const mimeType = mimeMatch[1]; // e.g. "image/png"
//   const base64Data = base64String.split(";base64,").pop();

//   if (!base64Data) {
//     console.error("Invalid base64 string format");
//     return null;
//   }

//   try {
//     const buffer = Buffer.from(base64Data, "base64");

//     // Get file extension from mime type — extension() returns "png", "jpeg", etc.
//     const ext = extension(mimeType) || "png";
//     const filename = `logos/${uuidv4()}.${ext}`;

//     const s3 = new S3Client({
//       region: process.env.AWS_REGION,
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//       },
//     });

//     await s3.send(
//       new PutObjectCommand({
//         Bucket: process.env.AWS_BUCKET_NAME!,
//         Key: filename,
//         Body: buffer,
//         ContentType: mimeType,
//       }),
//     );

//     return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
//   } catch (error) {
//     console.error("Error uploading base64 image to S3:", error);
//     return null;
//   }
// };

export async function POST(req: Request) {
  await connectDB();

  try {
    const { text, image, options } = await req.json();

    // Directly store base64 (NO S3)
    const newQuestionData = {
      text: text || "",
      image: image || "", // store base64 directly
      options: (options || []).map((opt: any) => ({
        text: opt.text,
        isCorrect: opt.isCorrect,
        image: opt.image || "", // store base64 directly
      })),
    };

    console.log("Saving BASE64 data:", {
      image: newQuestionData.image?.slice(0, 50),
      optionImages: newQuestionData.options.map((o:any) =>
        o.image?.slice(0, 50),
      ),
    });

    const question = await Question.create(newQuestionData);

    return NextResponse.json(question, { status: 201 });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectDB();
  const deletedQuestion = await Question.findByIdAndDelete(id);
  if (!deletedQuestion) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Question deleted successfully" });
}