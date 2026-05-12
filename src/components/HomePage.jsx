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
            <h2 className="rules-title">📋 Pool Rules</h2>
            <div className="rules-content">

              <p className="rules-welcome">
                Welcome to Ted Lasso's 2026 World Cup Pool! Whether you're a die-hard football fan or just here for the banter, everyone's got a shot. Pick your scores, follow the tournament, and may the best predictor win. 🏆
              </p>

              <div className="rules-section">
                <h3>💰 Entry & Prizes</h3>
                <ul>
                  <li>Entry fee: <strong>$20 per person</strong> (payment details to follow)</li>
                  <li><strong>1st place</strong> takes home <strong>75%</strong> of the pot</li>
                  <li><strong>2nd place</strong> takes home <strong>25%</strong> of the pot</li>
                </ul>
              </div>

              <div className="rules-section">
                <h3>📝 Making Predictions</h3>
                <ul>
                  <li>Predict the scoreline for each match — the result (win/draw/loss) is derived automatically from your score</li>
                  <li>For knockout rounds, check the <strong>Pens</strong> box if you think the match goes to a penalty shootout — enter the score as if the winning team scored one more (e.g. 2–1 with Pens checked means you're predicting it was 1–1 before penalties, and your team won the shootout)</li>
                  <li>Predictions lock when each stage begins, so get them in early!</li>
                  <li>Don't stress about the whole tournament upfront — <strong>you can submit fresh predictions after each stage</strong> for the next round, so no one falls behind just for joining late</li>
                </ul>
              </div>

              <div className="rules-section">
                <h3>🧮 Scoring System</h3>
                <table className="scoring-table">
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Correct Result</th>
                      <th>Exact Score Bonus*</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Group Stage</td><td>1 pt</td><td>+0.5 pt</td></tr>
                    <tr><td>Round of 32</td><td>2 pts</td><td>+1 pt</td></tr>
                    <tr><td>Round of 16</td><td>3 pts</td><td>+1.5 pts</td></tr>
                    <tr><td>Quarterfinal</td><td>4 pts</td><td>+2 pts</td></tr>
                    <tr><td>Semifinal</td><td>5 pts</td><td>+2.5 pts</td></tr>
                    <tr><td>Third Place</td><td>5 pts</td><td>+2.5 pts</td></tr>
                    <tr><td>Final</td><td>6 pts</td><td>+3 pts</td></tr>
                  </tbody>
                </table>
                <p className="rules-note">* Exact score bonus in knockout rounds requires both the correct scoreline <em>and</em> the correct Pens prediction. A 2–1 win and a 2*–1 penalty win are treated as different scores.</p>
              </div>

              <p className="rules-footer">
                Good luck, have fun, and remember — "Be curious, not judgmental." ⚽
              </p>

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
