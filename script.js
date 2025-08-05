// Tab switching functionality
function openOption(event, conversionType) {
    // Hide all tab contents and remove active class from all tab links
    document.querySelectorAll(".tab-content, .links").forEach(el => {
        el.classList.remove("active");
    });

    // Show selected tab and mark button as active
    document.getElementById(conversionType).classList.add("active");
    event.currentTarget.classList.add("active");
}

// Conversion functions
function convertFileSize() {
    const fileSize = parseFloat(document.getElementById('file-size').value);
    const fileSizeUnit = document.getElementById('type-size').value;
    const internetSpeed = parseFloat(document.getElementById('int-speed').value);
    const speedUnit = document.getElementById('size-speed').value;
    const output = document.querySelector('.file-seconds');

    if (isNaN(fileSize) || isNaN(internetSpeed) || fileSize <= 0 || internetSpeed <= 0) {
        output.innerHTML = '<span class="error">Please enter valid positive numbers</span>';
        return;
    }

    const fileSizeInBytes = fileSize * Math.pow(1024, ['bytes', 'kb', 'mb', 'gb', 'tb'].indexOf(fileSizeUnit));
    const speedInBytesPerSec = internetSpeed * Math.pow(1000, ['bps', 'kbps', 'mbps', 'gbps'].indexOf(speedUnit)) / 8;
    const timeInSeconds = fileSizeInBytes / speedInBytesPerSec;

    output.textContent = formatTime(timeInSeconds);
}

function convertTemperature() {
    const tempValue = parseFloat(document.getElementById('temp-val').value);
    const tempType = document.getElementById('temp-type').value;
    const output = document.querySelector('.temp-val');

    if (isNaN(tempValue)) {
        output.innerHTML = '<span class="error">Please enter a valid number</span>';
        return;
    }

    const conversions = {
        'cel': { celsius: tempValue, fahrenheit: (tempValue * 9/5) + 32, kelvin: tempValue + 273.15 },
        'far': { celsius: (tempValue - 32) * 5/9, fahrenheit: tempValue, kelvin: (tempValue - 32) * 5/9 + 273.15 },
        'kel': { celsius: tempValue - 273.15, fahrenheit: (tempValue - 273.15) * 9/5 + 32, kelvin: tempValue }
    };

    const { celsius, fahrenheit, kelvin } = conversions[tempType];

    output.innerHTML = `
        <strong>Celsius:</strong> ${celsius.toFixed(2)}°C<br>
        <strong>Fahrenheit:</strong> ${fahrenheit.toFixed(2)}°F<br>
    `;
}

function convertScientificNotation() {
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
    const [coefficient, exponent] = scientific.split('e');

    const superscriptDigits = exponent.split('').map(d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d] || '⁻').join('');

    output.innerHTML = `
        <strong>Scientific:</strong> ${coefficient} × 10${superscriptDigits}<br>
        <strong>Standard:</strong> ${scientific}<br>
        <strong>Original:</strong> ${sciValue.toLocaleString()}
    `;
}

function convertMetricPrefix() {
    const metricValue = parseFloat(document.getElementById('metric-val').value);
    const metricFrom = document.getElementById('metric-from').value;
    const metricTo = document.getElementById('metric-to').value;
    const output = document.querySelector('.metric-val');

    if (isNaN(metricValue)) {
        output.innerHTML = '<span class="error">Please enter a valid number</span>';
        return;
    }

    const prefixes = {
        'tera': 1e12, 'giga': 1e9, 'mega': 1e6, 'kilo': 1e3,
        'base': 1, 'milli': 1e-3, 'micro': 1e-6, 'nano': 1e-9
    };

    const prefixSymbols = {
        'tera': 'T', 'giga': 'G', 'mega': 'M', 'kilo': 'k',
        'base': '', 'milli': 'm', 'micro': 'µ', 'nano': 'n'
    };

    const convertedValue = metricValue * prefixes[metricFrom] / prefixes[metricTo];
    const result = convertedValue >= 1e6 || convertedValue <= 1e-6
        ? convertedValue.toExponential(3)
        : convertedValue.toPrecision(6).replace(/\.?0+$/, '');

    output.innerHTML = `
        <strong>Result:</strong> ${result} ${prefixSymbols[metricTo]}<br>
        <strong>From:</strong> ${metricValue} ${prefixSymbols[metricFrom]}<br>
        <strong>To:</strong> ${result} ${prefixSymbols[metricTo]}
    `;
}

// Helper function to format time
function formatTime(seconds) {
    if (seconds < 60) return `${seconds.toFixed(1)} seconds`;
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes} minutes ${remainingSeconds} seconds`;
    }
    if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hours ${remainingMinutes} minutes`;
    }
    const days = Math.floor(seconds / 86400);
    const remainingHours = Math.floor((seconds % 86400) / 3600);
    return `${days} days ${remainingHours} hours`;
}

// Event listeners
document.getElementById('file-calculate').addEventListener('click', convertFileSize);
document.getElementById('temp-calculate').addEventListener('click', convertTemperature);
document.getElementById('sci-calculate').addEventListener('click', convertScientificNotation);
document.getElementById('metric-calculate').addEventListener('click', convertMetricPrefix);

// Initialize with first tab active
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('file').classList.add('active');
});
