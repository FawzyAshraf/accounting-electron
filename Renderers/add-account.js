const form = document.querySelector("#account-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#message").innerHTML = "I AM AN ACCOUNT";
    const accountName = form.querySelector("#account-name").value;
    console.log(window.electronAPI);
    window.electronAPI.insert(accountName);
});
