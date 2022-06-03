import { Moods } from "../pages/Main/Main";
import { v4 as uuidv4 } from "uuid";

const USER_API_URL =
  "http://127.0.0.1:8000/";

//User API requests
export const getUserApiRequest = (
  token: string,
  onUserAPIResponse: (response: any) => void,
  onUserAPIError: (error: any) => void,
) => {
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
};

export const registerUserApiRequest = (
  userObj: object,
  onUserAPIResponse: (response: any) => void,
  onUserAPIError: (error: any) => void,
) => {
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
};

export const loginUserApiRequest = (
  userObj: object,
  onUserAPIResponse: (response: any) => void,
  onUserAPIError: (error: any) => void,
) => {
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
      console.log(responseData);
      onUserAPIResponse(responseData);
    })
    .catch((error) => {
      onUserAPIError(error);
    });
};

export const getUserResponsesApiRequest = (
  token: string,
  userID: string,
  onUserAPIResponse: (response: any) => void,
  onUserAPIError: (error: any) => void,
) => {
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
};

export const sendPromptApiRequest = (
  token: string,
  userID: string,
  promptObj: object,
  onAPIResponse: (response: any) => void,
  onAPIError: (error: any) => void,
) => {
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
      console.log("responseData", responseData)
      onAPIResponse(responseData);
    })
    .catch((error) => {
      onAPIError(error);
    });
};

export const sendPromptAnonApiRequest = (
  promptObj: object,
  onAPIResponse: (response: any) => void,
  onAPIError: (error: any) => void,
) => {
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
};

export const updateResponseApiRequest = (
  token: string,
  responseID: string,
  favorite: boolean
) => {
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
};
