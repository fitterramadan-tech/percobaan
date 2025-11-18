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
    alert("Akun berhasil dibuat!");
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

// --- AI Estimasi Jarak Jalan ---
let langkah = 0;

document.addEventListener("mousemove", () => langkah++);
document.addEventListener("keydown", () => langkah++);

function hitungKmJalan() {
    // 200 gerakan = kira-kira 1 menit aktivitas ringan
    let menitAktif = Math.floor(langkah / 200);

    // 0.075 km = rata-rata jarak jalan per menit
    let km = (menitAktif * 0.075).toFixed(2);

    return km;
}

// --- AI Screen Time ---
let startTime = Date.now();

function hitungScreenTime() {
    let detik = Math.floor((Date.now() - startTime) / 1000);
    let menit = Math.floor(detik / 60);
    return menit;
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
    else if (km < 0.5) {
        msg = "AI Analysis: Aktivitas fisikmu sangat rendah hari ini. Coba jalan sebentar!";
    }
    else {
        msg = "AI Analysis: Aktivitas harianmu cukup seimbang. Good job!";
    }

    document.getElementById("warningText").innerText = msg;
}

// --- Update Dashboard ---
if (window.location.pathname.includes("dashboard.html")) {

    setInterval(() => {
        let km = hitungKmJalan();
        let screen = hitungScreenTime();

        document.getElementById("kmJalan").innerText = km + " km";
        document.getElementById("screenTime").innerText = screen + " menit";

        updateAIWarning(km, screen);
    }, 2000);
}
