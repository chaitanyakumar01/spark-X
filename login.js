function login() {
    const wallet = document.getElementById("walletInput").value.trim();
    if (!wallet || wallet.length < 10) {
      alert("Please enter a valid wallet address.");
      return;
    }
  
    localStorage.setItem("walletAddress", wallet);
    window.location.href = "index.html";
  }
  