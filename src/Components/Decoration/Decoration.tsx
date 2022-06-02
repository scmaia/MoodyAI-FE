import "./Decoration.scss";
import {
  baseSvg,
  cheerfulSvg,
  gloomySvg,
  flirtySvg,
  sarcasticSvg,
} from "./svgImages";

interface IDecorationProps {
  //mood category to render associated graphics
  mood: string;
}

const Decoration: React.FC<IDecorationProps> = ({ mood }) => {
  return (
    <section className="decoration">
      {baseSvg}
      {mood === "cheerful" && cheerfulSvg}
      {mood === "gloomy" && gloomySvg}
      {mood === "flirty" && flirtySvg}
      {mood === "sarcastic" && sarcasticSvg}
    </section>
  );
};

export default Decoration;
