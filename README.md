# Andri Juliono · RW 13

Halaman kampanye statis untuk Andri Juliono, calon nomor urut 2 periode 2026–2031. Konten berasal dari `main.txt`; foto asli tetap tersedia di `public/`.

## Menjalankan

Memerlukan Node.js 20 atau lebih baru. Tidak perlu `npm install`.

```sh
npm run dev
```

Buka http://localhost:4173. Server pratinjau hanya mendengarkan koneksi lokal.

## Build dan hosting

```sh
npm run build
```

Unggah **isi folder `dist/`** ke hosting statis. Semua aset menggunakan path relatif, sehingga bisa dihosting di subfolder. `npm start` menjalankan pratinjau dari build yang sudah ada. Jalankan build lagi setelah mengubah sumber.

## Mengubah konten

- `src/index.html`: ringkasan profil, lima program, galeri, dan metadata.
- `main.txt`: sumber pidato untuk referensi konten. Teks lengkap dan unduhannya tidak ditampilkan di website.
- `src/styles.css`: tampilan responsif, tema terang/gelap sesuai sistem, serta gaya fokus keyboard.
- `src/app.js`: menu mobile, pembesaran foto, dan tombol berbagi dengan fallback salin tautan.
- `public/optimized/`: foto WebP responsif yang dipakai halaman. Foto asli tidak diunggah oleh build.

Jika foto diganti, jalankan `python scripts/optimize-images.py` menggunakan Python dengan Pillow, kemudian build ulang. Optimasi hanya mengubah ukuran dan format; tidak mengubah isi foto. Metadata EXIF tidak disertakan di hasil.

Palet menggunakan biru `#123960` dan aksen gold, dengan kontras yang disesuaikan untuk tema terang/gelap. Konten utama, lima program, dan album tetap berfungsi tanpa JavaScript. Tidak ada font eksternal, framework, tracking, atau dependency runtime. Tanggal pemilihan, lokasi TPS, nomor kontak, dan domain belum diberikan dan tidak dikarang. Setelah domain tersedia, tambahkan URL absolut `og:url` dan `og:image` untuk pratinjau tautan sosial.

## Verifikasi

Diuji di Chromium pada lebar 320, 375, 390, 768, 1024, dan 1440 piksel: tidak ada overflow horizontal. Menu, seluruh program, album, dialog foto (termasuk tombol panah, Escape, dan pengembalian fokus), berbagi/salin tautan, fallback manual, mode gelap, serta penggunaan tanpa JavaScript sudah diperiksa.

Audit Lighthouse mobile lokal versi awal pada 7 Oktober 2026: performa 99, aksesibilitas 100, best practices 100, SEO 100. LCP 2,0 detik, CLS 0, transfer sekitar 281 KiB. Skor otomatis tidak menggantikan pengujian oleh pengguna; hasil hosting nyata bergantung pada jaringan dan konfigurasi server.
