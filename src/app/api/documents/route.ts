import { NextRequest } from "next/server";
import { Document } from "@/models/Document";
import dbConnect from "@/lib/mongoose";
import { withAuth, apiError, apiResponse, parsePaginationParams, buildFilterQuery } from "@/lib/apiHelpers";
import { saveFile } from "@/lib/fileUtils";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const { page, limit, skip } = parsePaginationParams(searchParams);
    const filter = buildFilterQuery(searchParams, ['category', 'type', 'status', 'visibility']);

    // Filter by visibility and user permissions
    if (user.userType === 'farmer') {
      filter.$or = [
        { visibility: 'public' },
        { uploadedBy: user.userId },
        { 'relatedTo.entityType': 'farmer', 'relatedTo.entityId': user.userId }
      ];
    } else if (user.userType === 'officer') {
      // Officers can see all documents
    }

    const search = searchParams.get('search');
    if (search) {
      filter.$text = { $search: search };
    }

    const documents = await Document.find(filter)
      .populate('uploadedBy', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Document.countDocuments(filter);

    return apiResponse({
      documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Documents fetch error:', error);
    return apiError("Failed to fetch documents", 500);
  }
});

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const type = formData.get('type') as string;
    const visibility = formData.get('visibility') as string || 'private';

    if (!file || !title || !description || !category || !type) {
      return apiError("Missing required fields", 400);
    }

    // Save file
    const uploadResult = await saveFile(file, 'documents');

    // Create document record
    const document = new Document({
      title,
      description,
      category,
      type,
      fileUrl: uploadResult.fileUrl,
      fileName: uploadResult.fileName,
      fileSize: uploadResult.fileSize,
      mimeType: uploadResult.mimeType,
      uploadedBy: user.userId,
      visibility,
      tags: []
    });

    await document.save();

    return apiResponse({
      message: "Document uploaded successfully",
      document
    }, 201);

  } catch (error) {
    console.error('Document upload error:', error);
    return apiError("Failed to upload document", 500);
  }
});
