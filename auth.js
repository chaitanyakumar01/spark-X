document.addEventListener("DOMContentLoaded", () => {
    const connectButton = document.querySelector(".wallet-btn");
    const walletSpan = document.getElementById("userWallet");
  
    connectButton.addEventListener("click", async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          const userAddress = accounts[0];
          walletSpan.textContent = `Wallet: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
          connectButton.style.display = "none";
        } catch (error) {
          alert("Wallet connection failed.");
          console.error(error);
        }
      } else {
        alert("MetaMask is not installed!");
      }
    });
  });
  