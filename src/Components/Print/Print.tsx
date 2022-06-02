import { useState, useEffect } from "react";
import { setLocalStorage } from "../../utils/utils";
import { Moods, AIResponse } from "../../pages/Main/Main";
import "./Print.scss";
import ResponseCard from "../ResponseCard/ResponseCard";
import typewritter from "../../assets/imgs/typewritter.png";

interface IPrintProps {
  // current array of response records saved in state
  responses: AIResponse[];
  // function to update responses state
  setResponses: React.Dispatch<React.SetStateAction<AIResponse[]>>;
}

type MoodsObj = {
  [key in Moods]: string;
};

const Print: React.FC<IPrintProps> = ({ responses, setResponses }) => {
  //Creates an object where keys are each of the moods in enum Moods and all values are set to true as default;
  const defaultMoodFilters = Object.values(Moods).reduce(
    (prev, curr) => ({ ...prev, [curr]: true }),
    {},
  ) as MoodsObj;

  const [moodFilters, setMoodFilters] = useState<MoodsObj>(defaultMoodFilters);
  const [favoriteFilter, setFavoriteFilter] = useState(false);
  const [filteredResponses, setFilteredResponses] = useState<AIResponse[]>([]);

  useEffect(() => {
    setFilteredResponses([...responses]);
    resetFilters();
  }, [responses]);

  useEffect(() => {
    //This useEffect handles filtering as follows: (1) Creates an array with all the keys in moodFilters whose values are true; (2) Pre-filters for favorites-only first if that option is selected; (3) Filters responses whose mood exists in the array created in step 1.
    const moodsArray = Object.keys(moodFilters).filter(
      (k) => moodFilters[k as keyof MoodsObj],
    );
    const preFiltered = favoriteFilter
      ? responses.filter((response) => response.favorite === true)
      : responses;
    setFilteredResponses(
      preFiltered.filter((response) => moodsArray.includes(response.mood)),
    );
  }, [moodFilters, favoriteFilter, responses]);

  const resetFilters = () => {
    setMoodFilters(defaultMoodFilters);
    setFavoriteFilter(false);
  };

  const handleMoodCheckbox = (key: Moods) => {
    setMoodFilters({ ...moodFilters, [key]: !moodFilters[key] });
  };

  const handleFavoriteCheckbox = () => {
    setFavoriteFilter(!favoriteFilter);
  };

  const toggleFavorite = (id: string) => {
    const foundIndex = responses.findIndex((response) => response.id === id);
    const updatedResponses = [...responses];
    updatedResponses[foundIndex].favorite =
      !updatedResponses[foundIndex].favorite;
    setResponses(updatedResponses);
    setLocalStorage("AIresponses", JSON.stringify(updatedResponses));
  };

  return (
    <>
      <div className="print__container">
        <ul className="print__filters">
          {Object.entries(Moods).map(([key, value]: [string, Moods]) => (
            <li key={`checkbox-${key}`} className="print__filter">
              <input
                className="print__filter-input"
                type="checkbox"
                name={key}
                id={key}
                value={moodFilters[value as keyof MoodsObj]}
                checked={Boolean(moodFilters[value as keyof MoodsObj])}
                onChange={() => handleMoodCheckbox(value as keyof MoodsObj)}
              />
              <label htmlFor={key} className="print__filter-label">
                {key}
              </label>
            </li>
          ))}
        </ul>
        <div className="print__favorite">
          <input
            className="print__filter-input print__filter-input--fave"
            type="checkbox"
            name="favorite"
            id="favorite"
            value="favorite"
            checked={favoriteFilter}
            onChange={handleFavoriteCheckbox}
          />
          <label htmlFor="favorite" className="print__filter-label">
            Favorites Only
          </label>
        </div>
      </div>
      <div className="print__responses" id="responses">
        {filteredResponses.map((response) => (
          <ResponseCard
            key={response.id}
            prompt={response.prompt}
            response={response.response}
            error={response.error}
            mood={response.mood}
            favorite={response.favorite}
            timestamp={response.timestamp}
            id={response.id}
            toggleFavorite={toggleFavorite}
          />
        ))}
        {filteredResponses.length === 0 && (
          <p>
            {`>>> `}No response history to show. Submit a prompt or change the
            filters above.
          </p>
        )}
        <img
          className="print__typewriter print__typewriter--right"
          alt=""
          src={typewritter}
        />
        <img
          className="print__typewriter print__typewriter--left"
          alt=""
          src={typewritter}
        />
      </div>
    </>
  );
};

export default Print;
