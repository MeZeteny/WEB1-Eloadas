import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Számláló</h1>
            <p>Jelenlegi szám: {count}</p>
            <button onClick={() => setCount(count + 1)}>Növelés</button>
            <button onClick={() => setCount(count - 1)}>Csökkentés</button>
            <button onClick={() => setCount(0)}>Reset</button>
        </div>
    );
};

export default Counter;