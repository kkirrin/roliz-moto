import { redirect } from 'next/navigation';

export async function GET() {
  redirect('/routes/pages/news');
} 