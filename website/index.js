import React from 'react'
import { render } from 'react-dom'
import DatePickerExample from './examples/DatePickerExample'
import DateRangePickerExample from './examples/DateRangePickerExample'
import DatePickerCalendarExample from './examples/DatePickerCalendarExample'
import DateRangePickerCalendarExample from './examples/DateRangePickerCalendarExample'
import StandaloneInputExample from './examples/StandaloneInputExample'
import DatePickerCalendarWithInputExample from './examples/DatePickerCalendarWithInputExample'
import ModifiersExample from './examples/ModifiersExample'
import LocalesExample from './examples/LocalesExample'
import CalendarExample from './examples/CalendarExample'
import CodeBlock from './CodeBlock'

function App() {
  return (
    <div className='container'>
      <h1>React Nice Dates</h1>
      <p className='tagline'>A responsive, touch-friendly, and modular date picker library.</p>

      <nav className='nav'>
        <a href='#overview'>Overview</a>
        <a href='#installation'>Installation</a>
        <a href='#api-reference'>API Reference</a>
        <a href='https://github.com/hernansartorio/react-nice-dates'>GitHub</a>
      </nav>

      <h2 id='overview'>Overview</h2>

      <p>
        React Nice Dates is composed of a set of components and utilities with different levels of abstraction that you
        can use to build your own date pickers.
      </p>

      <p>
        At the top level, you have <code>DatePicker</code> and <code>DateRangePicker</code>. These are
        slightly-opinionated components that should cover the most common use-cases. They allow displaying date inputs
        with a calendar popover below. They make no assumptions about how your inputs should look. Instead, they provide
        all the necessary props so you can render them yourself.
      </p>

      <p>
        Here’s the most basic example using the <code>DatePicker</code> component:
      </p>

      <DatePickerExample />

      <p>
        <em>
          Hint: If you are using a touch device, you can also change the current month by dragging the calendar grid up
          or down.
        </em>
      </p>

      <p>
        Here’s a more complete example, this time using the <code>DateRangePicker</code> component:
      </p>

      <DateRangePickerExample />

      <h3>Customizing how the calendar appears</h3>

      <p>
        Next, you have <code>DatePickerCalendar</code> and <code>DateRangePickerCalendar</code>, the calendar-only date
        picker components (used by <code>DatePicker</code> and <code>DateRangePicker</code>). Use these if you want to
        display the calendars inline or implement your own popover component, for example.
      </p>

      <p>
        <code>DatePickerCalendar</code> example:
      </p>

      <DatePickerCalendarExample />

      <p>
        <code>DateRangePickerCalendar</code> example:
      </p>

      <DateRangePickerCalendarExample />

      <h3>Customizing days</h3>

      <p>
        Modifiers define what CSS classes are applied to each calendar day. All the components accept a{' '}
        <code>modifiers</code>
        prop—an object where each key corresponds to the modifier name, and each value corresponds to a function that
        receives a <code>date</code> parameter and must return a <code>boolean</code> determining whether that modifier
        class should apply to that particular day.
      </p>

      <p>
        The default modifiers are <code>disabled</code>, <code>selected</code>, and <code>today</code>. You can also
        create your own modifiers by passing a <code>modifiersClassNames</code> which will be matched to the{' '}
        <code>modifiers</code> object.
      </p>

      <ModifiersExample />

      <h3>Implementing your own date-picking behavior</h3>

      <p>
        If you need to implement a date-picking behavior not covered by the previous components, you can use the{' '}
        <code>Calendar</code> component directly (<code>DatePickerCalendar</code> and
        <code>DateRangePickerCalendar</code> are themselves wrappers around this component). It accepts callbacks for
        when a day is clicked or hovered, which you can then use to create modifiers to control which days are selected.
      </p>

      <CalendarExample />

      <h3>Parsing text inputs</h3>

      <p>
        You can also use the <code>useDateInput</code> hook if you want to have the same date-parsing functionality on
        text inputs in your custom implementation.
      </p>

      <p>Here’s an example using it on a standalone input:</p>

      <StandaloneInputExample />

      <p>
        And here it is paired with <code>DatePickerCalendar</code>:
      </p>

      <DatePickerCalendarWithInputExample />

      <h3>Localization</h3>

      <p>
        As you might have noticed, React Nice Dates relies of the awesome <a href='https://date-fns.org/'>date-fns</a>{' '}
        library as a peer dependency. All components require a <code>locale</code> prop, which must be a{' '}
        <a href='https://date-fns.org/v2.9.0/docs/I18n'>date-fns locale object</a> of your desired language.
      </p>

      <LocalesExample />

      <h2 id='installation'>Installation</h2>

      <p>
        1. Add the <code>react-nice-dates</code> and <code>date-fns</code> packages to your dependencies.
      </p>

      <p>With NPM:</p>

      <CodeBlock code={'npm install react-nice-dates date-fns --save'} language='bash' />

      <p>Or with Yarn:</p>

      <CodeBlock code={'yarn add react-nice-dates date-fns'} language='bash' />

      <p>2. Import the desired components, a date-fns locale object of your language, and the CSS:</p>

      <CodeBlock
        code={`import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
//...
<DatePickerCalendar locale={enGB} />`}
      />

      <h3>Style customization</h3>

      <p>You can use and override the compiled CSS on your project:</p>

      <CodeBlock
        code={`

.nice-dates-navigation, .nice-dates-day {
  color: #111;
}

.nice-dates-popover {
  box-shadow: none;
  border: 1px solid #ddd;
  border-radius: 2px;
  max-width: 480px;
  transition: none;
}`}
        language='css'
      />

      <p>Or, if you’re using SASS, import the original SASS file for easier customization:</p>

      <CodeBlock
        code={`
// Existing variables and their defaults
$nice-dates-color-gray-dark: #333;
$nice-dates-color-gray: #999;
$nice-dates-color-gray-light: #ddd;
$nice-dates-color-accent: $nice-dates-color-gray-dark;

$nice-dates-font-size-small: 12px;
$nice-dates-font-size-base: 14px;
$nice-dates-font-size-big: 16px;

@import 'react-nice-dates/src/style.scss';

// Other overrides...
`}
        language='scss'
      />

      <h2 id='api-reference'>API Reference</h2>

      <h3>
        <code>DatePicker</code> props
      </h3>

      <CodeBlock
        code={`
children: func.isRequired, // ({ inputProps, focused }) => {}
locale: object.isRequired,
date: instanceOf(Date),
onDateChange: func,
format: string, // Default: locale.formatLong.date({ width: 'short' })
minimumDate: instanceOf(Date), // See Calendar props
maximumDate: instanceOf(Date), // See Calendar props
modifiers: objectOf(func),
modifiersClassNames: objectOf(string)`}
      />

      <p>
        <code>inputProps</code> properties:
      </p>

      <CodeBlock
        code={`
onBlur,
onChange,
onFocus,
placeholder, // Default: format.toLowerCase()
readOnly, // Default: true for touch devices to avoid triggering the on-screen keyboard
ref,
type, // Default: 'text'
value
`}
      />

      <h3>
        <code>DateRangePicker</code> props
      </h3>

      <CodeBlock
        code={`children: func.isRequired, // ({ startDateInputProps, endDateInputProps, focus }) => {}
locale: object.isRequired,
startDate: instanceOf(Date),
endDate: instanceOf(Date),
onStartDateChange: func,
onEndDateChange: func,
format: string, // Default: locale.formatLong.date({ width: 'short' })
minimumDate: instanceOf(Date), // See Calendar props
maximumDate: instanceOf(Date), // See Calendar props
modifiers: objectOf(func),
modifiersClassNames: objectOf(string)`}
      />

      <p>
        <code>startDateInputProps</code> and <code>endDateInputProps</code> properties:
      </p>

      <CodeBlock
        code={`
onBlur,
onChange,
onFocus,
placeholder, // Default: format.toLowerCase()
readOnly, // Default: true for touch devices to avoid triggering the on-screen keyboard
ref,
type, // Default: 'text'
value
`}
      />

      <h3>
        <code>DatePickerCalendar</code> props
      </h3>

      <CodeBlock
        code={`
locale: object.isRequired,
date: instanceOf(Date),
month: instanceOf(Date), // See Calendar props
onDateChange: func,
onMonthChange: func, // See Calendar props
minimumDate: instanceOf(Date), // See Calendar props
maximumDate: instanceOf(Date), // See Calendar props
modifiers: objectOf(func),
modifiersClassNames: objectOf(string)`}
      />

      <h3>
        <code>DateRangePickerCalendar</code> props
      </h3>

      <CodeBlock
        code={`
locale: object.isRequired,
startDate: instanceOf(Date),
endDate: instanceOf(Date),
focus: oneOf([START_DATE, END_DATE]),
month: instanceOf(Date), // See Calendar props
onStartDateChange: func.isRequired,
onEndDateChange: func.isRequired,
onFocusChange: func.isRequired,
onMonthChange: func, // See Calendar props
minimumDate: instanceOf(Date), // See Calendar props
maximumDate: instanceOf(Date), // See Calendar props
modifiers: objectOf(func),
modifiersClassNames: objectOf(string)`}
      />

      <h3>
        <code>Calendar</code> props
      </h3>

      <CodeBlock
        code={`
locale: object.isRequired,
minimumDate: instanceOf(Date), // Days before minimumDate will be disabled
maximumDate: instanceOf(Date), // Days after maximumDate will be disabled
modifiers: objectOf(func),
modifiersClassNames: objectOf(string),
month: instanceOf(Date), // Optional: Turns current month into a controlled prop
onMonthChange: func, // Optional: Turns current month into a controlled prop
onDayHover: func,
onDayClick: func`}
      />

      <h3>
        <code>useDateInput</code>
      </h3>

      <CodeBlock
        code={`
const {
  onBlur
  onChange
  onFocus
  placeholder // Default: format.toLowerCase(),
  type // 'text'
  value
} = useDateInput({
  date, // Current date
  format, // Default: locale.formatLong.date({ width: 'short' })
  locale, // date-fns locale object
  minimumDate, // Dates before minimumDate won’t be valid
  maximumDate, // Dates after maximumDate won’t be valid
  onDateChange, // Function to call when a valid date is typed
  validate // Custom date validation function. Recieves a date and must return a boolean.
})`}
      />

      <footer>
        <span className='text-light'>
          Made by <a href='https://hernansartorio.com/'>Hernán Sartorio</a>
        </span>
      </footer>
    </div>
  )
}

if (module.hot) {
  module.hot.accept()
}

render(<App />, document.getElementById('root'))
