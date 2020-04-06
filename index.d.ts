declare module "react-nice-dates" {
  import * as React from "react";
  import * as Locale from "date-fns";

  interface CommonProps {
    locale: Locale;
    minimumDate?: Date | undefined;
    maximumDate?: Date | undefined;
    modifiers?: { [modifier: string]: () => void };
    modifiersClassNames?: { [modifier: string]: string };
    weekdayFormat?: string;
  }

  interface CalendarProps extends CommonProps {
    month?: Date | undefined;
    onMonthChange?: (month: Date | undefined) => void;
    onDayHover?: (day: Date | undefined) => void;
    onDayClick?: (day: Date | undefined) => void;
  }

  interface DatePickerProps extends CommonProps {
    children: JSX.Element;
    date?: Date | undefined;
    onDateChange?: (date: Date | undefined) => void;
    format?: string;
  }

  interface DateRangePickerProps extends CommonProps {
    children: JSX.Element;
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    onStartDateChange?: (date: Date | undefined) => void;
    onEndDateChange?: (date: Date | undefined) => void;
    format?: string;
  }

  interface DatePickerCalendarProps extends CommonProps {
    date?: Date | undefined;
    month?: Date | undefined;
    onDateChange?: (date: Date | undefined) => void;
    onMonthChange?: (month: Date | undefined) => void;
  }

  interface DateRangePickerCalendarProps extends CommonProps {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    focus?: "startDate, endDate";
    month?: Date | undefined;
    onFocusChange: (focus: "startDate" | "endDate") => void;
    onStartDateChange: (date: Date | undefined) => void;
    onEndDateChange: (date: Date | undefined) => void;
    onMonthChange?: (date: Date | undefined) => void;
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
}
