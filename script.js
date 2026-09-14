document.addEventListener("DOMContentLoaded", () => {

    // 1. Efek Shadow pada Header saat Scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Logika Navigasi "Single Page Application" (SPA) Dinamis
    const navLinks = {
        beranda: document.getElementById("nav-beranda"),
        materi: document.getElementById("nav-materi"),
        bahanAjar: document.getElementById("nav-bahan-ajar"),
        tim: document.getElementById("nav-tim")
    };

    const pages = {
        beranda: document.getElementById("page-beranda"),
        materi: document.getElementById("page-materi"),
        bahanAjar: document.getElementById("page-bahan-ajar"),
        tim: document.getElementById("page-tim")
    };

    function navigateTo(targetPage) {
        // Reset semua tombol nav menjadi tidak aktif
        Object.values(navLinks).forEach(link => {
            if (link) link.classList.remove("active");
        });

        // Reset semua halaman utama menjadi tersembunyi
        Object.values(pages).forEach(page => {
            if (page) page.classList.add("d-none");
        });

        // Aktifkan tab dan section utama yang dipilih
        if (navLinks[targetPage]) navLinks[targetPage].classList.add("active");
        if (pages[targetPage]) pages[targetPage].classList.remove("d-none");

        // Scroll halus ke atas saat pindah menu
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Pasang event listener ke masing-masing menu navigasi di header
    if (navLinks.beranda) navLinks.beranda.addEventListener("click", (e) => { e.preventDefault(); navigateTo('beranda'); });
    if (navLinks.materi) navLinks.materi.addEventListener("click", (e) => { e.preventDefault(); navigateTo('materi'); });
    if (navLinks.bahanAjar) navLinks.bahanAjar.addEventListener("click", (e) => { e.preventDefault(); navigateTo('bahanAjar'); });
    if (navLinks.tim) navLinks.tim.addEventListener("click", (e) => { e.preventDefault(); navigateTo('tim'); });


    // 3. Logika Tab di Dalam Halaman Materi (Menyembunyikan & Menampilkan Konten)
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            // Hapus kelas aktif dari semua tombol tab
            tabBtns.forEach(t => t.classList.remove("active"));
            // Tambahkan kelas aktif ke tombol tab yang sedang diklik
            this.classList.add("active");

            // Sembunyikan semua blok konten sub-topik
            tabContents.forEach(content => content.classList.add("d-none"));

            // Ambil ID dari data-target tombol yang diklik, lalu tampilkan kontennya
            const targetId = this.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove("d-none");
            }
        });
    });

});

// 4. Logika Interaksi UI pada Tab Simulator AR (Pilihan Bangun & Toggle Tampilan)
const shapePills = document.querySelectorAll(".shape-pill");
shapePills.forEach(pill => {
    pill.addEventListener("click", function () {
        shapePills.forEach(p => p.classList.remove("active"));
        this.classList.add("active");
        // Logika pergantian model 3D dan data anatomi bisa ditautkan disini
    });
});

const stageToggles = document.querySelectorAll(".stage-toggles button");
stageToggles.forEach(toggle => {
    toggle.addEventListener("click", function () {
        stageToggles.forEach(t => t.classList.remove("active"));
        this.classList.add("active");
        // Logika mengubah material 3D (Padat/Wireframe/Net) bisa ditautkan disini
    });
});

// 5. Logika Modal PDF Viewer (Bahan Ajar)
    const pdfModal = document.getElementById("pdf-modal");
    const closePdfBtns = document.querySelectorAll("#btn-close-pdf, #btn-close-pdf-footer");
    const openPdfBtns = document.querySelectorAll(".btn-open-pdf");
    const pdfModalTitle = document.getElementById("pdf-modal-title-text");

    // Fungsi membuka modal
    openPdfBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            // Ambil judul dari atribut data-title tombol yang ditekan
            const title = this.getAttribute("data-title");
            if(pdfModalTitle) pdfModalTitle.textContent = title;
            
            // Tampilkan modal
            pdfModal.classList.remove("d-none");
            // Matikan scroll pada halaman background agar rapi
            document.body.style.overflow = "hidden"; 
        });
    });

    // Fungsi menutup modal
    closePdfBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            pdfModal.classList.add("d-none");
            // Kembalikan scroll pada halaman utama
            document.body.style.overflow = "auto";
        });
    });