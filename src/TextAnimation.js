import "./textAnimation.css";

const TextAnimation = () => {
  return (
    <div className="text-animation">
      <div className="title fade-in-left">Try our tools for free!</div>
      <button className="fade-in-left">
        <span>try now</span>
        <div class="liquid"></div>
      </button>
    </div>
  );
};

export default TextAnimation;
