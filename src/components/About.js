import User from "./User";
import UserClass from "./UserClass"
import { Component } from "react";
class About extends Component {
    constructor(props) {
        super(props);

        console.log("Parent Constructor");
    }

    componentDidMount() {
        console.log("Parent Component Did Mount");
    }

    render() {
        console.log("Parent Render")
        return(
            <div>
                <h1>About</h1>
                <h1>This is Namaste React</h1>
                <User/>
                <UserClass name = {"First"} location = {"Hyderabad (Class)"}/>
                {/* <UserClass name = {"Second"} location = {"Bengaluru (Class)"}/> */}
            </div>
        );
    }

    componentWillUnmount() {
        console.log("Component Removed");
    }
    
};

export default About;