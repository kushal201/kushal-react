// Creating a React element
const heading = React.createElement("h1", {id:"heading"}, "Namaste React");

// Title Component
const Title = () => (
    <h1 className="">Title Component</h1>
);

const division = (
    <h1>
        This is the div part
    </h1>
);
// Middle component
const Middle = () => (
    <h2>This is the middle component</h2>
);
// React element

const foot = (
    <h1>
        Bottom element
    </h1>
);

const num = 1000;

// React Functional Component

const HeadingComponent = () => (
    <div id = "container">
        {division}
        <h2>{num}</h2>
        <Title/>
        <Middle/>
        <h1 className="heading">Namaste React Functional Component</h1>
        {foot}
    </div>
);

// Shorthand syntax for writing functional component
const HeadingComponent2 = () => <h1>Shorthand syntax</h1>;