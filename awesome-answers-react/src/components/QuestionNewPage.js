import React, { Component } from 'react';
import QuestionForm from './QuestionForm';
import { Question } from '../lib/requests';

class QuestionNewPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      validationErrors: []
    };

    this.createQuestion = this.createQuestion.bind(this);
  }

  createQuestion (questionParams) {
    Question
      .create(questionParams)
      .then(data => {

        if (data.errors) {
          this.setState({
            validationErrors: data
              .errors
              .filter(
                e => e.type === "ActiveRecord::RecordInvalid"
              )
          });
        } else {
          // const id = data.id
          const { id } = data;

          // Components rendered by the <Route /> component
          // gain access to a .history than can be used to manipulate
          // history. Using allows to redirect a user to
          // a different rendering whichever component is there.
          this.props.history.push(`/questions/${id}`);
        }
      })
  }

  render () {
   return (
     <main
       className="QuestionNewPage"
       style={{margin: '0 1rem'}}
     >
       <h1>New Question</h1>
       <QuestionForm
         errors={this.state.validationErrors}
         onSubmit={this.createQuestion}
       />
     </main>
   );
 }
}

export default QuestionNewPage;
