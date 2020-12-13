const PATTERN_COLOR_3_DIGITS = /^([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/;
const PATTERN_COLOR_6_DIGITS = /^([A-Fa-f0-9]{6})$/;

let HEX;
let R, G, B;

function hexToRgb() {
    RGBReference();
    HEX = document.getElementById('hex');
    let hexValue = HEX.value;
    if (verifyPattern(hexValue)) {
        HEX.className = "form-control is-valid"
        hexValue = convert3To6HexDigits(hexValue);
        R.value = parseInt(hexValue.substring(0, 2), 16);
        G.value = parseInt(hexValue.substring(2, 4), 16);
        B.value = parseInt(hexValue.substring(4, 6), 16);
        changeBackgroundColor(`rgb(${R.value},${G.value},${B.value})`);
    } else {
        HEX.className = "form-control is-invalid";
    }
}

function verifyPattern(hex) {
    return (hex.match(PATTERN_COLOR_3_DIGITS) || hex.match(PATTERN_COLOR_6_DIGITS));
}

function convert3To6HexDigits(hex) {
    if (hex.match(PATTERN_COLOR_3_DIGITS)) return hex.replace(PATTERN_COLOR_3_DIGITS, "$1$1$2$2$3$3");
    return hex;
}

function RGBReference(){
    R = document.getElementById('r');
    G = document.getElementById('g');
    B = document.getElementById('b');
}

function rgbToHex() {
    RGBReference();
    HEX = document.getElementById('hex');
    const rgb = (R.value << 16) | (G.value << 8) | (B.value << 0);
    let result = (0x1000000 + rgb).toString(16).slice(1);
    changeBackgroundColor(`#${result}`);
    return HEX.value = result;
}

function copyToClipboard(id) {
    let payload;
    payload = id === 'btn-clipboard-hex' ? `#${HEX.value}`.toUpperCase() : `rgb(${R.value},${G.value},${B.value})`.toUpperCase();
    navigator.clipboard.writeText(payload).then(()=>{
        changeClipboardIcon(id);
    });
}

function changeClipboardIcon(id){
    document.getElementById(id).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-tabler icon-tabler-clipboard-check\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#4CAF50\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n" +
        "  <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n" +
        "  <path d=\"M9 5H7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2V7a2 2 0 0 0 -2 -2h-2\" />\n" +
        "  <rect x=\"9\" y=\"3\" width=\"6\" height=\"4\" rx=\"2\" />\n" +
        "  <path d=\"M9 14l2 2l4 -4\" />\n" +
        "</svg>"
    setTimeout(() => {
        document.getElementById(id).innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon icon-tabler icon-tabler-clipboard\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"#6C757D\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n" +
            "                            <path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\"/>\n" +
            "                            <path d=\"M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2\" />\n" +
            "                            <rect x=\"9\" y=\"3\" width=\"6\" height=\"4\" rx=\"2\" />\n" +
            "                        </svg>"
    }, 2000);
}

function changeBackgroundColor(color){
    document.body.style.background = color;
}
