import { useState } from "react";

const getDifferentRandomNumber = (current, length) => {
    const newRandomNumber = Math.floor(Math.random() * length);
    if (current !== newRandomNumber) {
        return newRandomNumber;
    }
    return getDifferentRandomNumber(current, length);
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

    const vote = () => {
        const arr = [...votes];
        arr[selected] += 1;
        setVotes(arr);
    };

    const mostVotes = () => {
        const highestVote = votes.reduce((a, b) => (a > b ? a : b));
        const indexOfHighestVote = votes.indexOf(highestVote);
        return { anecdote: anecdotes[indexOfHighestVote], votes: highestVote };
    };

    return (
        <div>
            <div style={{ height: 50 }}>
                <p>{anecdotes[selected]}</p>
            </div>
            <p>has {votes[selected]} votes</p>
            <button
                onClick={() =>
                    setSelected(
                        getDifferentRandomNumber(selected, anecdotes.length)
                    )
                }
            >
                Next
            </button>
            <button onClick={() => vote()}>Like</button>
            <h1>Anecdote with most votes</h1>
            <div>
                <p>{mostVotes().anecdote}</p>{" "}
                <p>with {mostVotes().votes} votes</p>
            </div>
        </div>
    );
};

export default App;
