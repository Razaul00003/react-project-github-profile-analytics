import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();
const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setrepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //requesting data using api
  const [requests, setRequests] = useState(0);
  const [loading, setLoading] = useState(false);
  //check search limit
  const checkRequestLimit = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          //throw errro
        }
      })
      .catch((err) => {});
  };
  //error
  useEffect(checkRequestLimit, []);
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests }}>
      {children}
    </GithubContext.Provider>
  );
};
export { GithubContext, GithubProvider };
