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
        tim: document.getElementById("nav-tim"),
        game: document.getElementById("nav-game"),
        ai: document.getElementById("nav-ai")
    };
    const mobileNavLinks = {
        beranda: document.getElementById("mobile-nav-beranda"),
        materi: document.getElementById("mobile-nav-materi"),
        bahanAjar: document.getElementById("mobile-nav-bahan-ajar"),
        tim: document.getElementById("mobile-nav-tim"),
        game: document.getElementById("mobile-nav-game"),
        ai: document.getElementById("mobile-nav-ai")
    };
    const pages = {
        beranda: document.getElementById("page-beranda"),
        materi: document.getElementById("page-materi"),
        bahanAjar: document.getElementById("page-bahan-ajar"),
        tim: document.getElementById("page-tim"),
        game: document.getElementById("page-game"),
        ai: document.getElementById("page-ai")
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
    if (navLinks.game) navLinks.game.addEventListener("click", (e) => { e.preventDefault(); navigateTo('game'); });
    if (navLinks.ai) navLinks.ai.addEventListener("click", (e) => { e.preventDefault(); navigateTo('ai'); });

    // Pasang listener menu mobile
    if (mobileNavLinks.beranda) mobileNavLinks.beranda.addEventListener("click", (e) => { e.preventDefault(); navigateTo('beranda'); });
    if (mobileNavLinks.materi) mobileNavLinks.materi.addEventListener("click", (e) => { e.preventDefault(); navigateTo('materi'); });
    if (mobileNavLinks.bahanAjar) mobileNavLinks.bahanAjar.addEventListener("click", (e) => { e.preventDefault(); navigateTo('bahanAjar'); });
    if (mobileNavLinks.tim) mobileNavLinks.tim.addEventListener("click", (e) => { e.preventDefault(); navigateTo('tim'); });
    if (mobileNavLinks.game) mobileNavLinks.game.addEventListener("click", (e) => { e.preventDefault(); navigateTo('game'); });
    if (mobileNavLinks.ai) mobileNavLinks.ai.addEventListener("click", (e) => { e.preventDefault(); navigateTo('ai'); });


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
    
    // Tambahkan selektor untuk iframe PDF
    const pdfIframe = document.querySelector("#pdf-modal .pdf-modal-body iframe");

    openPdfBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            const title = this.getAttribute("data-title");
            const pdfSrc = this.getAttribute("data-src"); // Ambil link PDF dari tombol

            // Set judul modal
            if (pdfModalTitle && title) pdfModalTitle.textContent = title;
            
            // Set sumber iframe PDF secara dinamis
            if (pdfIframe && pdfSrc) pdfIframe.src = pdfSrc;

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
                
                // Opsional: Hapus src saat ditutup agar tidak membebani memori di background
                if (pdfIframe) pdfIframe.src = ""; 
            }
        });
    });

    // Menutup modal jika klik di area overlay gelap luar
    if (pdfModal) {
        pdfModal.addEventListener("click", function (e) {
            if (e.target === pdfModal) {
                pdfModal.classList.add("d-none");
                document.body.style.overflow = "";
                if (pdfIframe) pdfIframe.src = ""; 
            }
        });
    }

});

// 8. Logika Modal QR Code AR
const qrModal = document.getElementById("qr-modal");
const closeQrBtns = document.querySelectorAll("#btn-close-qr, #btn-close-qr-footer");
const openQrBtns = document.querySelectorAll(".btn-open-qr");

const qrModalTitle = document.getElementById("qr-modal-title-text");
const qrModalImg = document.getElementById("qr-modal-img");
const qrModalLink = document.getElementById("qr-modal-link");

