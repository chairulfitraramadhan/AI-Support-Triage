# Sistem Triase Tiket Dukungan Berbasis AI (AI Support Triage)

Ini adalah proyek Tugas Kelompok Ujian Tengah Semester (UTS) untuk mata kuliah Pembelajaran Mesin.

Proyek ini adalah aplikasi web *full-stack* yang mendemonstrasikan sistem triase (pemilahan) tiket dukungan pelanggan secara otomatis menggunakan AI generatif (Google Gemini) yang diorkestrasi melalui platform *no-code* (Make.com).

---

## Anggota Kelompok

Nama Lengkap (NIM)

    Chairul Fitra Ramadhan (221112302)
    Ifan Doli Siagian (221113114)
    William Tanoto (221110870)

---

## Link Video Demonstrasi

* **Link Video Demonstrasi Google Drive:** `https://drive.google.com/file/d/1Bv3I5Yj-l3_MMKG8WFV3ZD3KNY_QkmtV/view?usp=sharing`

---

## URL Aplikasi Live

* **Frontend (Aplikasi Utama):** https://ai-support-triage.vercel.app
* **Backend (API):** https://ai-support-triage-production.up.railway.app

    *(Catatan: URL Backend dipanggil secara otomatis oleh Frontend)*

---

## Deskripsi Proyek & Fungsionalitas

Sistem ini memecahkan masalah inefisiensi dan kelambatan dalam penanganan tiket dukungan pelanggan (support ticket) yang masih manual.

### Fungsionalitas Utama
1.  **Formulir Web Interaktif:** Antarmuka (Frontend) yang bersih dan elegan (`index.html`) dengan *dark mode*, *loading spinner*, dan notifikasi *SweetAlert2*.
2.  **Pengiriman Asinkron:** Menggunakan JavaScript (`script.js`) untuk mengirim data tiket ke Backend (`app.py`) tanpa me-refresh halaman.
3.  **Triase Berbasis AI:** Backend memicu skenario **Make.com**. **Google Gemini AI** kemudian menganalisis deskripsi masalah untuk mengekstrak **Kategori** dan **Urgensi**.
4.  **Notifikasi Cerdas (Router):**
    * **Jika Urgensi `Tinggi`:** Skenario secara otomatis mengirim notifikasi darurat ke tim teknis (via **Telegram Bot**).
    * **Selalu:** Skenario secara otomatis mengirim email konfirmasi profesional ke pelanggan (via **Gmail**).
5.  **Riwayat Lokal:** Setiap tiket yang berhasil terkirim disimpan di `localStorage` browser, memungkinkan pengguna melihat riwayat tiket mereka di halaman `riwayat.html`.
6.  **Multi-Halaman:** Aplikasi ini memiliki tiga halaman (`index.html`, `riwayat.html`, `tentang.html`) untuk memberikan pengalaman aplikasi yang utuh.

### Arsitektur & Teknologi
* **Frontend (FE):** `HTML5`, `CSS3` (dengan Dark Mode), `JavaScript (ES6+)`
    * *Library:* `SweetAlert2`, `Google Fonts (Inter)`.
    * *Fitur Browser:* `Fetch API`, `localStorage`.
* **Backend (BE):** `Python (Flask)`
    * Berfungsi sebagai API perantara sederhana untuk menerima data dari FE dan memicu Webhook.
* **Otomasi / AI:**
    * `Make.com`: Sebagai orkestrator alur kerja *no-code*.
    * `Google Gemini AI`: Model AI yang melakukan analisis dan ekstraksi data.
* **Notifikasi:** `Telegram Bot` dan `Gmail`.

---

## Petunjuk Penggunaan Aplikasi (Demo)

Pastikan skenario Make.com dalam posisi `ON`.

1.  **Buka Aplikasi:** Buka **URL Aplikasi Live** Anda.
2.  **Fitur UI:** Coba klik **Tombol Dark Mode** (ikon 🌙/☀️) di pojok kanan atas.
3.  **Navigasi:** Cek halaman `Riwayat Tiket` dan `Tentang Sistem`.

### Skenario Demo 1: Tiket Urgensi Tinggi
1.  **Input:** Isi formulir di `index.html` dengan masalah "TOLONG WEBSITE SAYA ERROR 500! SERVER DOWN!"
2.  **Kirim:** Klik **"Kirim Tiket & Analisis AI"**.
3.  **Hasil:**
    * **Browser:** *Loading Spinner* akan muncul, diikuti notifikasi `SweetAlert` "Sukses Terkirim!".
    * **Telegram:** Anda akan **menerima** notifikasi darurat.
    * **Email:** Anda akan **menerima** email konfirmasi.
    * **Riwayat:** Tiket akan muncul di halaman `Riwayat Tiket`.

### Skenario Demo 2: Tiket Urgensi Rendah
1.  **Input:** Isi formulir dengan masalah "Halo, bagaimana cara ganti password?"
2.  **Kirim:** Klik **"Kirim Tiket & Analisis AI"**.
3.  **Hasil:**
    * **Browser:** *Spinner* dan `SweetAlert` sukses akan muncul.
    * **Telegram:** Anda **TIDAK AKAN** menerima notifikasi (karena filter urgensi berhasil memblokirnya).
    * **Email:** Anda akan **menerima** email konfirmasi.
    * **Riwayat:** Tiket akan muncul di halaman `Riwayat Tiket`.

---

## Petunjuk Instalasi (Lokal)

Untuk menjalankan proyek ini di lingkungan lokal:

### 1. Konfigurasi Make.com
1.  Aktifkan skenario Make.com Anda (`Webhook` → `Gemini` → `Router` → `Gmail` / `Telegram`).
2.  Pastikan filter `Urgensi Tinggi` di jalur Telegram sudah benar.
3.  Salin **URL Webhook** dari modul `Webhooks (1)`.

### 2. Menjalankan Backend (BE)
1.  Buka terminal dan masuk ke folder `backend/`.
    ```bash
    cd backend
    ```
2.  Buat dan aktifkan *virtual environment*:
    ```bash
    # (Windows)
    py -m venv venv
    .\venv\Scripts\activate
    ```
3.  Instal *library* yang dibutuhkan:
    ```bash
    pip install -r requirements.txt
    ```
4.  Buka file `app.py`.
5.  **PENTING:** Ganti nilai variabel `https://hook.us2.make.com/np4dlb1pi538gcl0qzdc2f5kqzimapk1` (di baris ~11) dengan **URL Webhook** Anda.
6.  Jalankan server Flask:
    ```bash
    python app.py
    ```
7.  Server akan berjalan di `http://127.0.0.1:5000`. Biarkan terminal ini tetap terbuka.

### 3. Menjalankan Frontend (FE)
1.  Buka folder `frontend/`.
2.  **Klik dua kali** file `index.html`.
3.  File akan terbuka di browser Anda.
    *(Catatan: Pastikan `script.js` menunjuk ke `http://127.0.0.1:5000/ask` untuk tes lokal)*.