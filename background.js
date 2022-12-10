let timer = 5 * 60;

function formatTimer() {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const minutesStr = minutes.toString().padStart(2, "0");
  const secondsStr = seconds.toString().padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;
}

chrome.storage.local.get("timer", (data) => {
  if (data.timer) {
    timer = data.timer;
  }
});

function saveTimer() {
  chrome.storage.local.set({ timer: timer });
}

chrome.action.setBadgeText({
  text: formatTimer(),
});

let countdown = setInterval(() => {
  timer--;

  chrome.action.setBadgeText({
    text: formatTimer(),
  });
  saveTimer();

  if (timer <= 0) {
    clearInterval(countdown);
  }
}, 1000);
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTimer") {
    sendResponse({ timer: timer });
  }
});