// Event ketika tombol 'Tampilkan QR' atau gambar QR di-klik
openQrBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Ambil data spesifik dari kartu yang di-klik
        const title = this.getAttribute("data-title");
        const src = this.getAttribute("data-src");
        const link = this.getAttribute("data-link");

        // Pasang data tersebut ke dalam modal
        if (qrModalTitle && title) qrModalTitle.textContent = title;
        if (qrModalImg && src) qrModalImg.src = src;
        if (qrModalLink && link) qrModalLink.href = link;

        // Tampilkan Modal
        if (qrModal) {
            qrModal.classList.remove("d-none");
            document.body.style.overflow = "hidden"; // Kunci scroll latar
        }
    });
});

// Event untuk menutup modal QR
closeQrBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        if (qrModal) {
            qrModal.classList.add("d-none");
            document.body.style.overflow = ""; // Kembalikan fungsi scroll
        }
    });
});

// Menutup modal jika klik di area overlay gelap luar
if (qrModal) {
    qrModal.addEventListener("click", function (e) {
        if (e.target === qrModal) {
            qrModal.classList.add("d-none");
            document.body.style.overflow = "";
        }
    });
}

// ==========================================
    // LOGIKA MODAL MULTI-CHAPTER PDF (BUKU MODUL LENGKAP)
    // ==========================================
    const multiPdfModal = document.getElementById("multi-pdf-modal");
    const btnOpenMultiPdf = document.querySelector(".btn-open-multi-pdf");
    const btnCloseMultiPdf = document.getElementById("btn-close-multi-pdf");
    
    const chapterBtns = document.querySelectorAll(".chapter-btn");
    const multiPdfIframe = document.getElementById("multi-pdf-iframe");
    const multiPdfTitleText = document.getElementById("multi-pdf-title-text");

    // Buka Modal Multi-Bab
    if (btnOpenMultiPdf) {
        btnOpenMultiPdf.addEventListener("click", function (e) {
            e.preventDefault();
            if (multiPdfModal) {
                multiPdfModal.classList.remove("d-none");
                document.body.style.overflow = "hidden"; // Kunci scroll halaman
            }
        });
    }

    // Tutup Modal Multi-Bab
    if (btnCloseMultiPdf) {
        btnCloseMultiPdf.addEventListener("click", function () {
            if (multiPdfModal) {
                multiPdfModal.classList.add("d-none");
                document.body.style.overflow = ""; // Kembalikan scroll
                // Opsional: Matikan iframe saat ditutup untuk hemat resource
                // multiPdfIframe.src = ""; 
            }
        });
    }

    // Menutup modal jika klik di overlay luar
    if (multiPdfModal) {
        multiPdfModal.addEventListener("click", function (e) {
            if (e.target === multiPdfModal) {
                multiPdfModal.classList.add("d-none");
                document.body.style.overflow = "";
            }
        });
    }

    // Logika ganti Bab PDF
    chapterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            // Hapus class 'active' dari semua tombol bab
            chapterBtns.forEach(b => b.classList.remove("active"));
            
            // Tambahkan class 'active' ke tombol yang diklik
            this.classList.add("active");

            // Ambil URL PDF dan Judul Bab
            const targetPdfSrc = this.getAttribute("data-src");
            const chapterTitle = this.textContent;

            // Ganti src Iframe dan ganti Teks Judul
            if (multiPdfIframe && targetPdfSrc) {
                multiPdfIframe.src = targetPdfSrc;
            }
            if (multiPdfTitleText) {
                multiPdfTitleText.textContent = chapterTitle;
            }
        });
    });

// ==========================================
// LOGIKA PERGANTIAN MODEL 3D OFFLINE
// ==========================================

