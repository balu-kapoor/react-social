import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import Loader from "react-loader-spinner";
import FB from "fb";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class Facebook extends Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
    pages: "",
    message: "",
  };

  componentClicked = () => {
    console.log("Fetching account details...");
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  responseFacebook = (response) => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
    // console.log(response);
    FB.setAccessToken(response.accessToken);
  };

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: "400px",
            margin: "auto",
            background: "#f4f4f4",
            padding: "20px",
          }}
        >
          <img
            style={{ borderRadius: "50px", border: "1px solid #3e3930" }}
            src={this.state.picture}
            alt={this.state.name}
          />
          <h2>Welcome {this.state.name}</h2>
          <h4>Email: {this.state.email}</h4>
          <ul className="pages">
            {this.state.pages
              ? this.state.pages.map((page, i) => (
                  <li key={page.id}>
                    {console.log(page)}
                    <p>Page ID: {page.id}</p>
                    <p>Page Name: {page.name}</p>
                    <input
                      type="text"
                      onChange={(e) =>
                        this.setState({ message: e.target.value })
                      }
                      //   value={this.state.message}
                    />
                    <button
                      onClick={() => {
                        FB.setAccessToken(page.access_token);
                        FB.api(
                          `/${page.id}/feed`,
                          "POST",
                          { message: this.state.message },
                          function (response) {
                            console.log(response);
                          }
                        );
                      }}
                    >
                      Publich a post
                    </button>
                  </li>
                ))
              : ""}
          </ul>

          <button
            onClick={() => {
              FB.api("/me/accounts", "get", (response) => {
                // console.log(response);
                this.setState({ pages: response.data });
              });
            }}
          >
            Get all data
          </button>
        </div>
      );
    } else {
      fbContent = (
        <>
          <FacebookLogin
            appId="2849297475308668"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            scope="public_profile,user_friends,pages_manage_posts"
            callback={this.responseFacebook}
          />
        </>
      );
    }
    return (
      <div>
        <Loader
          visible={this.state.isLoading ? true : false}
          type="ThreeDots"
          color="#00BFFF"
          height={80}
          width={80}
        />
        {fbContent}
      </div>
    );
  }
}
