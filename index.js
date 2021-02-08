// ==============================DATA===============================

const monthTable__arrowLeftBtn = document.querySelector(
  "#monthTable__arrowLeftBtn"
);
const monthTable__arrowRightBtn = document.querySelector(
  "#monthTable__arrowRightBtn"
);
let currentData = new Date();

// =============================PROGRAM=============================

drawMonthTable(currentData);

// =============================EVENTS==============================

monthTable__arrowRightBtn.addEventListener("click", (event) => {
  const nextMonth = getNextMonth(currentData);
  const nextYear = getNextYear(currentData);
  currentData = new Date(nextYear, nextMonth, 1);
  drawMonthTable(currentData);
});

monthTable__arrowLeftBtn.addEventListener("click", (event) => {
  const previewMonth = getPreviewMonth(currentData);
  const previewYear = getPreviewYear(currentData);
  currentData = new Date(previewYear, previewMonth, 1);
  drawMonthTable(currentData);
});

// ============================FUNCTIONS============================

function getCurrentMonth(date) {
  return date.getMonth();
}

function getPreviewMonth(date) {
  if (date.getMonth() === 0) return 11;
  else return date.getMonth() - 1;
}

function getNextMonth(date) {
  if (date.getMonth() === 11) return 0;
  else return date.getMonth() + 1;
}

function getNextYear(date) {
  if (date.getMonth() === 11) return date.getFullYear() + 1;
  else return date.getFullYear();
}

function getCurrentYear(date) {
  return date.getFullYear();
}

function getPreviewYear(date) {
  if (date.getMonth() === 0) return date.getFullYear() - 1;
  else return date.getFullYear();
}

function getMonthName(month) {
  const array = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return array[month];
}

function drawMonthTable(currentData) {
  const currentYear = getCurrentYear(currentData);
  const currentMonth = getCurrentMonth(currentData);
  const previewMonth = getPreviewMonth(currentData);
  const nextMonth = getNextMonth(currentData);
  const monthName = getMonthName(currentMonth);
  const monthTable__cells = document.querySelector("#monthTable__cells");
  const monthTable__month = document.querySelector("#monthTable__month");
  const monthTable__year = document.querySelector("#monthTable__year");
  const beginDate = new Date(currentYear, currentMonth, 1);
  let stopFlag = true;
  let date = beginDate;
  let counter = 0;

  monthTable__month.innerHTML = `${monthName}`;
  monthTable__year.innerHTML = `${currentYear}`;

  monthTable__cells.innerHTML = "";

  if (beginDate.getDay() != 0) {
    date = new Date(currentYear, currentMonth, 1 - beginDate.getDay());
  }
  while (stopFlag) {
    if (date.getMonth() === previewMonth) {
      drawPreviewMonthCell(date);
    } else if (date.getMonth() === currentMonth) {
      drawCurrentMonthCell(date);
    } else if (date.getMonth() === nextMonth && date.getDay() != 0) {
      drawNextMonthCell(date);
    } else {
      stopFlag = false;
    }
    counter++;
    date = getNewDate(counter, currentYear, currentMonth, beginDate);
  }
  setCellHeight();
}

function setCellHeight() {
  let monthTable__cell = document.querySelector(".monthTable__cell");
  cellHeight = monthTable__cell.offsetWidth - 20;
  array = Array.from(document.getElementsByClassName("monthTable__cell"));
  array.forEach((item) => {
    item.style.height = `${cellHeight}px`;
  });
}

function drawPreviewMonthCell(date) {
  monthTable__cells.innerHTML += `
  <div class = "monthTable__cell monthTable__cell_preview">${date.getDate()}</div>`;
}

function drawCurrentMonthCell(date) {
  monthTable__cells.innerHTML += `
  <div class = "monthTable__cell monthTable__cell_current">${date.getDate()}</div>`;
}

function drawNextMonthCell(date) {
  monthTable__cells.innerHTML += `
  <div class = "monthTable__cell monthTable__cell_preview">${date.getDate()}</div>`;
}

function getNewDate(counter, currentYear, currentMonth, beginDate) {
  return new Date(currentYear, currentMonth, 1 - beginDate.getDay() + counter);
}
