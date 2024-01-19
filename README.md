# Quiz recap

## Setup

1. Check out repo
2. `npm install`
3. `npm run start`

Optionally `npm run test`.

## Components

### App

- numberOfQuestions `number` (application state)
- results (application state)
- showResult
- quizStarted

Decides on the number of questions the quiz will have

### Form

Responsible for conducting the quiz

Collects results
Holds current selection

- isCorrect `boolean`
- submitted `boolean`
- selections `Answer[]`

### Quiz

TODO: Current question the user answers

- quizEnded `boolean` (application state)
- results `ResultType[]` (application state)
- questionIndex `number`
- question `Question | null`
- questionSet `Question[]`

### Answers

- no state

### QuestionText

- no state

### Result

Displays results in table

## Theming

### Colors

The App comes with a standard color scheme.

However, you can theme the App e.g. to fit a corporate design.
To do so, CSS variables defined in `src/index.css` must be overridden.

There are four colors, each must have a base and a lighter shade.

- `primary` for action buttons such as submitting an answer
- `neutral` for backgrounds
- `success` for indicating correct answers and starting a new quiz
- `danger` for destructive actions and indicating a wrong answer

## Todo

### Technical

- Break free from `create-react-app`
- "Widget setup" with bundler
- Release as npm package
- Consider changing data structure

### Features

#### Required

- Localization

#### Open for discussion

- Attempts feature
- Evaluate answers right away => Accessibility of auto-submit?

#### Nice to have

- Suggest course item on results page (Reference link)
- Show answers on Result page
