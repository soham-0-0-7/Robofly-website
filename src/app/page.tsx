import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/home'); // Automatically redirect to /home
}
