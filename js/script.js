const partElements = document.querySelectorAll("[data-part]");
const caixa = document.querySelector("[data-caixa]");
const msgVenceuText = document.querySelector("[data-msg-venceu-text]");
const msgVenceu = document.querySelector("[data-msg-venceu]");
const restartButton = document.querySelector("[data-restart-button]");
let turnCircle;
const combVencer = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const startGame = () => {
  turnCircle = false;
  for (const part of partElements) {
    part.classList.remove("circle");
    part.classList.remove("x");
    part.removeEventListener("click", selecionar);
    part.addEventListener("click", selecionar, { once: true });
  }

  setCaixaHoverClass();
  msgVenceu.classList.remove("mostrar-msg-venceu");
};
const endGame = (emp) => {
  if (emp) {
    msgVenceuText.innerText = "Empate!";
  } else {
    msgVenceuText.innerText = turnCircle ? "O venceu!" : "X venceu!";
  }
  msgVenceu.classList.add("mostrar-msg-venceu");
};
const voltar = () => {};
const checkVen = (currentPlayer) => {
  return combVencer.some((combination) => {
    return combination.every((index) => {
      return partElements[index].classList.contains(currentPlayer);
    });
  });
};
const checkEmp = () => {
  return [...partElements].every((part) => {
    return part.classList.contains("x") || part.classList.contains("circle");
  });
};
const placeMark = (part, classToAdd) => {
  part.classList.add(classToAdd);
};
const setCaixaHoverClass = () => {
  caixa.classList.remove("circle");
  caixa.classList.remove("x");

  if (turnCircle) {
    caixa.classList.add("circle");
  } else {
    caixa.classList.add("x");
  }
};
const mudarTurn = () => {
  turnCircle = !turnCircle;
  setCaixaHoverClass();
};
const selecionar = (e) => {
  const part = e.target;
  const classToAdd = turnCircle ? "circle" : "x";

  placeMark(part, classToAdd);

  const venceu = checkVen(classToAdd);
  const emp = checkEmp();
  if (venceu) {
    endGame(false);
  } else if (emp) {
    endGame(true);
  } else {
    mudarTurn();
  }
};
startGame();
restartButton.addEventListener("click", startGame);
