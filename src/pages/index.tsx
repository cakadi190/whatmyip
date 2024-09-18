import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IPinfo } from 'node-ipinfo';
import { useEffect, useState } from 'react';

interface IPAddresses {
  ipv4?: string | null;
  ipv6?: string | null;
}

const Home = () => {
  const [ips, setIps] = useState<IPAddresses>({ ipv4: null, ipv6: null });
  const [ipinfo, setIpInfo] = useState<IPinfo | null>(null);
  
  const fetchIps = async () => {
    try {
      const response = await fetch('/api/get-ip');
      const data = await response.json();
      console.log(data.data)
      
      setIps(data.data);
      setIpInfo(data.data.ipInfo);
    } catch (error) {
      console.error('Error fetching IPs:', error);
    }
  };

  useEffect(() => {
    fetchIps();
  }, []);

  return (
    <>
      <Head>
        <title>Cek Alamat IP Anda</title>
        <meta name="description" content="Cek alamat IPv4 dan IPv6 Anda secara instan di website ini. Dapatkan informasi mengenai alamat IP Anda yang terhubung dengan jaringan internet." />
        <meta name="keywords" content="alamat IP, cek ip, IPv4, IPv6, jaringan internet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Cek Alamat IP Anda" />
        <meta property="og:description" content="Cek alamat IPv4 dan IPv6 Anda secara instan." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://whatmyip.cakadi190.eu.org/" />
        <meta property="og:image" content="https://yourwebsite.com/thumbnail.jpg" />
      </Head>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 max-w-xl p-8 rounded-lg shadow-[0_1rem_2rem_rgba(0,0,0,0.0325)] text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-100">Alamat IP Kamu Adalah</h1>

          {/* Tampilkan IPv4 */}
          {ips.ipv4 && (
            <Link 
              target='_blank' 
              href={`http://${ips.ipv4}`} 
              className="p-4 flex w-full justify-center rounded-full border leading-none mb-6 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 font-mono text-2xl"
            >
              <div className="opacity-25 mr-1">http://</div>
              <div className="p-2 px-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 border rounded-lg">{ips.ipv4}</div>
              <div className="opacity-25 ml-1">/</div>
            </Link>
          )}

          {/* Tampilkan IPv6 */}
          {ips.ipv6 && (
            <Link 
              target='_blank' 
              href={`http://[${ips.ipv6}]`} 
              className="py-5 px-6 flex w-full items-center justify-center rounded-full border leading-none mb-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 font-mono text-2xl"
            >
              <div className="opacity-25 mr-1">http://</div>
              <div className="p-2 px-3 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 border rounded-lg">{ips.ipv6}</div>
              <div className="opacity-25 ml-1">/</div>
            </Link>
          )}

          <div className="mb-4 flex gap-1 justify-center items-center text-center">
            <span>{(ipinfo && !ipinfo.bogon) ? `Alamat IP kamu berlokasi di Kota ${ipinfo.city}, ${ipinfo.country}` : 'IP Lokal / IP Bogon'}</span>
            {(ipinfo && !ipinfo.bogon) && <Image src={ipinfo.countryFlagURL} alt={ipinfo.city} width={32} height={24} className="h-4" />}
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            Perlu diperhatikan, bahwa semua informasi yang ditampilkan ini tidak selamanya akurat. Adakalanya alamat IP yang tampil itu sesuai dengan ISP yang bersangkutan. Silahkan hubungi penyedia layanan internet anda untuk mendapatkan informasi lebih lanjut.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
