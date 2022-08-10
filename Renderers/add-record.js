const form = document.querySelector("#record-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.querySelector("#message").innerHTML = "hahahah";
});
