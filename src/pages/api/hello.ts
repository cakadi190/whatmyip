import { NextApiRequest, NextApiResponse } from 'next';

const getClientIp = (req: NextApiRequest) => {
  const ip = 
    req.headers['x-forwarded-for']?.toString().split(',').shift() ||
    req.socket.remoteAddress;
  
  console.log(ip)

  return ip;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const ip = getClientIp(req);

  res.status(200).json({ ip });
}