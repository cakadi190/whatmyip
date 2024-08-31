# What My IP Address?

**What My IP Address?** adalah aplikasi web yang dibangun menggunakan Next.js untuk menampilkan alamat IP klien (IPv4 dan IPv6). Aplikasi ini dirancang untuk membantu pengguna melihat informasi alamat IP mereka secara real-time.

## Fitur

- **Menampilkan IPv4 dan IPv6:** Secara otomatis mendeteksi dan menampilkan alamat IPv4 dan IPv6 klien.
- **Server-Side Rendering (SSR):** Menggunakan Next.js untuk performa optimal dan SEO yang lebih baik.
- **API Routes:** Endpoint API disediakan untuk mendapatkan alamat IP klien.
- **Dukungan TypeScript:** Menggunakan TypeScript untuk keamanan tipe dan deteksi kesalahan lebih awal.
- **Desain Responsif:** Tampilan yang responsif untuk semua jenis perangkat.

## Instalasi

1. Clone repositori:

   ```bash
   git clone https://github.com/cakadi190/whatmyip.git
   cd whatmyip
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan aplikasi di mode pengembangan:

   ```bash
   npm run dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## Struktur Proyek

```bash
.
├── /pages           # Halaman-halaman Next.js
│   ├── /api         # API routes untuk mendapatkan IP
│   └── index.tsx    # Halaman utama untuk menampilkan IP
├── /public          # File statis seperti gambar, favicon, dll.
├── /styles          # CSS dan file style lainnya
├── /components      # Komponen-komponen React
├── next.config.js   # Konfigurasi Next.js
└── tsconfig.json    # Konfigurasi TypeScript
```

## Cara Penggunaan

- **Menampilkan Alamat IP:** Secara default, halaman utama akan menampilkan alamat IP (IPv4 dan IPv6) klien.
- **Endpoint API:** Menggunakan API route `/api/get-ip` untuk mendapatkan alamat IP klien secara langsung.

## Skrip

- `npm run dev`: Menjalankan server pengembangan.
- `npm run build`: Membangun aplikasi untuk produksi.
- `npm run start`: Menjalankan server produksi.
- `npm run lint`: Mengecek kode dengan linter.

## Kontribusi

Kontribusi sangat diterima! Silakan buat **Pull Request** atau ajukan **Issue** untuk saran perbaikan.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak

Jika ada pertanyaan atau kebutuhan lainnya, silakan hubungi saya di [cakadi190@gmail.com](mailto:cakadi190@gmail.com).

---

Dibuat dengan ❤️ oleh Cak Adi.
