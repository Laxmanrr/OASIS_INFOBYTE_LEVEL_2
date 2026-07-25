let display = document.getElementById("display");

// Add value (number, operator, or dot) to the display
function appendValue(val) {
  display.value += val;
}

// Delete the last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Clear the display completely
function clearDisplay() {
  display.value = "";
}

// Evaluate the expression when "=" is pressed
function calculate() {
  try {
    if (display.value.trim() === "") return;

    let result = eval(display.value);

    if (!isFinite(result)) {
      display.value = "Error";
    } else {
      display.value = result;
    }
  } catch {
    display.value = "Error";
  }
}

// Allow keyboard input too
document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || "+-*/.".includes(key)) {
    appendValue(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Delete") {
    clearDisplay();
  }
});
