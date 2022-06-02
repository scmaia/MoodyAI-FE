import React from "react";
import "./Button.scss";

interface IButtonProps {
  // Text to display in button
  text?: string;
  // Icon to display next to the text
  icon?: string;
  // Type of button. Accepts "button", "submit" or "reset"
  type?: "button" | "submit" | "reset";
  // Extra styles to apply to the button. Accepts class name qualifiers "cancel", "disable" or "enable"
  extraClass?: "cancel" | "disabled" | "enabled";
  // Callback called when button is clicked
  onClick?: (event: React.MouseEvent) => void;
}

const Button: React.FC<IButtonProps> = ({
  text,
  icon,
  type,
  extraClass,
  onClick,
}) => {
  return (
    <button
      className={extraClass ? `CTA CTA--${extraClass}` : "CTA"}
      type={type ? type : "button"}
      onClick={onClick}
      disabled={extraClass === "disabled" ? true : false}
    >
      {icon && (
        <img
          className={text ? "CTA__icon" : "CTA__single-icon"}
          src={icon}
          alt=""
          aria-hidden="true"
        />
      )}
      <p className="CTA__text">{text}</p>
    </button>
  );
};

export default Button;
