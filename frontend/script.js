const fileInput = document.getElementById("fileInput");
const browseBtn = document.getElementById("browseBtn");
const uploadBox = document.getElementById("uploadBox");

const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const fileName = document.getElementById("fileName");

const analyzeBtn = document.getElementById("analyzeBtn");
const loading = document.getElementById("loading");
const resultCard = document.getElementById("resultCard");
const prediction = document.getElementById("prediction");

const covidConfidence = document.getElementById("covidConfidence");
const normalConfidence = document.getElementById("normalConfidence");
const pneumoniaConfidence = document.getElementById("pneumoniaConfidence");

const covidBar = document.getElementById("covidBar");
const normalBar = document.getElementById("normalBar");
const pneumoniaBar = document.getElementById("pneumoniaBar");

const resetBtn = document.getElementById("resetBtn");

let selectedFile = null;


/* =========================
   OPEN FILE SELECTOR
========================= */

browseBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    fileInput.click();

});


uploadBox.addEventListener("click", function () {

    fileInput.click();

});


/* =========================
   FILE SELECTED
========================= */

fileInput.addEventListener("change", function () {

    if (fileInput.files.length === 0) {
        return;
    }

    selectedFile = fileInput.files[0];

    showPreview(selectedFile);

});


/* =========================
   SHOW PREVIEW
========================= */

function showPreview(file) {

    const reader = new FileReader();

    reader.onload = function (event) {

        previewImage.src = event.target.result;

        fileName.textContent = file.name;

        uploadBox.style.display = "none";

        previewContainer.style.display = "grid";

        resultCard.style.display = "none";

    };

    reader.readAsDataURL(file);

}


/* =========================
   ANALYZE IMAGE
========================= */

analyzeBtn.addEventListener("click", async function () {

    if (!selectedFile) {

        alert("Please select an X-ray image first.");

        return;

    }


    previewContainer.style.display = "none";

    loading.style.display = "block";

    resultCard.style.display = "none";


    const formData = new FormData();

    formData.append("file", selectedFile);


    try {

        const response = await fetch(
    "https://covid-xray-project.fastapicloud.dev/predict",
    {
        method: "POST",
        body: formData
    }
    );


        if (!response.ok) {

            throw new Error(
                "Server returned an error: " + response.status
            );

        }


        const data = await response.json();


        loading.style.display = "none";

        showResult(data);


    } catch (error) {

        loading.style.display = "none";

        previewContainer.style.display = "grid";

        alert(
            "Could not connect to the AI server.\n\n" +
            "Make sure FastAPI is running."
        );

        console.error(error);

    }

});


/* =========================
   SHOW RESULT
========================= */
function showResult(data) {

    resultCard.style.display = "block";

    // Handle non-X-ray images
    if (data.prediction === "NOT_X_RAY") {

        prediction.textContent = "NOT X-RAY";

        covidConfidence.textContent = "—";
        normalConfidence.textContent = "—";
        pneumoniaConfidence.textContent = "—";

        covidBar.style.width = "0%";
        normalBar.style.width = "0%";
        pneumoniaBar.style.width = "0%";

        alert(data.message || "Please upload a chest X-ray image.");

        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;
    }

    // Handle X-ray classification
    prediction.textContent = data.prediction;

    const covid = data.confidence?.COVID || 0;
    const normal = data.confidence?.NORMAL || 0;
    const pneumonia = data.confidence?.PNEUMONIA || 0;

    covidConfidence.textContent =
        covid.toFixed(2) + "%";

    normalConfidence.textContent =
        normal.toFixed(2) + "%";

    pneumoniaConfidence.textContent =
        pneumonia.toFixed(2) + "%";

    setTimeout(function () {

        covidBar.style.width = covid + "%";
        normalBar.style.width = normal + "%";
        pneumoniaBar.style.width = pneumonia + "%";

    }, 100);

    resultCard.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}



/* =========================
   RESET
========================= */

resetBtn.addEventListener("click", function () {

    selectedFile = null;

    fileInput.value = "";

    previewImage.src = "";

    fileName.textContent = "";

    covidBar.style.width = "0%";
    normalBar.style.width = "0%";
    pneumoniaBar.style.width = "0%";

    uploadBox.style.display = "flex";

    previewContainer.style.display = "none";

    resultCard.style.display = "none";

    window.location.hash = "scanner";
});
// ===============================
// LANGUAGE TRANSLATION SYSTEM
// ===============================

const languageButtons = document.querySelectorAll(".language-btn");

