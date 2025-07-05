import "./App.css";
import NumberButton from "./components/NumberButton.js";
import OperatorButton from "./components/OperatorButton.js";
import EqualsButton from "./components/EqualsButton.js";
import ClearButton from "./components/ClearButton.js";
import DecimalButton from "./components/DecimalButton.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

function App() {
    const [firstNumber, setFirstNumber] = useState("0");
    const [secondNumber, setSecondNumber] = useState("Press a key");
    const [operator, setOperator] = useState("");
    const [result, setResult] = useState(null);
    const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);
    const [display, setDisplay] = useState("0");
    const [isDecimalUsed, setIsDecimalUsed] = useState(false);
    const [isOperatorSet, setIsOperatorSet] = useState(false);
    const [isResultProvided, setIsResultProvided] = useState(false);
    const [isFirstNumberSet, setIsFirstNumberSet] = useState(true);

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

    // Handles number button click
    const handleButtonClick = (event) => {
        const buttonValue = event.currentTarget.getAttribute("label");

        if (waitingForSecondNumber) {
            if (secondNumber === "Press a key") {
                setSecondNumber(buttonValue);
            } else {
                setSecondNumber((prev) => prev + buttonValue);
            }
        } else {
            if (firstNumber === "0") {
                setFirstNumber(buttonValue);
            } else {
                setFirstNumber((prev) => prev + buttonValue);
            }
        }
    };

    // Handles operator click
    const handleOperatorClick = (event) => {
        const operatorText = event.currentTarget.getAttribute("label");
        const isSecondNumberEmpty =
            secondNumber === "Press a key" || secondNumber === "";

        if (isResultProvided) {
            setOperator(operatorText);
            setIsOperatorSet(true);
            setWaitingForSecondNumber(true);
            setSecondNumber("Press a key");
            setIsResultProvided(false);
            setIsDecimalUsed(false);
            return;
        }

        if (isOperatorSet && isSecondNumberEmpty) {
            if (operatorText === "-" && secondNumber !== "-") {
                setSecondNumber("-");
                return;
            }
            setOperator(operatorText);
            return;
        }

        if (
            isOperatorSet &&
            secondNumber !== "Press a key" &&
            secondNumber !== "" &&
            secondNumber !== "-"
        ) {
            handleEqualsClick();
        }

        setOperator(operatorText);
        setIsOperatorSet(true);
        setWaitingForSecondNumber(true);
        setSecondNumber("Press a key");
        setIsDecimalUsed(false);
        setIsResultProvided(false);
    };

    // Handles equals click
    const handleEqualsClick = () => {
        if (
            waitingForSecondNumber &&
            secondNumber !== "Press a key" &&
            secondNumber !== "-"
        ) {
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
            setFirstNumber(newResult.toString());
            setIsDecimalUsed(newResult.toString().includes("."));
            setIsResultProvided(true);
            setWaitingForSecondNumber(false);
            setIsFirstNumberSet(false);
        } else if (
            waitingForSecondNumber === true &&
            (secondNumber === "Press a key" || secondNumber === "-")
        ) {
            // If second number not provided, use first number for operation (e.g., 5 + 5)
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
            setFirstNumber(newResult.toString());
            setIsDecimalUsed(newResult.toString().includes("."));
            setIsFirstNumberSet(false);
            setIsResultProvided(true);
        }
    };

    // Handles decimal point click
    const handleDecimalClick = () => {
        if (isDecimalUsed) return;

        if (waitingForSecondNumber) {
            if (secondNumber === "Press a key") {
                setSecondNumber("0.");
            } else {
                setSecondNumber((prev) => prev + ".");
            }
        } else {
            if (firstNumber === "0") {
                setFirstNumber("0.");
            } else {
                setFirstNumber((prev) => prev + ".");
            }
        }
        setIsDecimalUsed(true);
    };

    // Updates the display based on the most recent input
    useEffect(() => {
        if (isResultProvided) {
            setDisplay(result !== null ? result.toString() : firstNumber);
        } else if (waitingForSecondNumber) {
            setDisplay(secondNumber === "Press a key" ? "0" : secondNumber);
        } else {
            setDisplay(firstNumber);
        }
    }, [
        firstNumber,
        secondNumber,
        result,
        waitingForSecondNumber,
        isResultProvided,
    ]);

    // Clears all inputs and resets state
    const handleClearClick = () => {
        setFirstNumber("0");
        setSecondNumber("Press a key");
        setOperator("");
        setResult(null);
        setWaitingForSecondNumber(false);
        setIsDecimalUsed(false);
        setDisplay("0");
        setIsOperatorSet(false);
        setIsFirstNumberSet(true);
        setIsResultProvided(false);
        console.log("------------------------------------------------");
    };

    // CSS styling for all buttons, passed in each className prop
    const buttonCSS = "button d-flex justify-content-center align-items-center";

    return (
        <div id="calculator" className="d-flex flex-row align-items-center">
            {/* <div className="container">
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
            </div> */}

            <div
                id="container"
                className="container d-flex flex-column justify-content-center gap-3"
            >
                <div
                    id="display"
                    className="row m-0 d-flex justify-content-end align-items-center p-3"
                >
                    {display}
                </div>

                <div className="d-flex flex-row gap-3">
                    <ClearButton
                        className={`${buttonCSS} utility round-button`}
                        sendDataToParent={handleClearClick}
                        label="C"
                        id="clear"
                    />
                    <OperatorButton
                        className={`${buttonCSS} utility round-button`}
                        sendDataToParent={handleOperatorClick}
                        label={operatorMap[3].key}
                        id={operatorMap[3].name}
                    />
                    <OperatorButton
                        className={`${buttonCSS} utility round-button`}
                        sendDataToParent={handleOperatorClick}
                        label={operatorMap[2].key}
                        id={operatorMap[2].name}
                    />
                    <OperatorButton
                        className={`${buttonCSS} utility round-button`}
                        sendDataToParent={handleOperatorClick}
                        label={operatorMap[1].key}
                        id={operatorMap[1].name}
                    />
                </div>

                <div className="d-flex flex-row gap-3 ">
                    <div className="d-flex flex-column gap-3 ">
                        <div className="d-flex flex-row gap-3">
                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[7].key}
                                id={numberMap[7].name}
                            />
                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[8].key}
                                id={numberMap[8].name}
                            />
                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[9].key}
                                id={numberMap[9].name}
                            />
                        </div>

                        <div className="d-flex flex-row gap-3">
                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[4].key}
                                id={numberMap[4].name}
                            />
                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[5].key}
                                id={numberMap[5].name}
                            />
                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[6].key}
                                id={numberMap[6].name}
                            />
                        </div>
                    </div>
                    <OperatorButton
                        className={`${buttonCSS} plus utility vertical-button`}
                        sendDataToParent={handleOperatorClick}
                        label={operatorMap[0].key}
                        id={operatorMap[0].name}
                    />
                </div>

                <div className="d-flex flex-row gap-3 ">
                    <div className="d-flex flex-column gap-3 ">
                        <div className="d-flex flex-row gap-3">
                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[1].key}
                                id={numberMap[1].name}
                            />

                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[2].key}
                                id={numberMap[2].name}
                            />

                            <NumberButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[3].key}
                                id={numberMap[3].name}
                            />
                        </div>

                        <div className="d-flex flex-row gap-3">
                            <NumberButton
                                className={`${buttonCSS} horizontal-button`}
                                sendDataToParent={handleButtonClick}
                                label={numberMap[0].key}
                                id={numberMap[0].name}
                            />

                            <DecimalButton
                                className={`${buttonCSS} round-button`}
                                sendDataToParent={handleDecimalClick}
                                label="."
                                id="decimal"
                            />
                        </div>
                    </div>

                    <EqualsButton
                        className={`${buttonCSS} accent vertical-button`}
                        sendDataToParent={handleEqualsClick}
                        label="="
                        id="equals"
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
