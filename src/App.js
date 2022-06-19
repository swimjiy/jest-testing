import { useState } from 'react';
import './App.css';

export function replaceCamelWithSpace(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const newButtonColor = buttonColor === 'red' ? 'blue' : 'red';
  return (
    <div>
      <button
        style={{ backgroundColor: buttonDisabled ? 'gray' : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={buttonDisabled}
      >
        Change to {newButtonColor}
      </button>
      <input
        type="checkbox"
        id="enable-button-checkbox"
        defaultChecked={buttonDisabled}
        aria-checked={buttonDisabled}
        onChange={(e) => setButtonDisabled(e.target.checked)}
      />
      <label htmlFor="enable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
