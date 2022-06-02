import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__title-container">
        <h1 className="header__title" title="Moody AI">
          Moody AI
        </h1>
      </div>
      <h2>by Sara Maia</h2>
      <div className="header__credits">
        <p>
          Powered by <a href="https://beta.openai.com/">OpenAI</a>
        </p>
        <p>
          Visit{" "}
          <a href="https://github.com/scmaia/openai-challenge">GitHub Repo</a>
        </p>
      </div>
    </header>
  );
};

export default Header;
