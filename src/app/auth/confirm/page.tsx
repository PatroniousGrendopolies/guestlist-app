'use client';
// Account confirmation landing page
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ConfirmPage() {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState<'verifying' | 'redirecting'>('verifying');

  useEffect(() => {
    async function run() {
      await supabase.auth.getSession();
      setStatus('redirecting');
      const { data: { session } } = await supabase.auth.getSession();
      router.replace(session ? '/dashboard' : '/auth/login');
    }
    run();
  }, [router, supabase]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-center">
        {status === 'verifying' ? 'Confirming your account…' : 'Redirecting…'}
      </p>
    </div>
  );
}
