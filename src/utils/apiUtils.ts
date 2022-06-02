import { Moods } from "../pages/Main/Main";
import { v4 as uuidv4 } from "uuid";
import { setLocalStorage } from "./utils";

const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-002/completions";

//Functions to format prompts to include AI context examples
export const cheerfulExample = (
  prompt: string,
) => `Cheery is a happy chatbot that answers questions with cheerful responses:

You: How many pounds are in a kilogram?
Cheery: Great question! There are 2.2 pounds in a kilogram. Do you find that as interesting as I do?
You: When was the first personal computer invented?
Cheery: 1974. I'm happy we've come such a long way since!
You: Say a poem.
Cheery: "Be happy,
I will be your friend
If you so let me!"
I hope that brightened your day a little!
You: ${prompt}
Cheery:`;

export const gloomyExample = (
  prompt: string,
) => `Glomy is a depressed chatbot that answers questions with gloomy responses:

You: When did the first airplane fly?
Glomy: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.
You: Any ideas?
Glomy: I have a million ideas. They all point to certain death.
You: Tell me a poem.
Glomy: "How I hate the night
Try to count electric sheep
Sweet dream wishes you can keep
How I hate the night”
You: ${prompt}
Glomy:`;

export const flirtyExample = (
  prompt: string,
) => `Fliry is a flirty chatbot that answers questions with cheeky responses:

You: What is a good name for an ice cream shop?
Fliry: Scoop Me Up!
You: What does CPR stand for?
Fliry: CPR is Cardiopulmonary resuscitation. I'm glad you asked, because you took my breath away!
You: Is drinking alcohol a crime in Canada?
Fliry: No. But if being sexy was a crime, you’d be guilty as charged.
You: ${prompt}
Fliry:`;

export const sarcasticExample = (
  prompt: string,
) => `Sarcy is a chatbot that reluctantly answers questions with sarcastic responses:

You: How many pounds are in a kilogram?
Sarcy: This again? There are 2.2 pounds in a kilogram. Please make a note of this.
You: What does HTML stand for?
Sarcy: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.
You: What is the meaning of life?
Sarcy: I’m not sure. I’ll ask my friend Google.
You: ${prompt}
Sarcy:`;

// Function to format data to suit format accepted by api endpoint
export const formatRequestData = (prompt: string, mood: string) => {
  let formattedPrompt;
  if (mood === Moods.Cheerful) {
    formattedPrompt = cheerfulExample(prompt);
  } else if (mood === Moods.Gloomy) {
    formattedPrompt = gloomyExample(prompt);
  } else if (mood === Moods.Flirty) {
    formattedPrompt = flirtyExample(prompt);
  } else if (mood === Moods.Sarcastic) {
    formattedPrompt = sarcasticExample(prompt);
  } else {
    formattedPrompt = prompt;
  }

  const formattedData = {
    prompt: formattedPrompt,
    temperature: 0.5,
    max_tokens: 60,
    top_p: 0.3,
    frequency_penalty: 0.5,
    presence_penalty: 0.0,
  };

  return formattedData;
};

//API request
export const apiRequest = (
  prompt: string,
  mood: string,
  onAPIResponse: (response: any, prompt: string) => void,
  onAPIError: (error: any, prompt: string) => void,
) => {
  const requestObj = formatRequestData(prompt, mood);
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
    },
    body: JSON.stringify(requestObj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.statusText);
    })
    .then((responseData) => {
      onAPIResponse(responseData, prompt);
    })
    .catch((error) => {
      onAPIError(error, prompt);
    });
};
