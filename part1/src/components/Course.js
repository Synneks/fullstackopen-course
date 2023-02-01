const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>;
};

const Part = ({ name, exercises }) => (
    <div>
        <p>
            {name} {exercises}
        </p>
    </div>
);

const Sum = ({ numbers }) => {
    return (
        <strong>total of {numbers.reduce((a, b) => a + b)} exercises</strong>
    );
};

const Course = ({ course }) => (
    <div>
        <Header courseName={course.name} />
        {course.parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
        <Sum numbers={course.parts.map((part) => part.exercises)} />
    </div>
);

export default Course;
