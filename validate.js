function validateContactForm() {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone").value;
    const message = document.querySelector("#message").value;
    let errorMsg = "";

    if (!name || !email || !phone || !message) {
        errorMsg += "All fields are required.\n";
    }
    if (!email.includes("@")) {
        errorMsg += "Invalid email.\n";
    }
    if (isNaN(phone) || phone.length > 10) {
        errorMsg += "Invalid phone number.\n";
    }

    document.getElementById("errorMsg").innerText = errorMsg;
    return errorMsg === "";
}
