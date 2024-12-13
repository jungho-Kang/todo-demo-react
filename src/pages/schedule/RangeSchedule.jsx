import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./range.css";

function RangeSchedule() {
  const [date, setDate] = useState(new Date());
  // 샘플 일정
  const scheduleData = {
    "sc-1": {
      startDate: "2024-12-05",
      endDate: "2024-12-14",
      event: {
        id: 1,
        title: "😢 프로젝트 기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "red",
        eventColor: "white",
        startDate: "2024-12-05",
        endDate: "2024-12-14",
      },
    },
    "sc-2": {
      startDate: "2024-12-01",
      endDate: "2024-12-17",
      event: {
        id: 100,
        title: "😴 공부기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "#83db60",
        eventColor: "#36569b",
        startDate: "2024-12-01",
        endDate: "2024-12-17",
      },
    },
    "sc-3": {
      startDate: "2024-11-28",
      endDate: "2024-12-12",
      event: {
        id: 80,
        title: "🎀 테스트기간",
        desc: "1차 프로젝트 협업 과제 기획 기간",
        eventBgColor: "green",
        eventColor: "white",
        startDate: "2024-11-28",
        endDate: "2024-12-12",
      },
    },
  };
  const formatShortWeekday = (locale, date) => {
    const weekName = ["일", "월", "화", "수", "목", "금", "토"];
    const idx = date.getDay();
    return weekName[idx];
  };

  // 특정 날짜의 모든 일정을 뽑아서 관리해줄 함수
  const getEventsDate = date => {
    // 날짜를 이용해서 출력시킬 데이터를 선택하도록 한다.
    // 일정 중에 몇개나 겹칠지 모른다.
    let allEvents = [];

    // 반복문을 사용한다.
    // 모든 scheduleData에 저장해둔 내용에서 반복문을 돌린다.
    // "sc-1", "sc-2", "sc-3"
    Object.keys(scheduleData).forEach(item => {
      // 하나 하나의 객체에 있는 내용을 알아낸다.
      const rangeSchedule = scheduleData[item];

      // Date 객체로 만들어서 날짜를 비교하는 용도로 활용한다.
      if (isDateInRange(date, rangeSchedule.startDate, rangeSchedule.endDate)) {
        // 내용
        const content = rangeSchedule.event;
        allEvents.push(content);
      } else {
        return <div style={{ height: "25px", backgroundColor: "white" }}></div>;
      }
    });

    return allEvents;
  };

  // 특정한 시작과 종료 날짜의 범위에 있는지 없는지를 검사하는 함수
  const isDateInRange = (날짜, 시작일, 종료일) => {
    // 날짜가 시작일 보다 작은지
    // 날짜가 종료일 보다 큰지
    const checkDay = new Date(날짜); // "2024-12-06..."
    const startDay = new Date(시작일); // "2024-12-05"
    const endDay = new Date(종료일); // "2024-12-14"
    return checkDay >= startDay && checkDay <= endDay;
  };

  // 날짜 타일에 출력할 내용 자리
  const tileContent = e => {
    const { date, view } = e;

    // 뽑아놓은 데이터를 모아준다.
    let dayEvents = [];

    if (view === "month") {
      const formatedDate = date.toLocaleDateString("en-CA");
      dayEvents = getEventsDate(formatedDate);
      // 특정 날짜를 전달한다.
      // 날짜를 이용해서 > 비교해서 > 일정이 있는지? > 있다면 몇개인지..

      // html 만들어서 출력하기
      if (dayEvents.length > 0) {
        // 데이터가 있다면, 비교 날짜와 시작 날짜가 같은 경우에 대해서만 글자 출력
        // 시작일을 제외한 남은 기간은 배경색만 출력한다.
        return (
          <div>
            {dayEvents.map(item => (
              <div
                key={item.id}
                style={{
                  height: 25,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: `${item.eventBgColor}`,
                  color: `${item.eventColor}`,
                  borderRadius:
                    formatedDate === item.startDate
                      ? "10px 0px 0px 10px"
                      : formatedDate === item.endDate
                        ? "0px 10px 10px 0px"
                        : "0",
                }}
              >
                {formatedDate === item.startDate && item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  return (
    <div>
      <h1>RangeSchedule</h1>
      <div>
        <Calendar
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          value={date}
          onChange={e => setDate(e)}
          tileContent={e => tileContent(e)}
        />
      </div>
    </div>
  );
}
export default RangeSchedule;
