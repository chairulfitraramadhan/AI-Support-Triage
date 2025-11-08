// nama file: frontend/script.js
// (Hanya untuk index.html)

// --- 1. Referensi Elemen & URL ---
const formContainer = document.getElementById('form-container');
const spinnerOverlay = document.getElementById('spinner-overlay');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const bodyEl = document.body;

const BACKEND_API_URL = 'ai-support-triage-production.up.railway.app/ask'; 

// --- 2. Logika Dark Mode ---
// Cek preferensi tersimpan di localStorage saat memuat
if (localStorage.getItem('theme') === 'dark') {
    bodyEl.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
} else {
    bodyEl.classList.remove('dark-mode');
    darkModeToggle.textContent = '🌙';
}

darkModeToggle.addEventListener('click', () => {
    bodyEl.classList.toggle('dark-mode');
    
    // Simpan preferensi ke localStorage
    if (bodyEl.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        darkModeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        darkModeToggle.textContent = '🌙';
    }
});


// --- 3. Logika Utama Pengiriman Tiket ---
async function sendTicket() {
    
    // Ambil nilai dari form
    const nama = document.getElementById('namaInput').value;
    const email = document.getElementById('emailInput').value;
    const deskripsi = document.getElementById('deskripsiInput').value;
    
    // Validasi Frontend (menggunakan SweetAlert)
    if (!nama || !email || !deskripsi) {
        Swal.fire({
            icon: 'error',
            title: 'Oops... Gagal!',
            text: 'Semua bidang wajib diisi!',
        });
        return; // Hentikan fungsi
    }

    // Tampilkan Spinner
    spinnerOverlay.style.display = 'flex';

    try {
        const response = await fetch(BACKEND_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "Nama": nama, 
                "Email": email, 
                "Deskripsi": deskripsi 
            }) 
        });

        const result = await response.json();

        if (response.ok) {
            // SUKSES: Tampilkan SweetAlert sukses
            Swal.fire({
                icon: 'success',
                title: 'Sukses Terkirim!',
                text: 'Tiket Anda telah terkirim dan sedang dianalisis oleh AI.',
                timer: 3000, 
                timerProgressBar: true,
                showConfirmButton: false
            });
            

            saveToHistory(nama, email, deskripsi);
            
            // Auto-reset form
            resetForm();

        } else {
            // GAGAL (Error dari Backend, misal 400)
            Swal.fire({
                icon: 'error',
                title: 'Gagal Mengirim!',
                text: `Error: ${result.error}`,
            });
        }

    } catch (error) {
        // GAGAL (Error Kritis, misal backend mati)
        Swal.fire({
            icon: 'error',
            title: 'Error Kritis!',
            text: 'Tidak bisa terhubung ke backend. Pastikan server Flask Anda berjalan!',
        });
        console.error('Error Fetch:', error);
    } finally {
        // SELALU: Sembunyikan Spinner
        spinnerOverlay.style.display = 'none';
    }
}

// Fungsi untuk membersihkan form
function resetForm() {
    document.getElementById('namaInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('deskripsiInput').value = '';
}

// FUNGSI BARU: Logika simpan ke localStorage
function saveToHistory(nama, email, deskripsi) {
    const tiket = {
        nama: nama,
        email: email,
        deskripsi: deskripsi,
        tanggal: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
    };

    // Ambil riwayat lama (atau buat array baru), tambahkan tiket baru
    let riwayat = JSON.parse(localStorage.getItem('riwayatTiket')) || [];
    riwayat.push(tiket);
    
    // Simpan kembali ke localStorage
    localStorage.setItem('riwayatTiket', JSON.stringify(riwayat));
}