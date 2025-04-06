


function searchNIC() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let resultContainer = document.getElementById("nic-results");
    
    // Don't show any message if the input is empty
    if (!input.trim()) {
    resultContainer.innerHTML = "";
    return;
    }
    
    // If input is a direct NIC code match
    if (nicData[input]) {
    resultContainer.innerHTML = `<div class="nic-item"><strong>${input}</strong> - ${nicData[input]}</div>`;
    return;
    }
    
    // Search for partial matches in both code and description
    let matches = [];
    for (let code in nicData) {
    if (code.includes(input) || nicData[code].toLowerCase().includes(input)) {
    matches.push({ code: code, description: nicData[code] });
    }
    }
    
    if (matches.length > 0) {
    let resultsHTML = matches.map(match =>
    `<div class="nic-item"><strong>${match.code}</strong> - ${match.description}</div>`
    ).join('');
    resultContainer.innerHTML = resultsHTML;
    } else {
    resultContainer.innerHTML = "<div class='nic-item'>No results found. Try searching with different keywords or a NIC code.</div>";
    }
    }
    
    function populateNIC(code) {
    document.getElementById("searchBox").value = code;
    searchNIC();
    }
    
    
    // Google Translate API Initialization
    function googleTranslateElementInit() {
    new google.translate.TranslateElement({
    pageLanguage: 'en-IN',
    includedLanguages: 'hi,bn,gu,kn,ml,mr,or,pa,ta,te',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
    }, 'google_translate_element');
    }
    
    function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    const selectedLanguage = languageSelect.value;
    
    // Get the Google Translate select element
    const googleFrame = document.querySelector('.goog-te-combo');
    if (googleFrame) {
    // Convert language code from xx-IN to xx format for Google Translate
    const translateCode = selectedLanguage.split('-')[0];
    googleFrame.value = translateCode;
    googleFrame.dispatchEvent(new Event('change'));
    
    // Update voice recognition language if it's being used
    if (window.recognition) {
    window.recognition.lang = selectedLanguage;
    }
    } else {
    console.error('Google Translate widget not found');
    }
    }
    
    // Initialize translation and speech recognition on page load
    document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById("searchBox");
    const voiceButton = document.getElementById("voiceButton");
    
    // Check if Speech Recognition API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    window.recognition = recognition; // Store it globally to access in changeLanguage
    recognition.lang = "en-IN"; // Default language
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = function() {
    // Visual feedback when recording starts
    voiceButton.classList.add('active');
    };
    
    recognition.onend = function() {
    // Reset button appearance when recording ends
    voiceButton.classList.remove('active');
    };
    
    recognition.onerror = function(event) {
    // Handle errors
    console.error('Speech recognition error:', event.error);
    let errorMessage = '';
    switch(event.error) {
    case 'network':
    errorMessage = 'Network error occurred. Please check your internet connection.';
    break;
    case 'not-allowed':
    case 'permission-denied':
    errorMessage = 'Microphone permission is required for voice search.';
    break;
    case 'no-speech':
    errorMessage = 'No speech was detected. Please try again.';
    break;
    default:
    errorMessage = 'An error occurred with the voice recognition.';
    }
    alert(errorMessage);
    voiceButton.classList.remove('active');
    };
    
    recognition.onresult = function (event) {
    const transcript = event.results[0][0].transcript.trim();
    searchBox.value = transcript; // Insert recognized text into input
    // Remove automatic search
    };
    
    voiceButton.addEventListener("click", function () {
    // Check if we're on HTTPS or localhost
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    alert('Voice recognition requires HTTPS. Please access this site using HTTPS (https:// in the URL).\n\nIf you are using GitHub Pages, please ensure HTTPS is enabled in your repository settings.');
    return;
    }
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Your browser does not support voice recognition. Please use Chrome or Edge on desktop/Android, or Safari on iOS.');
    return;
    }
    
    try {
    recognition.start();
    } catch (error) {
    console.error('Recognition error:', error);
    if (error.name === 'NotAllowedError') {
    alert('Microphone access was denied. Please allow microphone access in your browser settings to use voice recognition.');
    } else {
    alert('Could not start voice recognition. Please ensure you are:\n1. Using a supported browser (Chrome, Edge, or Safari)\n2. Have granted microphone permissions\n3. Are connected to the internet');
    }
    }
    });
    } else {
    voiceButton.style.display = 'none'; // Hide the button if not supported
    console.log('Speech Recognition not supported in this browser');
    }
    
    // Wait for Google Translate to load
    setTimeout(() => {
    const googleFrame = document.querySelector('.goog-te-combo');
    if (googleFrame) {
    // Sync the language selector with Google Translate
    const languageSelect = document.getElementById('languageSelect');
    const translateCode = languageSelect.value.split('-')[0];
    googleFrame.value = translateCode;
    googleFrame.dispatchEvent(new Event('change'));
    }
    }, 1000);
    
    // Dark mode initialization
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference, if any, load the value from localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // Set initial dark mode state
    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode.matches)) {
    document.body.classList.add('dark-mode');
    }
    
    // Add event listener for dark mode toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Check for saved color blind mode preference
    const savedColorBlindMode = localStorage.getItem('colorBlindMode');
    if (savedColorBlindMode === 'true') {
    document.body.classList.add('color-blind-mode');
    }
    });
    
    // Dark Mode Toggle
    function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    }
    
    // Font size control functionality
    let currentFontSize = 16; // Default font size
    const minFontSize = 12;
    const maxFontSize = 24;
    const fontSizeStep = 2;
    
    function changeFontSize(action) {
    if (action === 'increase' && currentFontSize < maxFontSize) {
    currentFontSize += fontSizeStep;
    } else if (action === 'decrease' && currentFontSize > minFontSize) {
    currentFontSize -= fontSizeStep;
    }
    
    // Apply the new font size to the body
    document.body.style.fontSize = currentFontSize + 'px';
    
    // Adjust specific elements that need different scaling
    const headerTitle = document.querySelector('.header-text h1');
    const headerSubtitle = document.querySelector('.header-text p');
    const searchBox = document.getElementById('searchBox');
    const searchButton = document.querySelector('.search-button');
    const popularCodesTitle = document.querySelector('.popular-codes h3');
    
    if (headerTitle) headerTitle.style.fontSize = (currentFontSize + 8) + 'px';
    if (headerSubtitle) headerSubtitle.style.fontSize = (currentFontSize + 2) + 'px';
    if (searchBox) searchBox.style.fontSize = currentFontSize + 'px';
    if (searchButton) searchButton.style.fontSize = currentFontSize + 'px';
    if (popularCodesTitle) popularCodesTitle.style.fontSize = (currentFontSize + 4) + 'px';
    }
    
    // Color Blind Mode Toggle
    function toggleColorBlindMode() {
    document.body.classList.toggle('color-blind-mode');
    // Save preference to localStorage
    const isColorBlindMode = document.body.classList.contains('color-blind-mode');
    localStorage.setItem('colorBlindMode', isColorBlindMode);
    }