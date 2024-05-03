let token = localStorage.getItem("token");

token ? 
window.open("../views/catalogo.html", "_self") :
window.open("../views/loginForm.html", "_self");

