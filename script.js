function showRegister() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "block";
    document.getElementById("changeBox").style.display = "none";
}

function showLogin() {
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("changeBox").style.display = "none";
}

function showChangePass() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("registerBox").style.display = "none";
    document.getElementById("changeBox").style.display = "block";
}

// Register
function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    if (!user || !pass) return alert("Isi semua kolom!");

    if (localStorage.getItem(user)) {
        return alert("Username sudah dipakai!");
    }

    localStorage.setItem(user, pass);
    window.location.href = "dashboard.html";
    showLogin();
}

// Login
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    if (localStorage.getItem(user) === pass) {
        window.location.href = "dashboard.html";
    } else {
        alert("Username atau password salah!");
    }
}

// Ganti password
function changePassword() {
    let user = document.getElementById("chgUser").value;
    let oldp = document.getElementById("chgOld").value;
    let newp = document.getElementById("chgNew").value;

    let realpass = localStorage.getItem(user);

    if (!realpass) {
        return alert("Akun tidak ditemukan!");
    }

    if (realpass !== oldp) {
        return alert("Password lama salah!");
    }

    localStorage.setItem(user, newp);
    alert("Password berhasil diganti!");
    showLogin();
}

// --- AI Warning System ---
function updateAIWarning(km, screen) {
    let msg = "";

    if (screen > 120 && km < 1) {
        msg = "AI Analysis: Kamu sudah 2 jam memakai perangkat tapi hampir tidak bergerak. Istirahat sejenak ya!";
    }
    else if (screen > 180) {
        msg = "AI Analysis: Kamu sudah lebih dari 3 jam nonstop. Minum air dan lihat jauh sejenak!";
    }
    document.getElementById("warningText").innerText = msg;
}
// --- Penyimpanan kondisi tombol ---
let kondisi = {
    lelah: false,
    sakit: false,
    emosi: false
};

// Tombol toggle kondisi
function toggleCond(kond) {
    kondisi[kond] = !kondisi[kond];

    // Ganti warna tombol
    const btnId = {
        lelah: "btnLelah",
        sakit: "btnSakit",
        emosi: "btnEmosi"
    };

    let btn = document.getElementById(btnId[kond]);
    btn.classList.toggle("selected");
}

// --- Analisa Kesehatan ---
function analisaKesehatan() {
    let tb = parseFloat(document.getElementById("tb").value);
    let bb = parseFloat(document.getElementById("bb").value);
    let umur = parseFloat(document.getElementById("umur").value);

    if (!tb || !bb || !umur) {
        alert("Mohon isi semua data!");
        return;
    }

    // Hitung BMI
    let meter = tb / 100;
    let bmi = (bb / (meter * meter)).toFixed(1);

    document.getElementById("hasilBMI").innerText = "BMI: " + bmi;

    // Penilaian dasar BMI
    let ideal = "";
    if (bmi < 18.5) ideal = "Kurus";
    else if (bmi <= 24.9) ideal = "Ideal";
    else if (bmi <= 29.9) ideal = "Berlebih";
    else ideal = "Obesitas";

    // Skor Kesehatan
    let skor = 100;

    // Tambah penalti berdasarkan BMI
    if (ideal === "Kurus") skor -= 10;
    if (ideal === "Berlebih") skor -= 15;
    if (ideal === "Obesitas") skor -= 25;

    // Tambah penalti berdasarkan kondisi tombol
    if (kondisi.lelah) skor -= 15;
    if (kondisi.sakit) skor -= 20;
    if (kondisi.emosi) skor -= 10;

    // Penalti berdasarkan umur (realistis)
    if (umur < 12) skor -= 5;
    else if (umur > 40) skor -= 10;

    // Batas minimum skor
    if (skor < 0) skor = 0;

    document.getElementById("hasilSkor").innerText = "Skor Kesehatan: " + skor + "/100";

    // AI Saran
    let saran = "Kondisi kamu cukup stabil.";

    if (skor >= 85) {
        saran = "Kondisi kamu ideal! Tetap jaga pola makan dan aktivitas.";
    }
    else if (skor >= 65) {
        saran = "Kondisi cukup baik. Disarankan olahraga ringan 2–3x seminggu.";
    }
    else if (skor >= 40) {
        saran = "Beberapa hal perlu diperhatikan. Tingkatkan tidur cukup, minum air, dan kurangi stres.";
    }
    else if (skor < 40) {
        saran = "AI melihat kondisi kamu kurang ideal. Disarankan konsultasi kesehatan, atur pola makan, dan istirahat cukup.";
    }

    // Tambahkan saran khusus berdasar kondisi user
    if (kondisi.lelah) saran += " • Kamu sering cepat lelah, coba tambahkan makanan bergizi dan perbaiki pola tidur.";
    if (kondisi.sakit) saran += " • Kamu mudah sakit, tingkatkan imun dengan buah, olahraga ringan, dan sinar matahari pagi.";
    if (kondisi.emosi) saran += " • Kamu mudah berubah ekspresi, coba lakukan relaksasi atau manajemen stres.";

    document.getElementById("aiSaran").innerText = saran;
}


