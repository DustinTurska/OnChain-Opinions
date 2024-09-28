import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';
import path from 'path';

const CSV_FILE_PATH = path.join(process.cwd(), 'survey-responses.csv');

export async function POST(request: NextRequest) {
  try {
    const { address, answer } = await request.json();
    const timestamp = new Date().toISOString();
    const newRow = `${timestamp},${address},${answer}\n`;

    // Check if file exists, if not, create it with headers
    try {
      await fs.access(CSV_FILE_PATH);
    } catch {
      await fs.writeFile(CSV_FILE_PATH, 'timestamp,address,answer\n');
    }

    // Append the new response
    await fs.appendFile(CSV_FILE_PATH, newRow);

    return NextResponse.json({ message: "Survey response logged successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error logging survey response:", error);
    return NextResponse.json({ error: "Failed to log survey response" }, { status: 500 });
  }
}