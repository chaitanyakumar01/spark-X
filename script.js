function openModal() {
  document.getElementById("teamModal").style.display = "block";
}

function closeModal() {
  document.getElementById("teamModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("teamModal");
  if (event.target === modal) {
    closeModal();
  }
};

// ---------------------------
// VOTING LOGIC
// ---------------------------
function submitVote(pollId) {
  const selected = document.querySelector(`input[name="${pollId}"]:checked`);
  if (!selected) {
    alert("Please select an option before voting.");
    return;
  }

  const voteValue = selected.value;

  // Prevent multiple votes
  if (localStorage.getItem(`voted_${pollId}`)) {
    alert("You have already voted in this poll.");
    return;
  }

  // Save vote to localStorage
  let votes = JSON.parse(localStorage.getItem(`votes_${pollId}`)) || {};
  votes[voteValue] = (votes[voteValue] || 0) + 1;
  localStorage.setItem(`votes_${pollId}`, JSON.stringify(votes));
  localStorage.setItem(`voted_${pollId}`, "true");

  showResults(pollId);
}

function showResults(pollId) {
  const pollCard = document.querySelector(`[data-poll-id="${pollId}"]`);
  const form = pollCard.querySelector("form");
  const voteBtn = pollCard.querySelector(".vote-btn");

  form.style.display = "none";
  voteBtn.style.display = "none";

  const resultsDiv = document.createElement("div");
  resultsDiv.classList.add("results-container");

  const votes = JSON.parse(localStorage.getItem(`votes_${pollId}`)) || {};
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  const options = pollCard.querySelectorAll("input[type='radio']");
  options.forEach((opt) => {
    const value = opt.value;
    const labelText = opt.parentElement.textContent.trim();
    const count = votes[value] || 0;
    const percent = totalVotes ? ((count / totalVotes) * 100).toFixed(1) : 0;

    const resultBar = document.createElement("div");
    resultBar.classList.add("result-bar");

    resultBar.innerHTML = `
      <span class="result-label">${labelText}</span>
      <div class="result-track">
        <div class="result-fill" style="width: ${percent}%"></div>
      </div>
      <span class="result-percent">${percent}% (${count} votes)</span>
    `;

    resultsDiv.appendChild(resultBar);
  });

  pollCard.appendChild(resultsDiv);
}

// Auto show results for polls already voted
window.onload = function () {
  const allPolls = document.querySelectorAll(".poll-card");
  allPolls.forEach((poll) => {
    const pollId = poll.getAttribute("data-poll-id");
    if (localStorage.getItem(`voted_${pollId}`)) {
      showResults(pollId);
    }
  });
};

  