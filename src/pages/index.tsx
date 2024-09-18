import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { IPinfo } from 'node-ipinfo';
import { useEffect, useState } from 'react';

interface IPAddresses {
  ipv4?: string | null;
  ipv6?: string | null;
  ipinfo?: IPinfo;
}

const Home = () => {
  const [ips, setIps] = useState<IPAddresses>({ ipv4: null, ipv6: null });

  useEffect(() => {
    const fetchIps = async () => {
      try {
        const response = await fetch('/api/get-ip');
        const data = await response.json();
        setIps(data.data);
      } catch (error) {
        console.error('Error fetching IPs:', error);
      }
    };

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
              {ips.ipv4}
              <div className="opacity-25 ml-1">/</div>
            </Link>
          )}

          {/* Tampilkan IPv6 */}
          {ips.ipv6 && (
            <Link 
              target='_blank' 
              href={`http://[${ips.ipv6}]`} 
              className="p-4 flex w-full justify-center rounded-full border leading-none mb-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 font-mono text-2xl"
            >
              <div className="opacity-25 mr-1">http://</div>
              {ips.ipv6}
              <div className="opacity-25 ml-1">/</div>
            </Link>
          )}

          <div className="mb-4 flex gap-2 justify-center align-items-center text-center">
            <span>{ips.ipinfo && !ips.ipinfo.bogon ? `${ips.ipinfo.city}, ${ips.ipinfo.country}` : 'IP Lokal / Bogon'}</span>
            {ips.ipinfo && !ips.ipinfo.bogon && <Image src={ips.ipinfo.countryFlagURL} alt={ips.ipinfo.city} width={32} height={24} />}
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
