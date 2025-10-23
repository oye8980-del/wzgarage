// Filter Motor
function filterMotor(){
  const jenis = document.getElementById('jenis').value.toLowerCase();
  const harga = document.getElementById('harga').value;
  const search = document.getElementById('search').value.toLowerCase().trim();
  const motorCards = document.querySelectorAll('.motor-card');
  let visible=0;

  motorCards.forEach(card=>{
    const motorJenis = card.dataset.jenis.toLowerCase();
    const motorHarga = parseInt(card.dataset.harga,10);
    const motorNama = card.dataset.nama.toLowerCase();

    const matchJenis = (jenis==='semua'||motorJenis===jenis);
    const matchHarga = (harga===''||motorHarga<=harga);
    const matchSearch = motorNama.includes(search);

    if(matchJenis&&matchHarga&&matchSearch){
      card.style.display='flex';
      visible++;
    }else{
      card.style.display='none';
    }
  });

  const grid = document.querySelector('.motor-grid');
  let msg = document.querySelector('#no-result');
  if(visible===0){
    if(!msg){
      msg=document.createElement('p');
      msg.id='no-result';
      msg.textContent='Maaf, motor tidak ditemukan dengan kriteria tersebut.';
      msg.style.textAlign='center';
      msg.style.fontSize='1.2rem';
      msg.style.color='#cc0000';
      msg.style.gridColumn='1/-1';
      grid.appendChild(msg);
    }
  }else{ if(msg) msg.remove(); }
}

// Reset Filter
function resetFilter(){
  document.getElementById('jenis').value='semua';
  document.getElementById('harga').value='';
  document.getElementById('search').value='';
  filterMotor();
}

// Search realtime
const searchInput = document.getElementById('search');
if(searchInput) searchInput.addEventListener('input',filterMotor);

// Hover efek tombol (warna berubah)
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn=>{
  btn.addEventListener('mouseover',()=>{btn.style.backgroundColor='#FFC107';});
  btn.addEventListener('mouseout',()=>{btn.style.backgroundColor=btn.classList.contains('btn-primary')?'#FFD700':btn.style.backgroundColor;});
});

// Initial filter
window.addEventListener('DOMContentLoaded',filterMotor);
