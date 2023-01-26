const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Part = (props) => {
    return (
        <p>
            {props.info.part} {props.info.exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <>
            <Part info={props.info[0]} />
            <Part info={props.info[1]} />
            <Part info={props.info[2]} />
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
