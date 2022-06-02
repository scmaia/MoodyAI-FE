import "./Form.scss";
import Button from "../Button/Button";
import React, { useState } from "react";

interface IFormProps {
  // function to handle api request upon form submission
  handleRequest: (returnPrompt: string) => void;
}

const Form: React.FC<IFormProps> = ({ handleRequest }) => {
  const [prompt, setPrompt] = useState("");

  const handlePromptChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setPrompt(event.target.value);
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (prompt.length < 2) {
      return;
    } else {
      const returnPrompt = prompt;
      setPrompt("");
      handleRequest(returnPrompt);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <label htmlFor="prompt" className="form__label">
        Enter prompt:{" "}
      </label>
      <textarea
        className="form__field"
        rows={4}
        name="prompt"
        id="prompt"
        value={prompt}
        onChange={handlePromptChange}
      />
      <div className="form__buttons">
        {prompt.length > 1 ? (
          <Button text="Submit" type="submit" extraClass="enabled" />
        ) : (
          <div aria-hidden>
            <Button text="Disabled" type="reset" extraClass="disabled" />
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;
