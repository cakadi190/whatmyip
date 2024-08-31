import { useEffect, useState } from 'react';

interface IPAddresses {
  ipv4: string | null;
  ipv6: string | null;
}

const Home = () => {
  const [ips, setIps] = useState<IPAddresses>({ ipv4: null, ipv6: null });

  useEffect(() => {
    const fetchIps = async () => {
      try {
        const response = await fetch('/api/get-ip');
        const data = await response.json();
        setIps(data);
      } catch (error) {
        console.error('Error fetching IPs:', error);
      }
    };

    fetchIps();
  }, []);

  return (
    <div>
      <h1>Your IP Addresses</h1>
      <p>IPv4: {ips.ipv4 ? ips.ipv4 : 'Loading...'}</p>
      <p>IPv6: {ips.ipv6 ? ips.ipv6 : 'Loading...'}</p>
    </div>
  );
};

export default Home;
