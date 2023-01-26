const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Content = (props) => {
    return (
        <>
            <p>
                {props.info[0].part} {props.info[0].exercises}
            </p>
            <p>
                {props.info[1].part} {props.info[1].exercises}
            </p>
            <p>
                {props.info[2].part} {props.info[2].exercises}
            </p>
        </>
    );
};

const Total = (props) => {
    return (
        <p>
            Number of exercises:{" "}
            {props.exercises[0] + props.exercises[1] + props.exercises[2]}
        </p>
    );
};

const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content
                info={[
                    { part: part1, exercises: exercises1 },
                    { part: part2, exercises: exercises2 },
                    { part: part3, exercises: exercises3 },
                ]}
            />
            <Total exercises={[exercises1, exercises2, exercises3]} />
        </div>
    );
};

export default App;
