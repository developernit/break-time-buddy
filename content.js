window.onload = function () {
  let timer = 5 * 60;

  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const plusEl = document.getElementById("plus");
  const minusEl = document.getElementById("minus");
  const startEl = document.getElementById("start");
  const resetEl = document.getElementById("reset");

  function formatTimer() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    minutesEl.innerText = minutes.toString().padStart(2, "0");
    secondsEl.innerText = seconds.toString().padStart(2, "0");
  }

  chrome.storage.local.get("timer", (data) => {
    if (data.timer) {
      timer = data.timer;
      formatTimer();
    }
  });

  function saveTimer() {
    chrome.storage.local.set({ timer: timer });
  }

  plusEl.addEventListener("click", () => {
    timer += 5 * 60;

    formatTimer();
    saveTimer();
  });

  minusEl.addEventListener("click", () => {
    timer = Math.max(0, timer - 5 * 60);

    formatTimer();
    saveTimer();
  });

  startEl.addEventListener("click", () => {
    startEl.style.display = "none";

    resetEl.style.display = "inline";

    let countdown = setInterval(() => {
      timer--;

      formatTimer();
      saveTimer();

      if (timer <= 0) {
        clearInterval(countdown);
      }
    }, 1000);
  });

  resetEl.addEventListener("click", () => {
    timer = 5 * 60;
    saveTimer();

    formatTimer();
  });
};
