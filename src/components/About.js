import User from "./User";
import UserClass from "./UserClass"
import { Component } from "react";
class About extends Component {
    constructor(props) {
        super(props);

        console.log("Parent Constructor");
    }

    componentDidMount() {
        console.log("Parent Component Did Mount")
    }

    render() {
        console.log("Parent Render")
        return(
            <div>
                <h1>About</h1>
                <h1>This is Namaste React</h1>
                <User/>
                <UserClass name = {"Kushal (Class)"} location = {"Hyderabad (Class)"}/>
            </div>
        );
    }
    
};

export default About;