import User from "./User";
import UserClass from "./UserClass"
const About = () => {
    return(
        <div>
            <h1>About</h1>
            <h1>This is Namaste React</h1>
            <User/>
            <UserClass name = {"Kushal (Class)"} location = {"Hyderabad (Class)"}/>
        </div>
    );
};

export default About;