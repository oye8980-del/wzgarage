function filterMotor() {
    const jenisFilter = document.getElementById('jenis').value.toLowerCase();
    const hargaFilter = document.getElementById('harga').value;
    const searchTerm = document.getElementById('search').value.toLowerCase().trim();

    const motorCards = document.querySelectorAll('.motor-card');
    let visibleCount = 0;

    motorCards.forEach(card => {
        const motorJenis = card.getAttribute('data-jenis').toLowerCase();
        const motorHarga = parseInt(card.getAttribute('data-harga'), 10);
        const motorNama = card.getAttribute('data-nama').toLowerCase();

        const jenisMatch = (jenisFilter === 'semua' || motorJenis === jenisFilter);
        const hargaMatch = (hargaFilter === '' || motorHarga <= hargaFilter);
        const searchMatch = (motorNama.includes(searchTerm));

        if (jenisMatch && hargaMatch && searchMatch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Jika tidak ada motor yang cocok, tampilkan pesan
    const motorGrid = document.querySelector('.motor-grid');
    let pesan = document.querySelector('#no-result');
    if (visibleCount === 0) {
        if (!pesan) {
            pesan = document.createElement('p');
            pesan.id = 'no-result';
            pesan.textContent = 'Maaf, motor tidak ditemukan dengan kriteria tersebut.';
            pesan.style.textAlign = 'center';
            pesan.style.fontSize = '1.2rem';
            pesan.style.color = '#cc0000';
            pesan.style.gridColumn = '1 / -1';
            motorGrid.appendChild(pesan);
        }
    } else {
        if (pesan) pesan.remove();
    }
}

function resetFilter() {
    document.getElementById('jenis').value = 'semua';
    document.getElementById('harga').value = '';
    document.getElementById('search').value = '';

    filterMotor();
}

// Optional: Terapkan filter saat mengetik di kolom search
document.getElementById('search').addEventListener('input', filterMotor);

// Terapkan filter sekali saat halaman dimuat supaya menampilkan semua motor
window.addEventListener('DOMContentLoaded', filterMotor);
