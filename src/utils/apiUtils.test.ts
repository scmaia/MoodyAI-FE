import "@testing-library/jest-dom";
import { formatRequestData, sarcasticExample } from "./apiUtils";
import { Moods } from "../pages/Main/Main";

test("returns formatted data based on prompt input", async () => {
  const result = JSON.stringify(
    formatRequestData("example prompt", Moods.Sarcastic),
  );
  expect(result).toBe(
    JSON.stringify({
      prompt: sarcasticExample("example prompt"),
      temperature: 0.5,
      max_tokens: 60,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    }),
  );
});
