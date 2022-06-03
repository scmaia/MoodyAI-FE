import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/user-context";
import { api } from "../../utils/apiUtils";
import "./Main.scss";
import Decoration from "../../Components/Decoration/Decoration";
import Header from "../../Components/Header/Header";
import MoodSelector from "../../Components/MoodSelector/MoodSelector";
import Form from "../../Components/Form/Form";
import Print from "../../containers/Print/Print";
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
        api.getResponsesList(token, user.userId, onGetListResponse, onGetListError)
      }
    }
  }, [user]);

  const handleRequest = (prompt: string) => {
    setLoading(true);
    let promptObj ={prompt: prompt, mood: mood}
    let token = sessionStorage.getItem('authToken');
    if (token) {
      api.getResponse(token, userID, promptObj, onGetResponseResponse, onGetResponseError)
    } else {
      api.getResponseAnon(promptObj, onGetResponseResponse, onGetResponseError)
    }
  };

  const onGetListResponse = (responses: any) => {
    setResponses(responses);
  }

  const onGetListError = (error: any) => {
    console.error(error);
  }

  const onGetResponseResponse = (apiResponse: any) => {
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

  const onGetResponseError = (error: any) => {
    const tempResponses = [
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
    setResponses(tempResponses);
    setLoading(false);
    document.getElementById("responses")?.scrollIntoView({
      behavior: "smooth",
    });
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
