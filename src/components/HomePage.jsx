import React, { useState, useEffect } from 'react';
import './HomePage.css';

const TED_LASSO_QUOTES = [
  "I believe in hope. I believe in Believe.",
  "Be curious, not judgmental.",
  "It's the hope that kills you.",
  "I think that if you care about someone and you got a little love in your heart, there ain't nothing you can't get through together.",
  "Taking on a challenge is a lot like riding a horse, isn't it? If you're comfortable while you're doing it, you're probably doing it wrong.",
  "Doing the right thing is never the wrong thing.",
  "I shouldn't bring an umbrella to a brainstorm.",
  "If you're not having fun watching football, you're doing it wrong.",
  "All people are different people.",
  "I promise you there is something worse out there than being sad, and that's being alone and being sad.",
  "Guys have underestimated me my entire life. And for years, I never understood why. It used to really bother me. But then one day, I was driving my little boy to school, and I saw this quote by Walt Whitman, and it was painted on the wall there. It said, 'Be curious, not judgmental.' I like that.",
  "So I've been hearing this phrase y'all got over here that I ain't too crazy about. 'It's the hope that kills you.' Y'all know that? I disagree, you know? I think it's the lack of hope that comes and gets you.",
  "If that's a joke, I love it. If not, can't wait to unpack that with you later.",
  "I feel like we fell out of the lucky tree, hit every branch on the way down, ended up in a pool full of cash and Sour Patch Kids.",
  "I do love a locker room. It smells like potential.",
  "You beating yourself up is like Woody Allen playing the clarinet. I don't want to hear it.",
  "Our goal is to go out like Willie Nelson – on a high!",
  "Every disadvantage has its advantage.",
  "Taking on a challenge is a lot like riding a horse. If you're comfortable while you're doing it, you're probably doing it wrong."
];

function HomePage({ onEnter }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Select a random quote on component mount
    const randomQuote = TED_LASSO_QUOTES[Math.floor(Math.random() * TED_LASSO_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="homepage">
      <div className="homepage-container">
        <img
          src="/dog.png"
          alt="Dog"
          className="supporting-img dog-img"
        />

        <div className="main-content">
          <img
            src="/ted.png"
            alt="Ted Lasso"
            className="main-image"
          />

          <h1 className="title">
            Ted Lasso's 2026 World Cup Pool
          </h1>

          {quote && (
            <p className="ted-quote">
              "{quote}"
            </p>
          )}

          <button className="enter-btn" onClick={onEnter}>
            Enter Pool
          </button>

          <div className="pool-rules-box">
            <h2 className="rules-title">Pool Rules</h2>
            <div className="rules-content">
              <p>Edit this section to add your pool rules.</p>
              <p>You can modify the rules in the HomePage.jsx file.</p>
            </div>
          </div>
        </div>

        <img
          src="/dickman.jpeg"
          alt="Dickman"
          className="supporting-img dickman-img"
        />
      </div>
    </div>
  );
}

export default HomePage;
