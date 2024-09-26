let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let currentStreak = 0;
let bestStreak = parseInt(localStorage.getItem('bestStreak')) || 0;

updateScoreElement();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === computerMove) {
      result = 'Tie.';
  } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
  ) {
      result = 'You win!';
      score.wins += 1;
      currentStreak++;
      if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
          localStorage.setItem('bestStreak', bestStreak);
      }
  } else {
      result = 'You lose.';
      score.losses += 1;
      currentStreak = 0;
  }

  if (result === 'Tie.') {
      score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  displayResult(result, playerMove, computerMove);
}

function updateScoreElement() {
  document.getElementById('score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  const streakElement = document.getElementById('streak');
  streakElement.innerHTML = `Current Streak: ${currentStreak} | Best Streak: ${bestStreak}`;
  if (currentStreak >= 3) {
      streakElement.classList.add('high-streak');
  } else {
      streakElement.classList.remove('high-streak');
  }
}

function displayResult(result, playerMove, computerMove) {
  document.getElementById('result').innerHTML = result;
  document.getElementById('moves').innerHTML = `
      You <img src="images/${playerMove}.png" alt="${playerMove}" class="move-icon">
      <img src="images/${computerMove}.png" alt="${computerMove}" class="move-icon"> Computer
  `;
}

function pickComputerMove() {
  const moves = ['rock', 'paper', 'scissors'];
  return moves[Math.floor(Math.random() * moves.length)];
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  currentStreak = 0;
  bestStreak = 0;
  localStorage.removeItem('score');
  localStorage.removeItem('bestStreak');
  updateScoreElement();
  document.getElementById('result').innerHTML = 'Score reset. Choose your move!';
  document.getElementById('moves').innerHTML = '';
}