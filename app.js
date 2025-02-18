        const translations = {
            en: {
                selectConverter: "Select Converter",
                inputText: "Enter text",
                convert: "Convert",
                copy: "Copy"
            },
            fa: {
                selectConverter:"نوع تبدیل",
                inputText: "متن را وارد کنید",
                convert: "تبدیل کن",
                copy: "کپی"
            },
            ru: {
                selectConverter: "Выберите конвертер",
                inputText: "Введите текст",
                convert: "Преобразовать",
                copy: "Копировать"
            }
        };

        let currentLang = 'en';
        function updateLanguage(lang) {
            currentLang = lang;
            document.querySelectorAll('[data-lang-key]').forEach(el => {
                const key = el.getAttribute('data-lang-key');
                if (translations[lang] && translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
        }

        document.querySelectorAll('input[name="language"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.checked) {
                    updateLanguage(e.target.value);
                }
            });
        });

        function setDarkMode(isDarkMode) {
            const navbar = document.getElementById('navbar');
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                navbar.classList.remove('navbar-light', 'bg-light');
                navbar.classList.add('navbar-dark', 'bg-dark');
            } else {
                document.body.classList.remove('dark-mode');
                navbar.classList.remove('navbar-dark', 'bg-dark');
                navbar.classList.add('navbar-light', 'bg-light');
            }
        }

        const modeToggleCheckbox = document.getElementById('mode-toggle-checkbox');
        setDarkMode(modeToggleCheckbox.checked);

        modeToggleCheckbox.addEventListener('change', function () {
            setDarkMode(this.checked);
        });

        function asciiToBinary(text) {
            return text.split('')
                .map(ch => ch.charCodeAt(0).toString(2).padStart(8, '0'))
                .join(' ');
        }

        function asciiToHex(text) {
            return text.split('')
                .map(ch => ch.charCodeAt(0).toString(16).toUpperCase())
                .join(' ');
        }

        function binaryToAscii(text) {
            let parts = text.trim().split(/\s+/);
            if (parts.length === 1 && parts[0].length % 8 === 0) {
                parts = parts[0].match(/.{1,8}/g);
            }
            if (!parts) return "Invalid binary input";
            return parts.map(b => String.fromCharCode(parseInt(b, 2))).join('');
        }

        function binaryToDecimal(text) {
            let num = parseInt(text.replace(/\s+/g, ''), 2);
            return isNaN(num) ? "Invalid binary input" : num.toString(10);
        }

        function binaryToHex(text) {
            let num = parseInt(text.replace(/\s+/g, ''), 2);
            return isNaN(num) ? "Invalid binary input" : num.toString(16).toUpperCase();
        }

        function dateToRoman(text) {
            let parts = text.split(/[-\/]/);
            if (parts.length !== 3) return "Invalid date format. Use YYYY-MM-DD or DD/MM/YYYY.";
            let year, month, day;
            if (parts[0].length === 4) {
                year = parseInt(parts[0]);
                month = parseInt(parts[1]);
                day = parseInt(parts[2]);
            } else { 
                day = parseInt(parts[0]);
                month = parseInt(parts[1]);
                year = parseInt(parts[2]);
            }
            if (isNaN(year) || isNaN(month) || isNaN(day)) return "Invalid date numbers";
            return `Day: ${numberToRoman(day)}\nMonth: ${numberToRoman(month)}\nYear: ${numberToRoman(year)}`;
        }

        function decimalToFraction(text) {
            let value = parseFloat(text);
            if (isNaN(value)) return "Invalid decimal input";
            let tolerance = 1.0E-6;
            let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
            let b = value;
            do {
                let a = Math.floor(b);
                let h = a * h1 + h2;
                let k = a * k1 + k2;
                let approximation = h / k;
                if (Math.abs(value - approximation) < tolerance) {
                    return `${h}/${k}`;
                }
                h2 = h1; h1 = h;
                k2 = k1; k1 = k;
                b = 1 / (b - a);
            } while (true);
        }

        function decimalToPercent(text) {
            let num = parseFloat(text);
            if (isNaN(num)) return "Invalid decimal input";
            return (num * 100).toFixed(2) + "%";
        }

        function decimalToBinary(text) {
            let num = parseInt(text, 10);
            return isNaN(num) ? "Invalid decimal input" : num.toString(2);
        }

        function decimalToOctal(text) {
            let num = parseInt(text, 10);
            return isNaN(num) ? "Invalid decimal input" : num.toString(8);
        }

        function decimalToHex(text) {
            let num = parseInt(text, 10);
            return isNaN(num) ? "Invalid decimal input" : num.toString(16).toUpperCase();
        }

        function fractionToDecimal(text) {
            let parts = text.split('/');
            if (parts.length !== 2) return "Invalid fraction input. Use a/b format.";
            let numerator = parseFloat(parts[0]);
            let denominator = parseFloat(parts[1]);
            if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return "Invalid fraction";
            return (numerator / denominator).toString();
        }

        function fractionToPercent(text) {
            let dec = parseFloat(fractionToDecimal(text));
            return isNaN(dec) ? "Invalid fraction input" : (dec * 100).toFixed(2) + "%";
        }

        function hexToAscii(text) {
            let hex = text.replace(/\s+/g, '');
            if (hex.length % 2 !== 0) return "Invalid hex input";
            let str = '';
            for (let i = 0; i < hex.length; i += 2) {
                let part = hex.substr(i, 2);
                let code = parseInt(part, 16);
                str += String.fromCharCode(code);
            }
            return str;
        }

        function hexToBinary(text) {
            let num = parseInt(text, 16);
            return isNaN(num) ? "Invalid hex input" : num.toString(2);
        }

        function hexToDecimal(text) {
            let num = parseInt(text, 16);
            return isNaN(num) ? "Invalid hex input" : num.toString(10);
        }

        function octalToDecimal(text) {
            let num = parseInt(text, 8);
            return isNaN(num) ? "Invalid octal input" : num.toString(10);
        }

        function percentToDecimal(text) {
            let val = text.replace('%', '').trim();
            let num = parseFloat(val);
            return isNaN(num) ? "Invalid percent input" : (num / 100).toString();
        }

        function percentToFraction(text) {
            let decStr = percentToDecimal(text);
            let dec = parseFloat(decStr);
            return isNaN(dec) ? "Invalid percent input" : decimalToFraction(dec.toString());
        }

        function percentToPpm(text) {
            let val = text.replace('%', '').trim();
            let num = parseFloat(val);
            return isNaN(num) ? "Invalid percent input" : (num * 10000).toString() + " ppm";
        }

        function ppmToPercent(text) {
            let num = parseFloat(text);
            return isNaN(num) ? "Invalid ppm input" : (num / 10000 * 100).toFixed(2) + "%";
        }

        function ppmToPpb(text) {
            let num = parseFloat(text);
            return isNaN(num) ? "Invalid ppm input" : (num * 1000).toString() + " ppb";
        }

        function ppmToPpt(text) {
            let num = parseFloat(text);
            return isNaN(num) ? "Invalid ppm input" : (num * 1000000).toString() + " ppt";
        }

        function ppbToPpm(text) {
            let num = parseFloat(text);
            return isNaN(num) ? "Invalid ppb input" : (num / 1000).toString() + " ppm";
        }

        function pptToPpm(text) {
            let num = parseFloat(text);
            return isNaN(num) ? "Invalid ppt input" : (num / 1000000).toString() + " ppm";
        }

        function ppmConverter(text) {
            return text + " ppm";
        }

        function romanNumerals(text) {
            let num = parseInt(text, 10);
            return isNaN(num) ? "Invalid number for roman numeral conversion" : numberToRoman(num);
        }
         
        function base64Encode(text) {
        try {
            return btoa(text);
        } catch (e) {
            return "Invalid input for Base64 encoding";
        }
        }

        function base64Decode(text) {
        try {
            return atob(text);
        } catch (e) {
            return "Invalid Base64 input";
        }
        }

        function rot13(text) {
        return text.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode(
            c.charCodeAt(0) + (c.toLowerCase() < 'n' ? 13 : -13)
            );
        });
        }

        function urlEncode(text) {
        return encodeURIComponent(text);
        }

        function urlDecode(text) {
        try {
            return decodeURIComponent(text);
        } catch (e) {
            return "Invalid URL encoding";
        }}

        function numberToRoman(num) {
            if (num <= 0) return "N/A";
            const romanMap = [
                { value: 1000, numeral: "M" },
                { value: 900, numeral: "CM" },
                { value: 500, numeral: "D" },
                { value: 400, numeral: "CD" },
                { value: 100, numeral: "C" },
                { value: 90, numeral: "XC" },
                { value: 50, numeral: "L" },
                { value: 40, numeral: "XL" },
                { value: 10, numeral: "X" },
                { value: 9, numeral: "IX" },
                { value: 5, numeral: "V" },
                { value: 4, numeral: "IV" },
                { value: 1, numeral: "I" }
            ];
            let result = "";
            for (let i = 0; i < romanMap.length; i++) {
                while (num >= romanMap[i].value) {
                    result += romanMap[i].numeral;
                    num -= romanMap[i].value;
                }
            }
            return result;
        }

        document.getElementById('convertBtn').addEventListener('click', function () {
            const converterType = document.getElementById('converterSelect').value;
            const inputText = document.getElementById('inputText').value;
            let result = "";
            switch (converterType) {

                case "ascii-to-binary":
                    result = asciiToBinary(inputText);
                    break;
                case "ascii-to-hex":
                    result = asciiToHex(inputText);
                    break;
                case "binary-to-ascii":
                    result = binaryToAscii(inputText);
                    break;
                case "binary-to-decimal":
                    result = binaryToDecimal(inputText);
                    break;
                case "binary-to-hex":
                    result = binaryToHex(inputText);
                    break;
                case "date-to-roman":
                    result = dateToRoman(inputText);
                    break;
                case "decimal-to-fraction":
                    result = decimalToFraction(inputText);
                    break;
                case "decimal-to-percent":
                    result = decimalToPercent(inputText);
                    break;
                case "decimal-to-binary":
                    result = decimalToBinary(inputText);
                    break;
                case "decimal-to-octal":
                    result = decimalToOctal(inputText);
                    break;
                case "decimal-to-hex":
                    result = decimalToHex(inputText);
                    break;
                case "fraction-to-decimal":
                    result = fractionToDecimal(inputText);
                    break;
                case "fraction-to-percent":
                    result = fractionToPercent(inputText);
                    break;
                case "hex-to-ascii":
                    result = hexToAscii(inputText);
                    break;
                case "hex-to-binary":
                    result = hexToBinary(inputText);
                    break;
                case "hex-to-decimal":
                    result = hexToDecimal(inputText);
                    break;
                case "octal-to-decimal":
                    result = octalToDecimal(inputText);
                    break;
                case "percent-to-decimal":
                    result = percentToDecimal(inputText);
                    break;
                case "percent-to-fraction":
                    result = percentToFraction(inputText);
                    break;
                case "percent-to-ppm":
                    result = percentToPpm(inputText);
                    break;
                case "ppm-to-percent":
                    result = ppmToPercent(inputText);
                    break;
                case "ppm-to-ppb":
                    result = ppmToPpb(inputText);
                    break;
                case "ppm-to-ppt":
                    result = ppmToPpt(inputText);
                    break;
                case "ppb-to-ppm":
                    result = ppbToPpm(inputText);
                    break;
                case "ppt-to-ppm":
                    result = pptToPpm(inputText);
                    break;
                case "roman-numerals":
                    result = romanNumerals(inputText);
                    break;
                  case "base64-encode":
                    result = base64Encode(inputText);
                    break;
                case "base64-decode":
                    result = base64Decode(inputText);
                    break;
                case "rot13":
                    result = rot13(inputText);
                    break;
                case "url-encode":
                    result = urlEncode(inputText);
                    break;
                case "url-decode":
                    result = urlDecode(inputText);
                    break;
                default:
                    result = "Conversion method not implemented";
            }
            document.getElementById('outputText').value = result;
        });

        document.getElementById('copyBtn').addEventListener('click', function () {
            const output = document.getElementById('outputText');
            output.select();
            output.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(output.value).then(() => {
                alert('Copied to clipboard!');
            });
        });
        updateLanguage(currentLang);