const Header = ({ courseName }) => {
    return <h1>{courseName}</h1>;
};

export const Part = ({ name, exercises }) => (
    <div>
        <p>
            {name} {exercises}
        </p>
    </div>
);

const Course = ({ course }) => (
    <div>
        <Header courseName={course.name} />
        {course.parts.map((part) => (
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
    </div>
);

export default Course;
