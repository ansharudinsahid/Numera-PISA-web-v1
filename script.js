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

    // 2. Navigasi SPA (Desktop & Mobile)
    const navLinks = {
        beranda: document.getElementById("nav-beranda"),
        materi: document.getElementById("nav-materi"),
        bahanAjar: document.getElementById("nav-bahan-ajar"),
        tim: document.getElementById("nav-tim")
    };

    const mobileNavLinks = {
        beranda: document.getElementById("mobile-nav-beranda"),
        materi: document.getElementById("mobile-nav-materi"),
        bahanAjar: document.getElementById("mobile-nav-bahan-ajar"),
        tim: document.getElementById("mobile-nav-tim")
    };

    const pages = {
        beranda: document.getElementById("page-beranda"),
        materi: document.getElementById("page-materi"),
        bahanAjar: document.getElementById("page-bahan-ajar"),
        tim: document.getElementById("page-tim")
    };

    function navigateTo(targetPage) {
        // Reset status aktif menu desktop
        Object.values(navLinks).forEach(link => {
            if (link) link.classList.remove("active");
        });

        // Reset status aktif menu mobile
        Object.values(mobileNavLinks).forEach(link => {
            if (link) link.classList.remove("active");
        });

        // Reset semua halaman menjadi tersembunyi
        Object.values(pages).forEach(page => {
            if (page) page.classList.add("d-none");
        });

        // Aktifkan tab dan section utama yang dipilih
        if (navLinks[targetPage]) navLinks[targetPage].classList.add("active");
        if (mobileNavLinks[targetPage]) mobileNavLinks[targetPage].classList.add("active");
        if (pages[targetPage]) pages[targetPage].classList.remove("d-none");

        // Tutup menu mobile jika sedang terbuka
        closeMobileMenu();

        // Scroll halus ke atas saat pindah menu
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Pasang listener pada logo navbar untuk kembali ke Beranda
    const navLogo = document.getElementById("nav-logo");
    if (navLogo) {
        navLogo.addEventListener("click", () => navigateTo('beranda'));
        navLogo.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigateTo('beranda');
            }
        });
    }

    // Pasang listener menu desktop
    if (navLinks.beranda) navLinks.beranda.addEventListener("click", (e) => { e.preventDefault(); navigateTo('beranda'); });
    if (navLinks.materi) navLinks.materi.addEventListener("click", (e) => { e.preventDefault(); navigateTo('materi'); });
    if (navLinks.bahanAjar) navLinks.bahanAjar.addEventListener("click", (e) => { e.preventDefault(); navigateTo('bahanAjar'); });
    if (navLinks.tim) navLinks.tim.addEventListener("click", (e) => { e.preventDefault(); navigateTo('tim'); });

    // Pasang listener menu mobile
    if (mobileNavLinks.beranda) mobileNavLinks.beranda.addEventListener("click", (e) => { e.preventDefault(); navigateTo('beranda'); });
    if (mobileNavLinks.materi) mobileNavLinks.materi.addEventListener("click", (e) => { e.preventDefault(); navigateTo('materi'); });
    if (mobileNavLinks.bahanAjar) mobileNavLinks.bahanAjar.addEventListener("click", (e) => { e.preventDefault(); navigateTo('bahanAjar'); });
    if (mobileNavLinks.tim) mobileNavLinks.tim.addEventListener("click", (e) => { e.preventDefault(); navigateTo('tim'); });


    // 3. Logika Mobile Drawer Navigation
    const mobileToggle = document.getElementById("mobile-toggle");
    const mobileToggleIcon = document.getElementById("mobile-toggle-icon");
    const mobileDrawer = document.getElementById("mobile-menu-drawer");
    const mobileBackdrop = document.getElementById("mobile-menu-backdrop");
    const btnCloseMobile = document.getElementById("btn-close-mobile-menu");

    function openMobileMenu() {
        if (mobileDrawer && mobileBackdrop) {
            mobileDrawer.classList.add("open");
            mobileBackdrop.classList.add("open");
            document.body.style.overflow = "hidden";
            if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "true");
            if (mobileToggleIcon) {
                mobileToggleIcon.classList.remove("ph-list");
                mobileToggleIcon.classList.add("ph-x");
            }
        }
    }

    function closeMobileMenu() {
        if (mobileDrawer && mobileBackdrop) {
            mobileDrawer.classList.remove("open");
            mobileBackdrop.classList.remove("open");
            document.body.style.overflow = "";
            if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
            if (mobileToggleIcon) {
                mobileToggleIcon.classList.remove("ph-x");
                mobileToggleIcon.classList.add("ph-list");
            }
        }
    }

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = mobileDrawer && mobileDrawer.classList.contains("open");
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (btnCloseMobile) {
        btnCloseMobile.addEventListener("click", closeMobileMenu);
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener("click", closeMobileMenu);
    }

    // Tutup mobile menu saat menekan ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeMobileMenu();
        }
    });

    // Reset drawer jika layar di-resize kembali ke laptop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });


    // 4. Logika Tab di Dalam Halaman Materi
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            tabBtns.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            tabContents.forEach(content => content.classList.add("d-none"));

            const targetId = this.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove("d-none");
            }
        });
    });


    // 5. Fungsi Pintas Membuka AR Simulator 3D
    function openSimulator() {
        navigateTo('materi');
        // Cari tab AR dan klik
        const arTabBtn = document.querySelector('.tab-btn[data-target="content-ar"]');
        if (arTabBtn) {
            arTabBtn.click();
        }
        setTimeout(() => {
            const arSection = document.getElementById("content-ar");
            if (arSection) {
                arSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    // Hubungkan semua tombol pembuka simulator
    const btnHeaderSim = document.getElementById("btn-header-simulator");
    const btnMobileSim = document.getElementById("btn-mobile-simulator");
    if (btnHeaderSim) btnHeaderSim.addEventListener("click", openSimulator);
    if (btnMobileSim) btnMobileSim.addEventListener("click", openSimulator);

    const openSimBtns = document.querySelectorAll(".btn-open-simulator");
    openSimBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openSimulator();
        });
    });


    // 6. Logika Interaksi UI Tab Simulator AR
    const shapePills = document.querySelectorAll(".shape-pill");
    shapePills.forEach(pill => {
        pill.addEventListener("click", function () {
            shapePills.forEach(p => p.classList.remove("active"));
            this.classList.add("active");
        });
    });

    const stageToggles = document.querySelectorAll(".stage-toggles button");
    stageToggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            stageToggles.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
        });
    });


    // 7. Logika Modal PDF Viewer (Bahan Ajar)
    const pdfModal = document.getElementById("pdf-modal");
    const closePdfBtns = document.querySelectorAll("#btn-close-pdf, #btn-close-pdf-footer");
    const openPdfBtns = document.querySelectorAll(".btn-open-pdf");
    const pdfModalTitle = document.getElementById("pdf-modal-title-text");

    openPdfBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const title = this.getAttribute("data-title");
            if (pdfModalTitle && title) pdfModalTitle.textContent = title;

            if (pdfModal) {
                pdfModal.classList.remove("d-none");
                document.body.style.overflow = "hidden";
            }
        });
    });

    closePdfBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            if (pdfModal) {
                pdfModal.classList.add("d-none");
                document.body.style.overflow = "";
            }
        });
    });

    // Menutup modal jika klik di area overlay gelap luar
    if (pdfModal) {
        pdfModal.addEventListener("click", function (e) {
            if (e.target === pdfModal) {
                pdfModal.classList.add("d-none");
                document.body.style.overflow = "";
            }
        });
    }

});