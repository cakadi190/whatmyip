// get-ip.ts
export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Mendapatkan daftar IP dari header 'x-forwarded-for' atau alamat IP asli klien
  const forwardedFor = req.headers['x-forwarded-for']?.toString();
  const ipList = forwardedFor ? forwardedFor.split(',').map(ip => ip.trim()) : [];

  // Mengambil IPv4 dan IPv6
  const ipv4 = ipList.find(ip => ip.includes('.')) || req.socket.remoteAddress?.split(':').pop();
  const ipv6 = ipList.find(ip => ip.includes(':')) || req.socket.remoteAddress;

  res.status(200).json({ ipv4, ipv6 });
}
