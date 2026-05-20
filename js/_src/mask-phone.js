const phoneInputs = document.querySelectorAll('input[type="tel"]');
if (phoneInputs && phoneInputs.length) {
  const getInputsNumbersValue = function (input) {
    return input.value.replace(/\D/g, "");
  };

  const onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputsNumbersValue(input),
      formattedInputValue = "",
      selectionStart = input.selectionStart;

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        inputNumbersValue[1] =
          inputNumbersValue[1] == "8"
            ? (inputNumbersValue[1] = "")
            : inputNumbersValue[1];
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      // Russian phone number
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      const firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue +=
          "(" +
          (inputNumbersValue[1] == "8"
            ? (inputNumbersValue[1] = "")
            : inputNumbersValue[1]) +
          inputNumbersValue.substring(2, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      // Not Russian phone number
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  };

  const onPhoneKeyDown = function (e) {
    const input = e.target;
    if (e.keyCode == 8 && getInputsNumbersValue(input).length === 1) {
      input.value = "";
    }
  };

  const onPhonePaste = function (e) {
    const input = e.target,
      pasted = e.clipboardData || window.clipboardData,
      inputNumbersValue = getInputsNumbersValue(input);

    if (pasted) {
      const pastedText = pasted.getData("Text");
      if (!/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
      }
    }
  };

  const onPhoneClick = function (e) {
    const input = e.target;
    input.setSelectionRange(4, 4);
  };

  phoneInputs.forEach((input) => {
    input.setAttribute("maxlength", "18");
    input.addEventListener("input", onPhoneInput);
    input.addEventListener("keydown", onPhoneKeyDown);
    input.addEventListener("paste", onPhonePaste);
    input.addEventListener("click", onPhoneClick);
  });
}
