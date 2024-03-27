import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };

    // console.log(props)
    console.log(this.props.name + " Child Constructor");
  }

  async componentDidMount() {
    console.log(this.props.name + " Child component did mount");

    const data = await fetch("https://api.github.com/users/kushal201");
    const jsonData = await data.json();

    console.log(jsonData);

    this.setState({
      userInfo: jsonData,
    });
  }

  componentDidUpdate() {
    console.log("Component updated");
  }

  render() {
    console.log("Child Render");

    const { name, location } = this.state.userInfo;

    return (
      <div className="user-card">
        <img src=""></img>
        <h1>From Class Component</h1>
        <button
          onClick={() => {
            this.setState({});
          }}
        >
          change count
        </button>
        {/* <h1>Count2: {count2}</h1> */}
        <h2>Name: {name}</h2>
        <h2>Location: {location}</h2>
      </div>
    );
  }
}

export default UserClass;
