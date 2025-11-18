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
        alert("Login berhasil!");
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