const arData = {
    'kajang-lako': {
        src: './public/rumah_adat_tradisional_jambi_kajang_lako.glb',
        title: 'Rumah Kajang Lako',
        subtitle: 'Arsitektur Tradisional Jambi',
        desc: 'Rumah Kajang Lako atau Rumah Tuo adalah rumah tradisional masyarakat Provinsi Jambi. Bangunan panggung berbahan kayu ulin dengan denah persegi panjang ini sarat nilai filosofis yang mencerminkan aturan hidup masyarakat adat Jambi.',
        geoList: `
                <li><span class="dot-purple"></span><strong>Bentuk Badan:</strong> Badan rumah menyerupai bangun ruang <strong>Balok</strong> yang simetris.</li>
                <li><span class="dot-purple"></span><strong>Struktur Atap:</strong> Atap melengkung menyerupai perahu merupakan modifikasi dari bentuk geometri <strong>Prisma Segitiga</strong>.</li>
                <li><span class="dot-purple"></span><strong>Tiang Penyangga:</strong> Memanfaatkan struktur kokoh berbentuk <strong>Tabung (Silinder)</strong> atau Prisma Segi Empat sebagai pondasi panggung.</li>
            `
    },
    'candi-muaro': {
        src: './public/candimuarojambi.glb',
        title: 'Candi Muaro Jambi',
        subtitle: 'Kawasan Percandian Buddha',
        desc: 'Kompleks Candi Muaro Jambi adalah kawasan percandian agama Buddha peninggalan Kerajaan Sriwijaya dan Melayu Kuno. Bangunan didirikan dari susunan bata merah tanpa semen perekat dengan teknik tata letak geometris presisi tinggi.',
        geoList: `
                <li><span class="dot-purple"></span><strong>Bentuk Dasar:</strong> Stupa dan badan candi tersusun dari tumpukan bata yang membentuk dasar <strong>Persegi</strong> dan <strong>Balok</strong> yang proporsional.</li>
                <li><span class="dot-purple"></span><strong>Struktur Undakan:</strong> Membentuk pola <strong>Limas Segi Empat Terpancung</strong> yang berundak menuju ke arah puncak.</li>
                <li><span class="dot-purple"></span><strong>Presisi Sudut:</strong> Pertemuan antar susunan batu bata membentuk sudut siku-siku (90 derajat) yang sangat rapi di setiap sisinya.</li>
            `
    },
    'candi-apit': {
        src: './public/candiapit.glb',
        title: 'Candi Apit (Prambanan)',
        subtitle: 'Arsitektur Candi Hindu',
        desc: 'Candi Apit merupakan bangunan pendamping di kompleks Candi Prambanan (Jawa Tengah/DIY) yang mengapit pelataran utama. Berbeda dengan candi di Jambi yang berbata merah, Candi Apit terbuat dari batu andesit dengan struktur ramping yang menjulang.',
        geoList: `
                <li><span class="dot-purple"></span><strong>Bentuk Dasar:</strong> Denah alas bangunan berbentuk <strong>Persegi (Bujur Sangkar)</strong> yang menopang dinding badan candi berbentuk <strong>Balok</strong>.</li>
                <li><span class="dot-purple"></span><strong>Kemuncak (Atap):</strong> Struktur atap bertingkat meruncing ke atas menyerupai bangun ruang <strong>Limas Segi Empat</strong>.</li>
                <li><span class="dot-purple"></span><strong>Fraktal Geometri:</strong> Menampilkan pengulangan bentuk mahkota mini yang sebangun pada tingkat atap yang berbeda.</li>
            `
    }
};

const arButtons = document.querySelectorAll('#ar-buttons-container .shape-pill');
const arModelViewer = document.getElementById('ar-model-viewer');
const arStageTitle = document.getElementById('ar-stage-title');
const arInfoTitle = document.getElementById('ar-info-title');
const arInfoSubtitle = document.getElementById('ar-info-subtitle');
const arInfoDesc = document.getElementById('ar-info-desc');
const arGeoList = document.getElementById('ar-geo-list');

arButtons.forEach(button => {
    button.addEventListener('click', function () {
        arButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const selectedKey = this.getAttribute('data-model');
        const data = arData[selectedKey];

        if (data) {
            if (arModelViewer) arModelViewer.src = data.src;
            if (arStageTitle) arStageTitle.textContent = data.title;
            if (arInfoTitle) arInfoTitle.textContent = data.title;
            if (arInfoSubtitle) arInfoSubtitle.textContent = data.subtitle;
            if (arInfoDesc) arInfoDesc.textContent = data.desc;
            if (arGeoList) arGeoList.innerHTML = data.geoList;
        }
    });
});

