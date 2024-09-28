import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';

const CSV_FILE_PATH = path.join(process.cwd(), 'survey-responses.csv');

export async function GET() {
  try {
    const fileContent = await fs.readFile(CSV_FILE_PATH, 'utf-8');
    
    const records = parse(fileContent, {
      columns: true, // This tells csv-parse to use the first row as headers
      skip_empty_lines: true
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error('Error reading survey responses:', error);
    return NextResponse.json({ error: 'Failed to read survey responses' }, { status: 500 });
  }
}