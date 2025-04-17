// Modal open/close
const modal = document.getElementById("infoModal");
const aboutBtn = document.getElementById("aboutBtn");
const closeBtn = document.getElementsByClassName("close")[0];

aboutBtn.onclick = function () {
  modal.style.display = "flex";
}

closeBtn.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Voting Logic
function vote(pollId) {
  const selectedOption = document.querySelector(`input[name="${pollId}"]:checked`);
  if (!selectedOption) {
    alert("Please select an option before voting.");
    return;
  }

  const voted = localStorage.getItem(`voted_${pollId}`);
  if (voted) {
    alert("You have already voted on this poll!");
    return;
  }

  localStorage.setItem(`voted_${pollId}`, selectedOption.value);

  const button = document.querySelector(`.poll-card[data-id="${pollId}"] .vote-btn`);
  button.disabled = true;
  button.innerText = "Voted ✔️";

  alert("Thanks for voting!");
}

// On page load: disable buttons if already voted
window.onload = function () {
  const pollCards = document.querySelectorAll(".poll-card");
  pollCards.forEach(card => {
    const pollId = card.getAttribute("data-id");
    const voted = localStorage.getItem(`voted_${pollId}`);
    if (voted) {
      const button = card.querySelector(".vote-btn");
      button.disabled = true;
      button.innerText = "Voted ✔️";
    }
  });
}
// auth.js
window.onload = function () {
    const wallet = localStorage.getItem("walletAddress");
    if (!wallet) {
      window.location.href = "login.html";
    } else {
      const userWallet = document.getElementById("userWallet");
      if (userWallet) {
        userWallet.textContent = `👛 ${wallet.substring(0, 6)}...${wallet.slice(-4)}`;
      }
    }
  };
  