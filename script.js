// Complete Stoppages List (24 Stops)
const stoppages = [
    "Rampura Bridge", "Merul Badda", "Badda", "Hosen Market", "Notun Bazar",
    "Coca-Cola", "Norda", "Bashundhara", "Jamuna Future Park", "Kuril Kazibari",
    "Kuril Bishowroad", "Khilkhet", "Hotel Meridian", "Airport", "Uttara BNS",
    "House Building", "Bangladesh Medical", "Zam-Zam Tower", "Uttara Thana r More",
    "Uttara Moilar More", "Uttara Khalpar", "Uttara 2 no Bridge",
    "Uttara Center (Metro Station)", "Manarat International University Campus (Destination)"
];

// Bus Configuration
const busData = {
    male: {
        name: "Bus - 1 (Male)",
        driver: "Zia",
        phone: "01576984090",
        phoneHref: "tel:01576984090",
        location: "1. Rampura Bridge (ছাড়ার অপেক্ষায়)"
    },
    female: {
        name: "Bus - 2 (Female)",
        driver: "Al-Amin",
        phone: "01862661127",
        phoneHref: "tel:01862661127",
        location: "1. Rampura Bridge (ছাড়ার অপেক্ষায়)"
    }
};

window.onload = function() {
    renderStoppages();
    checkUserSession();
};

// Render Stoppage List with Click Functionality
function renderStoppages() {
    const list = document.getElementById('stoppageList');
    list.innerHTML = stoppages.map((s, index) => `
        <li onclick="selectStoppage('${s}', ${index + 1})" 
            class="p-2.5 hover:bg-blue-100 rounded-lg transition cursor-pointer flex justify-between items-center border-b border-gray-200">
            <span><strong class="text-blue-800 mr-2">${index + 1}.</strong> ${s}</span>
            <i class="fa-solid fa-chevron-right text-gray-400 text-xs"></i>
        </li>
    `).join('');
}

// Select Stoppage Action (Without Alert Popup)
function selectStoppage(name, serial) {
    document.getElementById('currentLocation').innerText = `${serial}. ${name}`;
    document.getElementById('liveLocationCard').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Authentication Logic
function handleAuth(e) {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const email = document.getElementById('email').value;
    const name = document.getElementById('fullName').value || "Student";

    const user = { id, email, name };
    localStorage.setItem('miu_user', JSON.stringify(user));
    
    showDashboard(user);
}

function checkUserSession() {
    const savedUser = localStorage.getItem('miu_user');
    if (savedUser) {
        showDashboard(JSON.parse(savedUser));
    }
}

function showDashboard(user) {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
    document.getElementById('userInfo').classList.remove('hidden');
    document.getElementById('userName').innerText = `ID: ${user.id}`;
}

function logout() {
    localStorage.removeItem('miu_user');
    location.reload();
}

// Bus Selector (Male/Female)
function selectBus(type) {
    const data = busData[type];
    document.getElementById('busName').innerText = data.name;
    document.getElementById('driverName').innerText = data.driver;
    
    const phoneEl = document.getElementById('driverPhone');
    phoneEl.innerText = data.phone;
    phoneEl.href = data.phoneHref;

    document.getElementById('currentLocation').innerText = data.location;

    if(type === 'male') {
        document.getElementById('btnMale').className = "px-6 py-2.5 rounded-lg font-bold bg-blue-600 text-white shadow";
        document.getElementById('btnFemale').className = "px-6 py-2.5 rounded-lg font-bold bg-gray-200 text-gray-700 shadow hover:bg-pink-600 hover:text-white";
    } else {
        document.getElementById('btnMale').className = "px-6 py-2.5 rounded-lg font-bold bg-gray-200 text-gray-700 shadow hover:bg-blue-600 hover:text-white";
        document.getElementById('btnFemale').className = "px-6 py-2.5 rounded-lg font-bold bg-pink-600 text-white shadow";
    }
}