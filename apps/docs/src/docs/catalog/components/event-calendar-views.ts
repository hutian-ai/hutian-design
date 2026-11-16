import { ui, prop } from "../../model";

export default {
  ...ui(
    "event-calendar-views",
    "Event Calendar 事件日历",
    "复用 FullCalendar Forma 展示事件，业务周期仍由服务端产生。",
    "EventCalendarViews",
    '<EventCalendarViews\n  plugins={[dayGridPlugin]}\n  initialView="dayGridMonth"\n  initialDate="2026-11-16"\n  popoverCloseContent="关闭"\n  events={[{ title: "设计评审", start: "2026-11-16" }]}\n/>',
    [
      prop("initialView", "string", "初始日历视图。"),
      prop("events", "EventInput[]", "调用方提供的可见事件。"),
      prop(
        "popoverCloseContent",
        'CalendarOptions["popoverCloseContent"]',
        "必填：更多事件浮层的关闭内容。",
      ),
    ],
    ["日历只负责呈现，不在浏览器重建业务周期或触发任务。"],
  ),
  order: 39,
};
