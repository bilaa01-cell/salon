const namaInput = document.getElementById("nama");
const absenList = document.getElementById("absenList");

function absen() {
  const nama = namaInput.value.trim();
  if (nama === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }

  const now = new Date();
  const waktu = now.toLocaleString("id-ID");

  const entry = { nama: nama, waktu: waktu };

  let data = JSON.parse(localStorage.getItem("absensiSalon")) || [];
  data.push(entry);
  localStorage.setItem("absensiSalon", JSON.stringify(data));
  namaInput.value = "";
  tampilkanAbsensi();
}

function tampilkanAbsensi() {
  const dataAbsen = JSON.parse(localStorage.getItem("absensiSalon")) || [];
  absenList.innerHTML = "";
  if (dataAbsen.length > 0) {
    absenList.style.display = "block";
    dataAbsen.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("absen-item");
      div.textContent = `${item.nama} - ${item.waktu}`;
      absenList.appendChild(div);
    });
  } else {
    absenList.style.display = "none";
  }
}

function downloadExcel() {
  const dataAbsen = JSON.parse(localStorage.getItem("absensiSalon")) || [];
  if (dataAbsen.length === 0) {
    alert("Belum ada data absensi.");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Nama;Waktu\n";

  dataAbsen.forEach(item => {
    csvContent += `${item.nama};${item.waktu}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "absensi_salon.csv");
  document.body.appendChild(link);
  link.click();
}

tampilkanAbsensi();
