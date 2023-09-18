export const onlyNumber = (event) => {
  if (
    !(
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Delete"
    )
  ) {
    event.preventDefault();
  }
};
export const onlyNumberAndDot = (event) => {
  if (
    !(
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key == "."
    )
  ) {
    event.preventDefault();
  }
};
export const onlyNumberDotAndDash = (event) => {
  if (
    !(
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key == "." ||
      event.key == "-"
    )
  ) {
    event.preventDefault();
  }
};
export const disablePaste = (event) => {
  event.preventDefault();
};
