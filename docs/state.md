# State

## App

- numberOfQuestions `number` (application state)
- results (application state)
- showResult
- quizStarted

Decides on the number of questions the quiz will have

## Form

Responsible for conducting the quiz

Collects results
Holds current selection

- isCorrect `boolean`
- submitted `boolean`
- selections `Answer[]`

# Quiz

TODO: Current question the user answers

- quizEnded `boolean` (application state)
- results `ResultType[]` (application state)
- questionIndex `number`
- question `Question | null`
- questionSet `Question[]`

## Answers

- no state

## QuestionText

- no state

## Result

Displays results in table
