const qrImage = document.getElementById("qrImage");
const imgBox = document.getElementById("imgBox");
const qrText = document.getElementById("qrText");

// Generate QR
function generateQR() {
  const text = qrText.value.trim();

  if (text.length === 0) {
    qrText.classList.add("error");
    setTimeout(() => qrText.classList.remove("error"), 1000);
    return;
  }

  const size = 300; // You can later make this dynamic

  const encodedText = encodeURIComponent(text);

  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}`;

  qrImage.onload = function () {
    imgBox.classList.add("show-img");
  };

  qrImage.onerror = function () {
    alert("QR generation failed. Please try again.");
  };
}

// Enter key support
qrText.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    generateQR();
  }
});


const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", async function () {
  if (!qrImage.src) return;

  try {
    const response = await fetch(qrImage.src);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    alert("Download failed. Try again.");
  }
});
