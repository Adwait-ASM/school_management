import { NextRequest, NextResponse } from 'next/server';
import { getConnection, initializeDatabase } from '@/lib/db';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// Initialize database on first load
let dbInitialized = false;

async function ensureDbInitialized() {
  if (!dbInitialized) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

// GET - Fetch all schools
export async function GET() {
  try {
    await ensureDbInitialized();
    const connection = await getConnection();
    
    const [rows] = await connection.execute(
      'SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY created_at DESC'
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// POST - Add new school
export async function POST(request: NextRequest) {
  try {
    await ensureDbInitialized();
    const formData = await request.formData();
    
    // Extract form data
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageFile = formData.get('image') as File;
    
    // Validation
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Contact validation (should be a number)
    if (isNaN(Number(contact))) {
      return NextResponse.json(
        { success: false, error: 'Contact must be a valid number' },
        { status: 400 }
      );
    }

    let imagePath = null;

    // Handle image upload if provided
    if (imageFile && imageFile.size > 0) {
      // Create schoolImages directory if it doesn't exist
      const uploadsDir = join(process.cwd(), 'public', 'schoolImages');
      try {
        await mkdir(uploadsDir, { recursive: true });
      } catch (error) {
        // Directory might already exist, continue
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `${timestamp}-${imageFile.name}`;
      const filePath = join(uploadsDir, fileName);

      // Convert file to buffer and save
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filePath, buffer);

      imagePath = `/schoolImages/${fileName}`;
    }
    
    // Insert into database
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imagePath, email_id]
    );
    
    connection.release();
    
    return NextResponse.json({
      success: true,
      message: 'School added successfully',
      data: { id: (result as any).insertId }
    });
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add school' },
      { status: 500 }
    );
  }
}
