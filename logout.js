window.onload = function() {
    const wallet = localStorage.getItem("walletAddress");
    if (!wallet) {
      window.location.href = "login.html";
    } else {
      document.getElementById("walletDisplay").innerText = wallet;
    }
  };
  
  function logout() {
    localStorage.removeItem("walletAddress");
    window.location.href = "login.html";
  }
  