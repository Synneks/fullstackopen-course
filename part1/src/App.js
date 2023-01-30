import { useState } from "react";

const Feedback = ({ handleGood, handleNeutral, handleBad }) => {
    return (
        <>
            <h1>Give Feedback</h1>
            <FeedbackButton vote={handleGood} text="good" />
            <FeedbackButton vote={handleNeutral} text="neutral" />
            <FeedbackButton vote={handleBad} text="bad" />
        </>
    );
};

const FeedbackButton = ({ vote, text }) => {
    return <button onClick={vote}>{text}</button>;
};

const Statistics = ({ votes }) => {
    const votesAmount = votes.good + votes.neutral + votes.bad;
    const average = (votes.good - votes.bad) / votesAmount;
    const positives = (votes.good / votesAmount) * 100;

    if (!votesAmount) {
        return (
            <>
                <p>No feedback given</p>
            </>
        );
    }

    return (
        <>
            <h1>Statistics</h1>
            <table>
                <StatisticsLine text="good" value={votes.good} />
                <StatisticsLine text="neutral" value={votes.neutral} />
                <StatisticsLine text="bad" value={votes.bad} />
                <StatisticsLine text="total" value={votesAmount} />
                <StatisticsLine text="average" value={average} />
                <StatisticsLine text="positive" value={positives} />
            </table>
        </>
    );
};

const StatisticsLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGood = () => {
        setGood(good + 1);
    };

    const handleNeutral = () => {
        setNeutral(neutral + 1);
    };

    const handleBad = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <Feedback
                handleGood={handleGood}
                handleNeutral={handleNeutral}
                handleBad={handleBad}
            />
            <Statistics votes={{ good, neutral, bad }} />
        </div>
    );
};

export default App;
