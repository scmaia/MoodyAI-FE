// const USER_API_URL = "http://127.0.0.1:8000/";
const USER_API_URL = "https://moodyai-api.herokuapp.com/";

export const api = {

  getUser(
    token: string,
    onUserAPIResponse: (response: any) => void,
    onUserAPIError: (error: any) => void,
  ){
    fetch(`${USER_API_URL}api/users/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`,
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((responseData) => {
        onUserAPIResponse(responseData);
      })
      .catch((error) => {
        onUserAPIError(error);
      });
  },

  registerUser(
    userObj: object,
    onUserAPIResponse: (response: any) => void,
    onUserAPIError: (error: any) => void,
  ){
    fetch(`${USER_API_URL}auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (response.ok) {
          return response.status;
        }
        throw Error(response.statusText);
      })
      .then((responseData) => {
        onUserAPIResponse(responseData);
      })
      .catch((error) => {
        onUserAPIError(error);
      });
  },

  loginUser(
    userObj: object,
    onUserAPIResponse: (response: any) => void,
    onUserAPIError: (error: any) => void,
  ){
    fetch(`${USER_API_URL}auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((responseData) => {
        onUserAPIResponse(responseData);
      })
      .catch((error) => {
        onUserAPIError(error);
      });
  },
  
  getResponsesList(
    token: string,
    userID: string,
    onUserAPIResponse: (response: any) => void,
    onUserAPIError: (error: any) => void,
  ){
    fetch(`${USER_API_URL}api/users/${userID}/responses/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`,
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((responseData) => {
        onUserAPIResponse(responseData);
      })
      .catch((error) => {
        onUserAPIError(error);
      });
  },
  
  getResponse(
    token: string,
    userID: string,
    promptObj: object,
    onAPIResponse: (response: any) => void,
    onAPIError: (error: any) => void,
  ){
    fetch(`${USER_API_URL}api/users/${userID}/responses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`,
      },
      body: JSON.stringify(promptObj),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((responseData) => {
        onAPIResponse(responseData);
      })
      .catch((error) => {
        onAPIError(error);
      });
  },
  
  getResponseAnon(
    promptObj: object,
    onAPIResponse: (response: any) => void,
    onAPIError: (error: any) => void,
  ){
    fetch(`${USER_API_URL}api/users/anonymous/responses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptObj),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw Error(response.statusText);
      })
      .then((responseData) => {
        onAPIResponse(responseData);
      })
      .catch((error) => {
        onAPIError(error);
      });
  },
  
  updateResponse(
    token: string,
    responseID: string,
    favorite: boolean
  ){
    fetch(`${USER_API_URL}api/responses/${responseID}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `token ${token}`,
      },
      body: JSON.stringify({favorite: favorite}),
    })
      .then((response) => {
        if (response.ok) {
          return response.status;
        }
        throw Error(response.statusText);
      })
      .catch((error) => {
        console.error(error);
      });
  },

  ping(){
    fetch(`${USER_API_URL}api/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.status;
        }
        throw Error(response.statusText);
      })
      .catch((error) => {
        console.error(error);
      });
  },
}