if (arModelViewer) {
    arModelViewer.addEventListener('load', () => {
        const materials = arModelViewer.model.materials;
        if (materials) {
            materials.forEach(material => {
                material.setAlphaMode('OPAQUE');
            });
        }
    });
}

// ==========================================
// LOGIKA TUTOR AI & REPOSITORI PROMPT
// ==========================================

window.copyPrompt = function(elementId, btnElement) {
    const promptText = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(promptText).then(() => {
        const originalHTML = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="ph-fill ph-check-circle" style="color: #10b981;"></i>';
        setTimeout(() => { btnElement.innerHTML = originalHTML; }, 2000);
    });
};

const chatHistory = document.getElementById("chat-history");
const tutorInput = document.getElementById("tutor-input");

window.runPromptInTutor = function(elementId) {
    const promptText = document.getElementById(elementId).innerText;
    if (tutorInput) {
        tutorInput.value = promptText;
        tutorInput.focus();
    }
};

window.sendChatMessage = function() {
    if (!tutorInput || !chatHistory) return;
    const message = tutorInput.value.trim();
    if (message === "") return;

    // 1. Tampilkan Bubble Pengguna
    const userBubble = document.createElement("div");
    userBubble.className = "chat-bubble user-bubble";
    userBubble.innerHTML = `<div class="bubble-content">${message}</div>`;
    chatHistory.appendChild(userBubble);

    tutorInput.value = "";
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // 2. Tampilkan Indikator Mengetik
    const typingBubble = document.createElement("div");
    typingBubble.className = "chat-bubble ai-bubble typing-indicator";
    typingBubble.innerHTML = `<div class="bubble-content" style="color: #94a3b8;"><i class="ph ph-dots-three ph-spin"></i> AI sedang menganalisis pemodelan...</div>`;
    chatHistory.appendChild(typingBubble);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // 3. Respon AI Berdasarkan Kata Kunci
    setTimeout(() => {
        typingBubble.remove();

        const lowerMsg = message.toLowerCase();
        let reply = "";

        if (lowerMsg.includes("prisma") || lowerMsg.includes("jaring")) {
            reply = "Untuk menganalisis jaring-jaring prisma, mulailah dari mengidentifikasi dua sisi alas yang kongruen dan sejajar. Bidang tegaknya selalu berupa persegi panjang sejumlah sisi alasnya.";
        } else if (lowerMsg.includes("limas") || lowerMsg.includes("muaro") || lowerMsg.includes("terpancung")) {
            reply = "Pada Candi Muaro Jambi, struktur berundak membentuk limas segi empat terpancung (frustum). Volume dapat dihitung dengan rumus: $V = \\frac{1}{3}h(A_1 + A_2 + \\sqrt{A_1 A_2})$.";
        } else if (lowerMsg.includes("formulate") || lowerMsg.includes("employ") || lowerMsg.includes("interpret")) {
            reply = "Alur pemecahan masalah PISA Anda sudah terstruktur. Pastikan di tahap <strong>Interpret</strong>, hasil numerik dikembalikan ke konteks fisik (misalnya mempertimbangkan ketebalan sambungan atau ketersediaan bahan di dunia nyata).";
        } else {
            reply = `Pertanyaan Anda mengenai pemodelan geometri telah diterima: <em>"${message.substring(0, 60)}..."</em>. Disarankan untuk memvalidasi variabel ukuran dengan membuka lembar latihan di tab <strong>Bahan Ajar</strong> atau mengamati model pada <strong>Simulator 3D</strong>.`;
        }

        const aiBubble = document.createElement("div");
        aiBubble.className = "chat-bubble ai-bubble";
        aiBubble.innerHTML = `<div class="bubble-content">${reply}</div>`;
        chatHistory.appendChild(aiBubble);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1200);
};

if (tutorInput) {
    tutorInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });
}