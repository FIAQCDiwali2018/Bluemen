import React, {Component} from 'react';
import Quiz from './../../components/Quiz';
import Result from './../../components/Result';

class QuizComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 0,
      question: '',
      answerOptions: {A:'',B:'',C:'',D:''},
      answer: '',
      result: '',
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  callApi = async (api) => {
    const response = await fetch(api);
    const body = await response.json();
    if (response.status !== 200) {throw Error(body.message);}
    return body;
  };

  UNSAFE_componentWillMount(){
    this.callApi('/restartQuiz')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.callApi('/questions/current')
      .then(res => this.updateState(res))
      .catch(err => console.log(err));
  }

  handleAnswerSelected(event) {
    setTimeout(() => this.setNextQuestion(), 0);
  }

  setNextQuestion() {
    this.callApi('/questions/next')
      .then(res => this.updateState(res))
      .catch(err => console.log(err));
  }

  updateState = (questionObject) =>{
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    if (questionObject && questionObject.question !== '') {
      this.setState({
        counter: counter,
        questionId: questionId,
        question: questionObject.question,
        answerOptions: questionObject.options,
        answer: questionObject.answer,
      });
    } else {
      this.setResults(this.getResults());
    }
  };

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      this.state.questionId > 0 ? <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        // questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      /> : ''
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    return (
      <div className="App">
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default QuizComponent;
