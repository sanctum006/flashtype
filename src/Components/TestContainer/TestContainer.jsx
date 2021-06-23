import React from 'react';
import './TestContainer.css';
import TryAgain from './../TryAgain/TryAgain.jsx'
import TypingChallengeContainer from './../TypingChallengeContainer/TypingChallengeContainer.jsx';

const TestContainer = ({
    selectedParagraph,
    timerStarted,
    timeRemaining,
    words,
    characters,
    wpm,
    testInfo,
    handleUserInput,
    startAgain
}) => {

    return <div className="test-container">
        {timeRemaining > 0 ?
        <div className="typing-challenge-cont">
            <TypingChallengeContainer
            selectedParagraph={selectedParagraph}
            words={words}
            characters={characters}
            wpm={wpm}
            timeRemaining={timeRemaining}
            timerStarted={timerStarted}
            testInfo={testInfo}
            handleUserInput={handleUserInput}
            />
        </div>
        :
        <div className="try-again-cont">
            <TryAgain words={4} characters={14} wpm={20} startAgain={startAgain} />
        </div>}
    </div>;
}

export default TestContainer;