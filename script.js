
        document.addEventListener("DOMContentLoaded", function() {
            const tabLinks = document.querySelectorAll(".link");
            const tabContents = document.querySelectorAll(".tab");
        
            tabLinks[0].classList.add('active');
            tabContents[0].classList.add('active');
        
            // Add a click event listener to each tab link
            tabLinks.forEach(link => {
                link.addEventListener("click", function(event) {
                    event.preventDefault(); 
        
                    // Get the ID of the target content div from the data-target attribute
                    const targetId = this.getAttribute("data-target");
        
                    // Deactivate all tab links and content divs
                    tabLinks.forEach(item => item.classList.remove("active"));
                    tabContents.forEach(content => content.classList.remove("active"));
        
                    // Activate the clicked link and its corresponding content div
                    this.classList.add("active");
                    document.getElementById(targetId).classList.add("active");
                });
            });
        
            // --- Converter Logic ---
        
            // File Transfer Calculator
            document.getElementById("file-calculate").addEventListener("click", () => {
                const fileSize = parseFloat(document.getElementById("file-size").value);
                const fileUnit = document.getElementById("type-size").value;
                const internetSpeed = parseFloat(document.getElementById("int-speed").value);
                const speedUnit = document.getElementById("size-speed").value;
        
                if (isNaN(fileSize) || isNaN(internetSpeed) || fileSize <= 0 || internetSpeed <= 0) {
                    document.querySelector("#file-output .file-seconds").textContent = "Invalid input. Please enter positive numbers.";
                    return;
                }
        
                // Convert all values to a base unit (e.g., Kilobytes) for calculation
                let sizeInKB = fileSize;
                if (fileUnit === "mb") sizeInKB = fileSize * 1024;
                if (fileUnit === "gb") sizeInKB = fileSize * 1024 * 1024;
        
                let speedInKBps = internetSpeed;
                if (speedUnit === "mb") speedInKBps = internetSpeed * 1024;
                if (speedUnit === "gb") speedInKBps = internetSpeed * 1024 * 1024;
        
                const timeInSeconds = sizeInKB / speedInKBps;
        
                // Display the result
                document.querySelector("#file-output .file-seconds").textContent = `${timeInSeconds.toFixed(2)} seconds`;
            });
        
            // Temperature Converter
            document.getElementById("temp-calculate").addEventListener("click", () => {
                const tempVal = parseFloat(document.getElementById("temp-val").value);
                const tempType = document.getElementById("temp-type").value;
                let result = '';
        
                if (isNaN(tempVal)) {
                    document.querySelector("#temp-output .temp-val").textContent = "Invalid input.";
                    return;
                }
        
                if (tempType === "cel") {
                    result = (tempVal * 9/5) + 32;
                    document.querySelector("#temp-output .temp-val").textContent = `${result.toFixed(2)} °F`;
                } else { 
                    result = (tempVal - 32) * 5/9;
                    document.querySelector("#temp-output .temp-val").textContent = `${result.toFixed(2)} °C`;
                }
            });
        
            document.getElementById("sci-calculate").addEventListener("click", () => {
                const sciVal = parseFloat(document.getElementById("sci-val").value);
        
                if (isNaN(sciVal)) {
                    document.querySelector("#scien-output .scie-val").textContent = "Invalid input.";
                    return;
                }
        
                document.querySelector("#scien-output .scie-val").textContent = sciVal.toExponential();
            });

            document.getElementById("metric-calculate").addEventListener("click", () => {
                const metricVal = parseFloat(document.getElementById("metric-val").value);
                const fromUnit = document.getElementById("metric-from").value;
                const toUnit = document.getElementById("metric-to").value;
        
                if (isNaN(metricVal)) {
                    document.querySelector("#metric-output .metric-val").textContent = "Invalid input.";
                    return;
                }
        
                const prefixes = {
                    'giga': 1e9,
                    'mega': 1e6,
                    'kilo': 1e3,
                    'base': 1,
                    'milli': 1e-3,
                    'micro': 1e-6
                };
        
                const baseValue = metricVal * prefixes[fromUnit];
                
                const result = baseValue / prefixes[toUnit];
        
                document.querySelector("#metric-output .metric-val").textContent = result.toPrecision(4);
            });
        
        });