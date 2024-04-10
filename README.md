# Quiz recap

Educational app for quiz recapitulation.

![Screenshot showing the component](./docs/assets//quiz-recap.png)

> [!NOTE]
> This version is a pre-release and breaking changes may be introduced at any time.

## Features

### Choose between set of questions

Prior to starting a quiz, choose the desired number of questions.

### Multiple choice and multiple answers questions

The question type can be multiple-choice or single-choices.

### Instant feedback

After submission, receive immediate feedback with a clear indication of whether your answer was correct.

### Spaced repetition learning technique

A wrong answer will put the question back into the pool up to 3 times, to reinforce memory retention.

### Results page

A concise summary of your quiz performance on the results page upon completion.

## How to use

### Data Specification

Refer to `src/types.ts` for a detailed specification of the expected data format by the application.

### Options Configuration

Ensure the inclusion of the following options:

- `elementId` where the app will attach itself
- `locale` (optional) key for desired localization. Supports English and German. Will fall-back to English for any
  non-supported language.

### Example

```JS
  import renderQuizRecap from `quizRecap`;

  const selector = 'selector'; // id of DOM element
  const data = [ ... ]; // see `src/types.ts`

  renderQuizRecap(selector, data);
```

## Setup

1. Check out repo
2. `npm install`
3. `npm run dev`

### Tests

`npm run test`.

## Theming

### Colors

The App comes with a standard color scheme.

However, you can customize the app's theme to align with corporate design preferences. There are four key colors:

- `primary` for action buttons such as submitting an answer
- `neutral` for backgrounds
- `success` for indicating correct answers and starting a new quiz
- `danger` for destructive actions and indicating a wrong answer

Below, you can find an example.
It outlines the various shades that need to be defined for each color.

```css
.quiz-recap {
  --qr-color-primary: #3b82f6;
  --qr-color-primary-dark: #2563eb;

  --qr-color-neutral: #737373;
  --qr-color-neutral-light: #f5f5f5;
  --qr-color-neutral-dark: #525252;

  --qr-color-success: #22c55e;
  --qr-color-success-light: #86efac;
  --qr-color-success-dark: #16a34a;

  --qr-color-danger: #ef4444;
  --qr-color-danger-light: #fca5a5;
  --qr-color-danger-dark: #dc2626;
}
```

## Todo

### Outstanding Features

The feature set is not complete for release.

#### Required for MVP

- Suggest course item on results page (Reference link)

#### Nice to have

- Show answers on Result page
- Show remaining attempts in quiz
