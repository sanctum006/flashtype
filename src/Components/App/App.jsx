import React from 'react';
import './App.css'
import Nav from './../Nav/Nav.jsx'
import Landing from '../Landing/Landing';
import Footer from '../Footer/Footer';
import ChallengeSection from '../ChallengeSection/ChallengeSection';

const totalTime = 60;
const serviceUrl = 'https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text'; 

const DefaultState = {
    selectedParagraph: "Hello World",
    timerStarted: false,
    timeRemaining: totalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: []
};

class App extends React.Component {

    state = DefaultState;

    fetchNewParagraph = () => {
        fetch(serviceUrl)
        .then(res => res.text())
        .then((info) => {
            const selectedParagraphArray = info.split("");
            const testInfo = selectedParagraphArray.map((selectedLetter) => {
                return {
                    testLetter: selectedLetter,
                    status: "notAttempted",
                };
            });

            this.setState({
                ...DefaultState,
                selectedParagraph: info,
                testInfo
            });
        });
    }

    componentDidMount() {
        this.fetchNewParagraph();
    };

    startAgain = () => this.fetchNewParagraph();

    startTimer = () => {
        this.setState({
            timerStarted: true
        });

        const timer = setInterval(() => {
            if(this.state.timeRemaining > 0) {
                const timeSpent = totalTime - this.state.timeRemaining;
                const wpm = timeSpent > 0 ? ((this.state.words/timeSpent) * 60).toFixed(0) : 0;
                this.setState({wpm: wpm})

                this.setState({
                    timeRemaining: this.state.timeRemaining-1
                });
            }
            else {
                clearInterval(timer);
            }
        }, 1000);
    }

    handleUserInput = (inputVal) => {
        if(!this.state.timerStarted)
            this.startTimer();

        const characters = inputVal.length;
        const words = inputVal.split(" ").length;
        const index = characters - 1;

        if (index < 0) {
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted"
                    },
                    ...this.state.testInfo.slice(1)
                ],
                characters,
                words
            });

            return;
        }

        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words});
            return;
        }

        const testInfo = this.state.testInfo;
        if (!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = "notAttempted";

        const isCorrect = inputVal[index] === testInfo[index].testLetter;
        
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        this.setState({
            testInfo,
            words,
            characters,
        })
    }

    render () {

        console.log(this.state.selectedParagraph);
        return <div className="app">
            {/* Nav Section */}
            <Nav />
            {/* Landing Page */}
            <Landing />
            {/* Challenge Section */}
            <ChallengeSection
                selectedParagraph={this.state.selectedParagraph}
                words={this.state.words}
                characters={this.state.characters}
                wpm={this.state.wpm}
                timeRemaining={this.state.timeRemaining}
                timerStarted={this.state.timerStarted}
                testInfo={this.state.testInfo}
                handleUserInput={this.handleUserInput}
                startAgain={this.startAgain}
            />
            {/* Footer Section */}
            <Footer />
        </div>;
    }
}

export default App;