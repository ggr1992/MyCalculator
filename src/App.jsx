import { useState } from "react";
import "./App.css";
import { create, all } from "mathjs"

const math = create(all);

function App() {
  let [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  

  const formatNumberWithCommas = (number) => {
    return number.toLocaleString(undefined, { maximumFractionDigits: 20 });
  };

  const handleClickForModifiers = (e) => {
    const value = e.target.value;
    if (/\.$/g.test(display)) {
      return;
    }

    if (display === "" && result === "") {
      return;
    }

    if (display === "" && result !== "" && typeof result === "string") {
      return;
    }
    if (display === "" && result !== "" && typeof result === "number") {
      setDisplay(value);
      return;
    }
    if (display !== "" && result !== "") {
      if (/\D$/g.test(display)) {
        return;
      } else {
        const join = `${result}${display}`;

        setResult(math.evaluate(join));
        setDisplay(value);
        return;
      }
    } else {
      setResult(display + value);
      setDisplay("");
    }
  };

  const handleClick = (e) => {
    const value = e.target.value;

    if(display.length > 19) {return}
    if (value === "." && /\./.test(display)) {
      return;
    }
    if (value === "." && /^\D$/.test(display)) {
      setDisplay(`${display}0.`);
      return;
    }
    if (value === "." && /\D$/.test(result)) {
      setDisplay(`${display}0.`);
      return;
    }
    if (display === "" && value === "." && typeof result === "number") {
      setResult("");
      setDisplay("0.");
      return;
    }
    if (display === "" && value === "." && result === "") {
      setDisplay("0.");
      return;
    }
    if (value === "0" && /^0$/.test(display)) {
      return;
    }
    if (value === "0" && /^.0$/.test(display) && result !== "") {
      return;
    }
    if (value !== "0" && /^0$/.test(display) && value !== ".") {
      setDisplay(display.slice(1, 1) + value);
      return;
    }
    if (value !== "0" && display !== "" && /^\D0$/.test(display)) {
      if (value === ".") {
        setDisplay(display + value);
      } else {
        setDisplay(display.slice(0, -1) + value);
        return;
      }
    }

    if (typeof result === "number" && display === "") {
      setResult("");
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const handleResult = () => {
    const join = `${result}${display}`;
    if (/\D$/g.test(join)) {
      return;
    }
    if (/\.$/g.test(display)) {
      return;
    }

    setResult(math.evaluate(join));
    setDisplay("");
  };

  const handleClear = () => {
    setDisplay("");
    setResult("");
  };

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-output">{formatNumberWithCommas(display)}</div>
        <div className="current-output">{formatNumberWithCommas(result)}</div>
      </div>
      <button className="span-2" value="AC" onClick={handleClear}>
        CE
      </button>
      <button value="DEL" onClick={(e) => setDisplay(display.slice(0, -1))}>
        DEL
      </button>
      <button value="/" onClick={handleClickForModifiers}>
        ÷
      </button>
      <button value="7" onClick={handleClick}>
        7
      </button>
      <button value="8" onClick={handleClick}>
        8
      </button>
      <button value="9" onClick={handleClick}>
        9
      </button>
      <button value="*" onClick={handleClickForModifiers}>
        *
      </button>
      <button value="4" onClick={handleClick}>
        4
      </button>
      <button value="5" onClick={handleClick}>
        5
      </button>
      <button value="6" onClick={handleClick}>
        6
      </button>
      <button value="-" onClick={handleClickForModifiers}>
        -
      </button>
      <button value="1" onClick={handleClick}>
        1
      </button>
      <button value="2" onClick={handleClick}>
        2
      </button>
      <button value="3" onClick={handleClick}>
        3
      </button>
      <button value="+" onClick={handleClickForModifiers}>
        +
      </button>
      <button value="." onClick={handleClick}>
        .
      </button>
      <button value="0" onClick={handleClick}>
        0
      </button>
      <button className="span-2" value="=" onClick={handleResult}>
        =
      </button>
    </div>
  );
}

export default App;
