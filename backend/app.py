from flask import Flask, request, jsonify
import requests
import os
from flask_cors import CORS

app = Flask(__name__)
# Izinkan HANYA URL Vercel Anda
CORS(app, origins="https://ai-support-triage.vercel.app")

MAKE_WEBHOOK_URL = "https://hook.us2.make.com/np4dlb1pi538gcl0qzdc2f5kqzimapk1"


@app.route('/ask', methods=['POST'])
def handle_question():
    try:
        data = request.json
        
        nama = data.get('Nama')
        email = data.get('Email')
        deskripsi = data.get('Deskripsi')

        # Validasi
        if not nama or not email or not deskripsi:
            return jsonify({"error": "Semua bidang (Nama, Email, Deskripsi) wajib diisi"}), 400

        data_to_send = {
            "Nama": nama,
            "Email": email,
            "Deskripsi": deskripsi
        }

        response = requests.post("https://hook.us2.make.com/np4dlb1pi538gcl0qzdc2f5kqzimapk1", json=data_to_send)

        # Cukup periksa apakah Make.com menerima data (200 OK)
        if response.status_code == 200:
            # Kirim balasan sukses SEDERHANA kembali ke Frontend
            return jsonify({
                "status": "success", 
                "message": "Tiket Anda telah terkirim."
            })
        else:
            return jsonify({"status": "error", "message": "Gagal memicu Make.com"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Ambil port dari environment variable (diberikan oleh Railway)
    port = int(os.environ.get('PORT', 5000))
    # Jalankan server di 0.0.0.0 agar bisa diakses dari luar
    app.run(debug=False, host='0.0.0.0', port=port)