const translations = {

    en: {
        navHome: "Home",
        navScanner: "Scanner",
        navAbout: "About",

        heroBadge: "AI-POWERED X-RAY ANALYSIS",
        heroTitle1: "Intelligent",
        heroTitle2: "X-Ray",
        heroTitle3: "Classification",
        heroDescription:
            "Upload a chest X-ray and let our machine-learning model classify it into COVID, Normal, or Pneumonia.",
        startBtn: "Start Analysis →",

        heroCardTitle: "AI Analysis System",
        heroCardStatus: "Ready for X-Ray",

        scannerBadge: "X-RAY SCANNER",
        scannerTitle1: "Upload Your",
        scannerTitle2: "X-Ray",
        scannerDescription:
            "Select a chest X-ray image to begin analysis.",

        uploadTitle: "Upload X-Ray Image",
        uploadText: "Drag & drop your image here or",
        browseBtn: "browse",
        fileTypes: "PNG, JPG or JPEG",

        analyzeBtn: "Analyze X-Ray →",

        loadingTitle: "AI Scanning...",
        loadingText: "Our AI model is processing the image.",

        resultLabel: "AI MODEL PREDICTION",
        covidLabel: "COVID",
        normalLabel: "NORMAL",
        pneumoniaLabel: "PNEUMONIA",

        disclaimer:
            "This result is an AI model prediction for research/educational purposes and is not a medical diagnosis.",

        resetBtn: "Analyze Another Image",

        aboutBadge: "ABOUT PROJECT",
        aboutTitle1: "Machine Learning",
        aboutTitle2: "Behind The Scanner",
        aboutDescription:
            "This project uses chest X-ray images and a machine-learning classification model to distinguish between COVID, Normal, and Pneumonia image classes.",

        statImages: "X-Ray Images",
        statAccuracy: "Test Accuracy",
        statClasses: "Classes",

        footerTitle: "COVID X-Ray AI Classification Project",
        footerSubtitle: "Machine Learning Research Project"
    },


    fr: {
        navHome: "Accueil",
        navScanner: "Scanner",
        navAbout: "À propos",

        heroBadge: "ANALYSE DE RADIOGRAPHIE PAR IA",
        heroTitle1: "Classification",
        heroTitle2: "des",
        heroTitle3: "Radiographies",
        heroDescription:
            "Téléchargez une radiographie thoracique et notre modèle d'apprentissage automatique la classera en COVID, Normal ou Pneumonie.",
        startBtn: "Commencer l'analyse →",

        heroCardTitle: "Système d'analyse IA",
        heroCardStatus: "Prêt pour la radiographie",

        scannerBadge: "SCANNER DE RADIOGRAPHIE",
        scannerTitle1: "Téléchargez votre",
        scannerTitle2: "Radiographie",
        scannerDescription:
            "Sélectionnez une radiographie thoracique pour commencer l'analyse.",

        uploadTitle: "Télécharger une radiographie",
        uploadText: "Glissez-déposez votre image ici ou",
        browseBtn: "parcourir",
        fileTypes: "PNG, JPG ou JPEG",

        analyzeBtn: "Analyser la radiographie →",

        loadingTitle: "Analyse IA...",
        loadingText: "Notre modèle d'IA traite l'image.",

        resultLabel: "PRÉDICTION DU MODÈLE IA",
        covidLabel: "COVID",
        normalLabel: "NORMAL",
        pneumoniaLabel: "PNEUMONIE",

        disclaimer:
            "Ce résultat est une prédiction d'un modèle d'IA à des fins de recherche et d'éducation et ne constitue pas un diagnostic médical.",

        resetBtn: "Analyser une autre image",

        aboutBadge: "À PROPOS DU PROJET",
        aboutTitle1: "Apprentissage automatique",
        aboutTitle2: "Derrière le scanner",
        aboutDescription:
            "Ce projet utilise des radiographies thoraciques et un modèle de classification par apprentissage automatique pour distinguer les classes COVID, Normal et Pneumonie.",

        statImages: "Radiographies",
        statAccuracy: "Précision du test",
        statClasses: "Classes",

        footerTitle: "Projet de classification IA des radiographies COVID",
        footerSubtitle: "Projet de recherche en apprentissage automatique"
    },


    ur: {
        navHome: "Home",
        navScanner: "Scanner",
        navAbout: "About",

        heroBadge: "AI POWERED X-RAY ANALYSIS",
        heroTitle1: "Smart",
        heroTitle2: "X-Ray",
        heroTitle3: "Classification",
        heroDescription:
            "Chest X-ray upload karein aur hamara machine-learning model isay COVID, Normal ya Pneumonia mein classify karega.",
        startBtn: "Analysis Shuru Karein →",

        heroCardTitle: "AI Analysis System",
        heroCardStatus: "X-Ray ke liye Ready",

        scannerBadge: "X-RAY SCANNER",
        scannerTitle1: "Apni",
        scannerTitle2: "X-Ray Upload Karein",
        scannerDescription:
            "Analysis shuru karne ke liye chest X-ray image select karein.",

        uploadTitle: "X-Ray Image Upload Karein",
        uploadText: "Apni image yahan drag & drop karein ya",
        browseBtn: "browse karein",
        fileTypes: "PNG, JPG ya JPEG",

        analyzeBtn: "X-Ray Analyze Karein →",

        loadingTitle: "AI Scan Ho Raha Hai...",
        loadingText: "Hamara AI model image ko process kar raha hai.",

        resultLabel: "AI MODEL PREDICTION",
        covidLabel: "COVID",
        normalLabel: "NORMAL",
        pneumoniaLabel: "PNEUMONIA",

        disclaimer:
            "Yeh result research aur educational purpose ke liye AI model ki prediction hai aur medical diagnosis nahi hai.",

        resetBtn: "Dusri Image Analyze Karein",

        aboutBadge: "PROJECT KE BAARE MEIN",
        aboutTitle1: "Machine Learning",
        aboutTitle2: "Scanner ke Peeche",
        aboutDescription:
            "Yeh project chest X-ray images aur machine-learning classification model use karta hai jo COVID, Normal aur Pneumonia classes ko distinguish karta hai.",

        statImages: "X-Ray Images",
        statAccuracy: "Test Accuracy",
        statClasses: "Classes",

        footerTitle: "COVID X-Ray AI Classification Project",
        footerSubtitle: "Machine Learning Research Project"
    }
};


function translatePage(language) {

    const text = translations[language];

    Object.keys(text).forEach(function(id) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = text[id];
        }

    });

}


languageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const language = button.dataset.lang;

        translatePage(language);

        languageButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});
