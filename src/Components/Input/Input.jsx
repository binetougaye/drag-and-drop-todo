import React, { useState } from "react";
import "./Input.css";
export default function Input({ onSubmit }) {
    const [input, setInput] = useState("");
    const handleSubmit = () => {
        if (!input) return;
        onSubmit(input);
        setInput("");
    };
    return (
        <div className="flex gap-5 mt-5">
            <input
                type="text"
                value={input}
                className="input md:w-96 w-full"
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
}
