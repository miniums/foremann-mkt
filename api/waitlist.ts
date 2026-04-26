import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body ?? {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  const { error } = await supabase
    .from('waitlist')
    .insert({ email: (email as string).toLowerCase().trim() });

  if (error) {
    if (error.code === '23505') return res.status(200).json({ ok: true, already: true });
    console.error('Waitlist insert error:', error.message);
    return res.status(500).json({ error: 'Server error' });
  }

  return res.status(200).json({ ok: true });
}
