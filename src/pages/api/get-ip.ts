// pages/api/get-ip.ts
// export const runtime = 'edge';

import type { NextApiRequest, NextApiResponse } from 'next';
import { IPinfoWrapper } from 'node-ipinfo';

// Masukkan token IPinfo kamu di sini (gunakan variabel environment untuk keamanan)
const token = process.env.IPINFO_TOKEN || ''; // Fallback ke string kosong jika undefined
const ipinfo = new IPinfoWrapper(token);

// Regular expression untuk validasi IPv4 dan IPv6
const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const ipv6Regex = /^[0-9a-fA-F:]+$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Mendapatkan daftar IP dari header 'x-forwarded-for' atau alamat IP asli klien
    const forwardedFor = req.headers['x-forwarded-for']?.toString();
    const ipList = forwardedFor ? forwardedFor.split(',').map(ip => ip.trim()) : [];

    // Filter untuk mendapatkan hanya IP yang valid
    const ipv4 = ipList.find(ip => ipv4Regex.test(ip)) || (ipv4Regex.test(req.socket.remoteAddress || '') ? req.socket.remoteAddress : undefined);
    const ipv6 = ipList.find(ip => ipv6Regex.test(ip)) || (ipv6Regex.test(req.socket.remoteAddress || '') ? req.socket.remoteAddress : undefined);

    if (!ipv4 && !ipv6) {
      return res.status(400).json({ error: 'IP address not found or invalid' });
    }

    // Mengambil informasi IP menggunakan node-ipinfo (gunakan IPv4 atau IPv6 tergantung yang tersedia)
    const ipToLookup = ipv4 || ipv6;
    const ipInfo = await ipinfo.lookupIp(ipToLookup!);

    // Mengembalikan respons dengan data IPv4, IPv6, dan informasi tambahan
    res.status(200).json({
      data: {
        ipv4,
        ipv6,
        ipInfo,
      },
    });
  } catch (error) {
    // Memastikan 'error' di-cast menjadi objek yang dikenal
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({
      error: 'Failed to fetch IP information',
      details: errorMessage,
    });
  }
}
