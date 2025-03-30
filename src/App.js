import "./App.css";
import NumberButton from "./components/NumberButton.js";
import OperatorButton from "./components/OperatorButton.js";
import EqualsButton from "./components/EqualsButton.js";
import ClearButton from "./components/ClearButton.js";
import DecimalButton from "./components/DecimalButton.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function App() {
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState("Press a key");
    const [operator, setOperator] = useState("");
    const [result, setResult] = useState(0);
    const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);
    const [display, setDisplay] = useState("");
    const [isDecimalUsed, setIsDecimalUsed] = useState(false);
    const [isOperatorSet, setIsOperatorSet] = useState(false);
    const [isResultProvided, setIsResultProvided] = useState(false);
    const [isFirstNumberSet, setIsFirstNumberSet] = useState(true);
    const [isNegativeNumberSet, setIsNegativeNumberSet] = useState(false);

    // Array of all numbers
    const numberMap = [
        { key: 0, name: "zero" },
        { key: 1, name: "one" },
        { key: 2, name: "two" },
        { key: 3, name: "three" },
        { key: 4, name: "four" },
        { key: 5, name: "five" },
        { key: 6, name: "six" },
        { key: 7, name: "seven" },
        { key: 8, name: "eight" },
        { key: 9, name: "nine" },
    ];

    // Array of all mathematical operators
    const operatorMap = [
        { key: "+", name: "add" },
        { key: "-", name: "subtract" },
        { key: "*", name: "multiply" },
        { key: "/", name: "divide" },
    ];

    let buttonText = "";

    // Handles the button click for all number buttons that creates long numbers. Distinguishes between first and second number input.
    const handleButtonClick = (event) => {
        buttonText = event.currentTarget.getAttribute("label");

        if (waitingForSecondNumber) {
            if (secondNumber === "Press a key" || secondNumber === 0) {
                setSecondNumber(buttonText);
            } else {
                setSecondNumber(secondNumber + buttonText);
            }
        } else if (isFirstNumberSet === false && isOperatorSet === true) {
            setFirstNumber(buttonText);
            setIsResultProvided(false);
            setIsFirstNumberSet(true);
        } else {
            if (firstNumber === "0" || firstNumber === 0) {
                setFirstNumber(buttonText);
            } else {
                setFirstNumber(firstNumber + buttonText);
            }
        }
    };

    useEffect(() => {
        console.log("First number is: ", firstNumber);
    }, [firstNumber]);

    useEffect(() => {
        console.log("Second number is: ", secondNumber);
    }, [secondNumber]);

    // Handles the operator click. Clears the second number value so it can be specified by user
    const handleOperatorClick = (event) => {
        const operatorText = event.currentTarget.getAttribute("label");
        setSecondNumber("Press a key");
        setOperator(operatorText);
        setWaitingForSecondNumber(true);
        setIsDecimalUsed(false);
        console.log("Operator is: " + operatorText);

        if (waitingForSecondNumber && secondNumber !== "Press a key") {
            handleEqualsClick();
        }
        setIsOperatorSet(true);
        setWaitingForSecondNumber(true);
        setIsResultProvided(false);

        // if (
        //     operatorText === "+" ||
        //     operatorText === "*" ||
        //     operatorText === "/"
        // ) {
        //     setIsNegativeNumberSet(true);
        // }

        // if (operatorText === "-" && isNegativeNumberSet === true) {
        //     setIsFirstNumberSet(false);
        //     setSecondNumber("-");
        // }
    };

    // Handles the actual mathematical operation.
    const handleEqualsClick = () => {
        console.log("Equal is pressed");
        if (waitingForSecondNumber && secondNumber !== "Press a key") {
            let newResult;
            switch (operator) {
                case "+":
                    newResult = Number(firstNumber) + Number(secondNumber);
                    break;
                case "-":
                    newResult = Number(firstNumber) - Number(secondNumber);
                    break;
                case "*":
                    newResult = Number(firstNumber) * Number(secondNumber);
                    break;
                case "/":
                    newResult = Number(firstNumber) / Number(secondNumber);
                    break;
                default:
                    return;
            }
            console.log("Second number is: " + secondNumber);
            setResult(newResult);
            setFirstNumber(newResult);
            setIsDecimalUsed(false);
            setIsResultProvided(true);
            setWaitingForSecondNumber(false);
            setIsFirstNumberSet(false);
            console.log("Result is: " + newResult);
        } else if (
            waitingForSecondNumber === true &&
            secondNumber === "Press a key"
        ) {
            let newResult;
            switch (operator) {
                case "+":
                    newResult = Number(firstNumber) + Number(firstNumber);
                    break;
                case "-":
                    newResult = Number(firstNumber) - Number(firstNumber);
                    break;
                case "*":
                    newResult = Number(firstNumber) * Number(firstNumber);
                    break;
                case "/":
                    newResult = Number(firstNumber) / Number(firstNumber);
                    break;
                default:
                    return;
            }
            setSecondNumber(firstNumber);
            setWaitingForSecondNumber(false);
            setResult(newResult);
            setFirstNumber(newResult);
            setIsFirstNumberSet(false);
        } else {
            let newResult;
            switch (operator) {
                case "+":
                    newResult = Number(firstNumber) + Number(secondNumber);
                    break;
                case "-":
                    newResult = Number(firstNumber) - Number(secondNumber);
                    break;
                case "*":
                    newResult = Number(firstNumber) * Number(secondNumber);
                    break;
                case "/":
                    newResult = Number(firstNumber) / Number(secondNumber);
                    break;
                default:
                    return;
            }
            setResult(newResult);
            setFirstNumber(newResult);
            setIsFirstNumberSet(false);
        }
    };

    // Handle decimal number input. Allows for simply clicking the decimal button to start input
    const handleDecimalClick = (event) => {
        if (isDecimalUsed === false) {
            if (waitingForSecondNumber) {
                if (secondNumber === "Press a key" || secondNumber === 0) {
                    setSecondNumber("0." + buttonText);
                    setIsDecimalUsed(true);
                } else {
                    setSecondNumber(secondNumber + "." + buttonText);
                    setIsDecimalUsed(true);
                }
            } else {
                if (firstNumber === "0" || firstNumber === 0) {
                    setFirstNumber("0." + buttonText);
                    setIsDecimalUsed(true);
                } else {
                    setFirstNumber(firstNumber + "." + buttonText);
                    setIsDecimalUsed(true);
                }
            }
        }
    };

    // Code block that updates the calculators display
    useEffect(() => {
        setDisplay(firstNumber);
    }, [firstNumber]);

    useEffect(() => {
        setDisplay(operator);
    }, [operator]);

    useEffect(() => {
        setDisplay(secondNumber);
    }, [secondNumber]);

    useEffect(() => {
        setDisplay(result);
    }, [result]);

    // Resets all number values to starting values
    const handleClearClick = () => {
        setFirstNumber(0);
        setSecondNumber("Press a key");
        setOperator("");
        setResult(0);
        setWaitingForSecondNumber(false);
        setIsDecimalUsed(false);
        setDisplay("0");
        setIsOperatorSet(false);
        console.log("------------------------------------------------");
    };

    // Listens for keyboard clicks and simulates corresponding button click
    useEffect(() => {
        const handleKeyPress = (event) => {
            const buttonToPress = document.getElementById(
                event.key.toUpperCase()
            );
            if (buttonToPress) {
                buttonToPress.click();
            }
        };
        document.addEventListener("keypress", handleKeyPress);
        // Clean-up function to prevent multiple event listeners after rerender
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, []);

    // CSS styling for all buttons, passed in each className prop
    const buttonCSS =
        "d-flex justify-content-center align-items-center w-100 p-4";

    const testCSS =
        "mb-3 mt-3 d-flex justify-content-between fs-6 col-md-6 w-100";

    return (
        <div id="calculator" className="d-flex flex-row align-items-center">
            <div className="container">
                <div className={testCSS}>
                    <div>{firstNumber}</div>
                    <div>First Number</div>
                </div>

                <div className={testCSS}>
                    <div>{operator || "Press a Key"}</div>
                    <div>Operator</div>
                </div>

                <div className={testCSS}>
                    <div>{secondNumber}</div>
                    <div>Second Number</div>
                </div>

                <div className={testCSS}>
                    <div>{result || "Press a Key"}</div>
                    <div>Result</div>
                </div>

                <div className={testCSS}>
                    <div>{waitingForSecondNumber ? "true" : "false"}</div>
                    <div>Waiting for 2nd Number</div>
                </div>

                <div className={testCSS}>
                    <div>{isDecimalUsed ? "true" : "false"}</div>
                    <div>Is Decimal Used</div>
                </div>

                <div className={testCSS}>
                    <div>{isOperatorSet ? "true" : "false"}</div>
                    <div>Is Operator Set</div>
                </div>

                <div className={testCSS}>
                    <div>{isResultProvided ? "true" : "false"}</div>
                    <div>Is Result Provided</div>
                </div>

                <div className={testCSS}>
                    <div>{isFirstNumberSet ? "true" : "false"}</div>
                    <div>Is 1st Number Set</div>
                </div>
            </div>

            <div className="container d-flex flex-column justify-content-center px-4">
                <div
                    id="display"
                    className="row m-0 d-flex justify-content-end align-items-center p-3"
                >
                    {display}
                </div>

                <div className="row  m-0">
                    <div className="col-3 p-0">
                        <ClearButton
                            className={buttonCSS}
                            sendDataToParent={handleClearClick}
                            label="C"
                            id="clear"
                        />
                    </div>

                    <div class="col-3 p-0">
                        <OperatorButton
                            className={buttonCSS}
                            sendDataToParent={handleOperatorClick}
                            label={operatorMap[3].key}
                            id={operatorMap[3].name}
                        />
                    </div>

                    <div class="col-3 p-0">
                        <OperatorButton
                            className={buttonCSS}
                            sendDataToParent={handleOperatorClick}
                            label={operatorMap[2].key}
                            id={operatorMap[2].name}
                        />
                    </div>

                    <div class="col-3 p-0">
                        <OperatorButton
                            className={buttonCSS}
                            sendDataToParent={handleOperatorClick}
                            label={operatorMap[1].key}
                            id={operatorMap[1].name}
                        />
                    </div>
                </div>

                <div className="row  m-0">
                    <div className="col-9 p-0">
                        <div className="row  m-0">
                            <div className="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[7].key}
                                    id={numberMap[7].name}
                                />
                            </div>

                            <div class="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[8].key}
                                    id={numberMap[8].name}
                                />
                            </div>

                            <div class="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[9].key}
                                    id={numberMap[9].name}
                                />
                            </div>
                        </div>

                        <div className="row  m-0">
                            <div class="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[4].key}
                                    id={numberMap[4].name}
                                />
                            </div>

                            <div class="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[5].key}
                                    id={numberMap[5].name}
                                />
                            </div>

                            <div class="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[6].key}
                                    id={numberMap[6].name}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-3 p-0">
                        <OperatorButton
                            className={`${buttonCSS} h-100`}
                            sendDataToParent={handleOperatorClick}
                            label={operatorMap[0].key}
                            id={operatorMap[0].name}
                        />
                    </div>
                </div>

                <div className="row  m-0">
                    <div className="col-9 p-0">
                        <div className="row  m-0">
                            <div className="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[1].key}
                                    id={numberMap[1].name}
                                />
                            </div>

                            <div className="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[2].key}
                                    id={numberMap[2].name}
                                />
                            </div>

                            <div className="col-4 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[3].key}
                                    id={numberMap[3].name}
                                />
                            </div>
                        </div>

                        <div className="row  m-0">
                            <div className="col-8 p-0">
                                <NumberButton
                                    className={buttonCSS}
                                    sendDataToParent={handleButtonClick}
                                    label={numberMap[0].key}
                                    id={numberMap[0].name}
                                />
                            </div>

                            <div class="col-4 p-0">
                                <DecimalButton
                                    className={buttonCSS}
                                    sendDataToParent={handleDecimalClick}
                                    label="."
                                    id="decimal"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="col-3 p-0">
                        <EqualsButton
                            className={`${buttonCSS} h-100`}
                            sendDataToParent={handleEqualsClick}
                            label="="
                            id="equals"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
