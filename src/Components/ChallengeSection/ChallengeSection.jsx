import React from 'react';
import './ChallengeSection.css'
import TestContainer from '../TestContainer/TestContainer';

const ChallengeSection = ({
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
    return <div className="challenge-section-container">
        <h1 className="challenge-section-header">
            Take your speed test now!
        </h1>

        <TestContainer
            selectedParagraph={selectedParagraph}
            words={words}
            characters={characters}
            wpm={wpm}
            timeRemaining={timeRemaining}
            timerStarted={timerStarted}
            testInfo={testInfo}
            handleUserInput={handleUserInput}
            startAgain={startAgain}
        />
        </div>
}

export default ChallengeSection;