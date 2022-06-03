import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user-context";
import { sendPromptApiRequest, sendPromptAnonApiRequest, getUserResponsesApiRequest } from "../../utils/apiUtils";
import "./Main.scss";
import Decoration from "../../Components/Decoration/Decoration";
import Header from "../../Components/Header/Header";
import MoodSelector from "../../Components/MoodSelector/MoodSelector";
import Form from "../../Components/Form/Form";
import Print from "../../Components/Print/Print";
import jagged from "../../assets/imgs/jagged.svg";
import { v4 as uuidv4 } from "uuid";

export enum Moods {
  Neutral = "neutral",
  Cheerful = "cheerful",
  Gloomy = "gloomy",
  Flirty = "flirty",
  Sarcastic = "sarcastic",
}

export type AIResponse = {
  prompt: string;
  response: string;
  error?: string;
  mood: string;
  created_at: number;
  favorite: boolean;
  pk: string;
};

const Main: React.FC = () => {
  const [userID, setUserID] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [mood, setMood] = useState(Moods.Neutral);
  const [loading, setLoading] = useState(false);

  const user = useContext(UserContext);

  useEffect(() => {
    if (user.userId) {
      setUserID(user.userId);
      let token = sessionStorage.getItem('authToken');
      if (token) {
        getUserResponsesApiRequest(token, user.userId, onUserAPIResponse, onUserAPIError)
      }
    }
  }, [user]);

  const onUserAPIResponse = (responses: any) => {
    setResponses(responses);
  }

  const onUserAPIError = (error: any) => {
    console.error(error);
  }

  const onAPIResponse = (apiResponse: any) => {
    const newResponses = [
      {
        prompt: apiResponse.prompt,
        response: apiResponse.response,
        mood: apiResponse.mood,
        favorite: false,
        created_at: apiResponse.created_at || Date.now(),
        pk: apiResponse.pk ? apiResponse.pk : uuidv4(),
      },
      ...responses,
    ];
    setResponses(newResponses);
    setLoading(false);
    document.getElementById("responses")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onAPIError = (error: any) => {
    const ephemeralResponses = [
      {
        prompt: "Request failed",
        response:
          "Error message: Something went wrong. Please try again.",
        error: String(error),
        mood: mood,
        favorite: false,
        created_at: Date.now(),
        pk: uuidv4(),
      },
      ...responses,
    ];
    setResponses(ephemeralResponses);
    setLoading(false);
    document.getElementById("responses")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleRequest = (prompt: string) => {
    setLoading(true);
    let token = sessionStorage.getItem('authToken')
    let promptObj ={prompt: prompt, mood: mood}
    if (token) {
      sendPromptApiRequest(token, userID, promptObj, onAPIResponse, onAPIError)
    } else {
      sendPromptAnonApiRequest(promptObj, onAPIResponse, onAPIError)
    }
    
    // externalApiRequest(prompt, mood, onExternalAPIResponse, onExternalAPIError);
  };

  return (
    <div className="main">
      <Decoration mood={mood} />
      <Header />
      <main>
        <section className="main__section main__inputs">
          <div className="main__screen">
            <MoodSelector handleMoodChange={setMood} mood={mood} />
            {loading ? (
              <p>processing...</p>
            ) : (
              <Form handleRequest={handleRequest} />
            )}
          </div>
        </section>
        <section className="main__section main__outputs">
          <Print responses={responses} setResponses={setResponses} />
        </section>
        <div
          className="main__jagged"
          style={{ backgroundImage: `url(${jagged})` }}
        />
      </main>
    </div>
  );
};

export default Main;
