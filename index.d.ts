declare module "react-nice-dates" {
  import * as React from "react";
  import * as Locale from "date-fns";

  type DateChangeCallBack = (date: Date | null) => void;

  interface InputProps {
    ref: React.MutableRefObject<any>;
    placeholder: string;
    type: string;
    value: string;
    onBlur: () => void;
    onChange: () => void;
    onFocus: () => void;
  }

  type DefaultModifiers = 'disabled' | 'selected' | 'today';
  type ModifierMatcher = (date: Date) => boolean;

  type Modifiers = { [key in DefaultModifiers | string]: ModifierMatcher };
  type ModifiersClassNames = { [key in DefaultModifiers | string]: string };

  interface CommonProps {
    locale: Locale;
    minimumDate?: Date;
    maximumDate?: Date;
    modifiers?: Modifiers;
    modifiersClassNames?: ModifiersClassNames;
    weekdayFormat?: string;
  }

  interface CalendarProps extends CommonProps {
    month?: Date;
    onMonthChange?: DateChangeCallBack;
    onDayHover?: DateChangeCallBack;
    onDayClick?: DateChangeCallBack;
  }

  interface DatePickerChildrenProps {
    inputProps: InputProps;
    focused: boolean;
  }

  interface DatePickerProps extends CommonProps {
    children: (props: DatePickerChildrenProps) => React.ReactNode;
    date?: Date;
    onDateChange?: DateChangeCallBack;
    format?: string;
  }

  type DateRangeFocus = 'startDate' | 'endDate';

  interface DateRangePickerChildrenProps {
    startDateInputProps: InputProps;
    endDateInputProps: InputProps;
    focus: DateRangeFocus;
  }

  interface DateRangePickerProps extends CommonProps {
    children: (props: DateRangePickerChildrenProps) => React.ReactNode;
    startDate?: Date;
    endDate?: Date;
    minimumLength?: number;
    maximumLength?: number;
    onStartDateChange?: DateChangeCallBack;
    onEndDateChange?: DateChangeCallBack;
    format?: string;
  }

  interface DatePickerCalendarProps extends CommonProps {
    date?: Date;
    month?: Date;
    onDateChange?: DateChangeCallBack;
    onMonthChange?: DateChangeCallBack;
  }

  interface DateRangePickerCalendarProps extends CommonProps {
    startDate?: Date;
    endDate?: Date;
    focus?: DateRangeFocus;
    month?: Date;
    minimumLength?: number;
    maximumLength?: number;
    onFocusChange?: (focus: DateRangeFocus) => void;
    onStartDateChange?: DateChangeCallBack;
    onEndDateChange?: DateChangeCallBack;
    onMonthChange?: DateChangeCallBack;
  }

  export function Calendar(props: CalendarProps): JSX.Element;
  export function DatePicker(props: DatePickerProps): JSX.Element;
  export function DateRangePicker(props: DateRangePickerProps): JSX.Element;
  export function DatePickerCalendar(
    props: DatePickerCalendarProps
  ): JSX.Element;
  export function DateRangePickerCalendar(
    props: DateRangePickerCalendarProps
  ): JSX.Element;
  
  export function useDateInput({
    date,
    format,
    locale,
    minimumDate,
    maximumDate,
    onDateChange,
    validate
  }: {
    date?: Date,
    format?: string,
    locale: Locale,
    minimumDate?: Date,
    maximumDate?: Date,
    onDateChange: (date: Date) => void,
    validate?: (date: Date) => boolean,
  }): any
}
