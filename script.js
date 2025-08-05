// Tab switching functionality
function openOption(event, conversionType) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    // Remove active class from all tab links
    const tabLinks = document.getElementsByClassName("links");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }
    
    // Show selected tab and mark button as active
    document.getElementById(conversionType).classList.add("active");
    event.currentTarget.classList.add("active");
}

// File Transfer Calculator
document.getElementById('file-calculate').addEventListener('click', function() {
    const fileSize = parseFloat(document.getElementById('file-size').value);
    const fileSizeUnit = document.getElementById('type-size').value;
    const internetSpeed = parseFloat(document.getElementById('int-speed').value);
    const speedUnit = document.getElementById('size-speed').value;
    const output = document.querySelector('.file-seconds');

    if (isNaN(fileSize) || isNaN(internetSpeed) || fileSize <= 0 || internetSpeed <= 0) {
        output.innerHTML = '<span class="error">Please enter valid positive numbers</span>';
        return;
    }

    // Convert file size to bytes
    let fileSizeInBytes;
    switch(fileSizeUnit) {
        case 'kb': fileSizeInBytes = fileSize * 1024; break;
        case 'mb': fileSizeInBytes = fileSize * 1024 * 1024; break;
        case 'gb': fileSizeInBytes = fileSize * 1024 * 1024 * 1024; break;
        case 'tb': fileSizeInBytes = fileSize * 1024 * 1024 * 1024 * 1024; break;
    }

    // Convert speed to bytes per second
    let speedInBytesPerSec;
    switch(speedUnit) {
        case 'kbps': speedInBytesPerSec = (internetSpeed * 1000) / 8; break;
        case 'mbps': speedInBytesPerSec = (internetSpeed * 1000000) / 8; break;
        case 'gbps': speedInBytesPerSec = (internetSpeed * 1000000000) / 8; break;
    }

    const timeInSeconds = fileSizeInBytes / speedInBytesPerSec;
    
    // Format time output
    let timeString = '';
    if (timeInSeconds < 60) {
        timeString = `${timeInSeconds.toFixed(1)} seconds`;
    } else if (timeInSeconds < 3600) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        timeString = `${minutes} minutes ${seconds} seconds`;
    } else if (timeInSeconds < 86400) {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        timeString = `${hours} hours ${minutes} minutes`;
    } else {
        const days = Math.floor(timeInSeconds / 86400);
        const hours = Math.floor((timeInSeconds % 86400) / 3600);
        timeString = `${days} days ${hours} hours`;
    }

    output.textContent = timeString;
});

// Temperature Converter
document.getElementById('temp-calculate').addEventListener('click', function() {
    const tempValue = parseFloat(document.getElementById('temp-val').value);
    const tempType = document.getElementById('temp-type').value;
    const output = document.querySelector('.temp-val');

    if (isNaN(tempValue)) {
        output.innerHTML = '<span class="error">Please enter a valid number</span>';
        return;
    }

    let celsius, fahrenheit, kelvin;

    // Convert to Celsius first
    switch(tempType) {
        case 'cel':
            celsius = tempValue;
            fahrenheit = (celsius * 9/5) + 32;
            kelvin = celsius + 273.15;
            break;
        case 'far':
            fahrenheit = tempValue;
            celsius = (fahrenheit - 32) * 5/9;
            kelvin = celsius + 273.15;
            break;
        case 'kel':
            kelvin = tempValue;
            celsius = kelvin - 273.15;
            fahrenheit = (celsius * 9/5) + 32;
            break;
    }

    output.innerHTML = `
        <strong>Celsius:</strong> ${celsius.toFixed(2)}°C<br>
        <strong>Fahrenheit:</strong> ${fahrenheit.toFixed(2)}°F<br>
        <strong>Kelvin:</strong> ${kelvin.toFixed(2)}K
    `;
});

// Scientific Notation Converter
document.getElementById('sci-calculate').addEventListener('click', function() {
    const sciValue = parseFloat(document.getElementById('sci-val').value);
    const output = document.querySelector('.scie-val');

    if (isNaN(sciValue)) {
        output.innerHTML = '<span class="error">Please enter a valid number</span>';
        return;
    }

    if (sciValue === 0) {
        output.textContent = '0.0 × 10⁰';
        return;
    }

    const scientific = sciValue.toExponential(3);
    const parts = scientific.split('e');
    const coefficient = parseFloat(parts[0]);
    const exponent = parseInt(parts[1]);

    // Format with superscript
    const superscriptMap = {
        '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
        '-': '⁻'
    };

    const expString = exponent.toString().split('').map(char => superscriptMap[char] || char).join('');
    
    output.innerHTML = `
        <strong>Scientific:</strong> ${coefficient} × 10${expString}<br>
        <strong>Standard:</strong> ${scientific}<br>
        <strong>Original:</strong> ${sciValue.toLocaleString()}
    `;
});

// Metric Prefix Converter
document.getElementById('metric-calculate').addEventListener('click', function() {
    const metricValue = parseFloat(document.getElementById('metric-val').value);
    const metricFrom = document.getElementById('metric-from').value;
    const metricTo = document.getElementById('metric-to').value;
    const output = document.querySelector('.metric-val');

    if (isNaN(metricValue)) {
        output.innerHTML = '<span class="error">Please enter a valid number</span>';
        return;
    }

    // Metric prefix multipliers
    const prefixes = {
        'tera': 1e12,
        'giga': 1e9,
        'mega': 1e6,
        'kilo': 1e3,
        'base': 1,
        'milli': 1e-3,
        'micro': 1e-6,
        'nano': 1e-9
    };

    // Convert to base unit first, then to target unit
    const baseValue = metricValue * prefixes[metricFrom];
    const convertedValue = baseValue / prefixes[metricTo];

    // Format the result
    let result;
    if (convertedValue >= 1e6 || convertedValue <= 1e-6) {
        result = convertedValue.toExponential(3);
    } else {
        result = convertedValue.toPrecision(6).replace(/\.?0+$/, '');
    }

    const prefixNames = {
        'tera': 'T', 'giga': 'G', 'mega': 'M', 'kilo': 'k',
        'base': '', 'milli': 'm', 'micro': 'µ', 'nano': 'n'
    };

    output.innerHTML = `
        <strong>Result:</strong> ${result} ${prefixNames[metricTo]}<br>
        <strong>From:</strong> ${metricValue} ${prefixNames[metricFrom]}<br>
        <strong>To:</strong> ${result} ${prefixNames[metricTo]}
    `;
});

// Initialize with first tab active
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('file').classList.add('active');
});
