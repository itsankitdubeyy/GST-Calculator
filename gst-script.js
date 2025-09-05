// GST calculation mode
let isAddGst = true;

// Calculate GST
function calculateGST() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const gstRate = parseFloat(document.getElementById('gstRate').value) || 0;
    
    let basePrice, gstAmount, totalPrice;
    
    if (isAddGst) {
        // Add GST: amount is base price
        basePrice = amount;
        gstAmount = (basePrice * gstRate) / 100;
        totalPrice = basePrice + gstAmount;
    } else {
        // Remove GST: amount is total price
        totalPrice = amount;
        basePrice = totalPrice / (1 + gstRate / 100);
        gstAmount = totalPrice - basePrice;
    }
    
    // Update results
    document.getElementById('basePrice').textContent = `₹${basePrice.toLocaleString('en-IN', {maximumFractionDigits: 2})}`;
    document.getElementById('gstAmount').textContent = `₹${gstAmount.toLocaleString('en-IN', {maximumFractionDigits: 2})}`;
    document.getElementById('totalPrice').textContent = `₹${totalPrice.toLocaleString('en-IN', {maximumFractionDigits: 2})}`;
    
    // Show results with animation
    const results = document.getElementById('results');
    results.classList.remove('opacity-0');
    results.classList.add('opacity-100');
}

// Toggle between Add GST and Remove GST
function toggleGstMode(mode) {
    const addBtn = document.getElementById('addGstBtn');
    const removeBtn = document.getElementById('removeGstBtn');
    const amountLabel = document.querySelector('label[for="amount"]');
    
    if (mode === 'add') {
        isAddGst = true;
        addBtn.className = 'flex-1 py-3 px-4 rounded-lg bg-primary text-white font-semibold transition-all duration-200';
        removeBtn.className = 'flex-1 py-3 px-4 rounded-lg text-gray-600 dark:text-gray-300 font-semibold transition-all duration-200 hover:text-primary';
        amountLabel.textContent = 'Amount (₹)';
        document.getElementById('amount').placeholder = 'Enter base amount';
    } else {
        isAddGst = false;
        removeBtn.className = 'flex-1 py-3 px-4 rounded-lg bg-primary text-white font-semibold transition-all duration-200';
        addBtn.className = 'flex-1 py-3 px-4 rounded-lg text-gray-600 dark:text-gray-300 font-semibold transition-all duration-200 hover:text-primary';
        amountLabel.textContent = 'Total Amount (₹)';
        document.getElementById('amount').placeholder = 'Enter total amount';
    }
    
    calculateGST();
}

// Clear calculator
function clearCalculator() {
    document.getElementById('amount').value = '';
    document.getElementById('gstRate').value = '18';
    document.getElementById('basePrice').textContent = '₹0';
    document.getElementById('gstAmount').textContent = '₹0';
    document.getElementById('totalPrice').textContent = '₹0';
    
    const results = document.getElementById('results');
    results.classList.remove('opacity-100');
    results.classList.add('opacity-0');
}

// Theme toggle functionality
function toggleTheme() {
    const html = document.documentElement;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const html = document.documentElement;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Real-time calculation
    document.getElementById('amount').addEventListener('input', calculateGST);
    document.getElementById('gstRate').addEventListener('input', calculateGST);
    
    // Mode toggle buttons
    document.getElementById('addGstBtn').addEventListener('click', () => toggleGstMode('add'));
    document.getElementById('removeGstBtn').addEventListener('click', () => toggleGstMode('remove'));
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Initialize theme
    initTheme();
});