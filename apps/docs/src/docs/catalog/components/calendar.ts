import { ui, prop } from "../../model";

export default {
  ...ui(
    "calendar",
    "Calendar 日期选择",
    "基于 React DayPicker 的日期选择，支持单日和范围。",
    "Calendar",
    '<Calendar mode="single" selected={date} onSelect={setDate} />',
    [
      prop("mode", "single | multiple | range", "日期选择模式。"),
      prop(
        "selected / onSelect",
        "Date | DateRange / callback",
        "取决于所选模式。",
      ),
      prop("disabled", "Matcher | Matcher[]", "限制不可选择的日期。"),
    ],
  ),
  order: 11,
};
