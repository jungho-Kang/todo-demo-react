// npm i react-calendar

// 1. 아래는 기본 기능 출력
import { useEffect } from "react";
import { useState } from "react";
import Calendar from "react-calendar";
// 2. 반드시 아래 구문을 참조해서 css를 별도로 첨부함.
import "react-calendar/dist/Calendar.css";
import "./schedule.css";
function Schedule() {
  // 4. 선택된 날짜 기록
  const [date, setDate] = useState(new Date());

  // 5. 샘플 일정 자료
  // 선택된 스케줄 화면에 상세 내용 보여주기
  const [selectSchedule, setSelectSchedule] = useState(null);
  // 샘플 일정
  const scheduleData = {
    "2024-12-13": [
      {
        id: 1,
        title: "😥오후미팅",
        desc: "프로젝트 진행을 위한 기획 미팅 약속",
        time: "16:00",
      },
      {
        id: 3,
        title: "😐저녁 약속",
        desc: "주말을 위한 친구 미팅",
        time: "18:00",
      },
    ],
  };
  // 스케줄 선택
  const handleClickSchedule = item => {
    setSelectSchedule(item);
  };

  // 3. 날짜 요일 출력
  const formatShortWeekday = (locale, date) => {
    const weekName = ["일", "월", "화", "수", "목", "금", "토"];
    const idx = date.getDay();
    return weekName[idx];
  };

  // 5. 타일에 내용 출력
  const tileContent = e => {
    const { date, view } = e;
    // console.log(date, view);
    // date       : "2024-11-23T15:00:00.000Z",
    // view       : "month",
    if (view === "month") {
      // 우리 데이터  "2024-12-13"
      const formatedDate = date.toLocaleDateString("en-CA");
      // ["2024-11-23", "15:00:00.000Z"]
      // console.log(formatedDate);
      const schedules = scheduleData[formatedDate];
      if (schedules) {
        return (
          <div className="schedule-content">
            {schedules.map(item => (
              <div
                key={item.id}
                className="schedule-item"
                onClick={() => handleClickSchedule(item)}
              >
                {item.title}
              </div>
            ))}
          </div>
        );
      }
    }
  };

  useEffect(() => {
    // 4번에서 적용한 state의 날짜를 파악하는 테스트
    // console.log("선택된 날짜 : ", date);
  }, [date]);
  return (
    <div>
      <h1>Schedule</h1>
      <div>
        <Calendar
          // 2. 날짜 요일 한국어 표현
          calendarType="gregory"
          formatShortWeekday={formatShortWeekday}
          // 4. 선택된 날짜 기록
          value={date}
          // 4. 변경된 날짜 보관
          onChange={e => setDate(e)}
          // 5. 각 날짜의 타일에 일정 출력하기
          tileContent={e => tileContent(e)}
        />
      </div>
      <div>
        <h2>선택된 스케줄</h2>
        {selectSchedule && (
          <div
            className="schedule-detail"
            onClick={() => {
              setSelectSchedule(null);
            }}
          >
            <div className="schedule-box" onClick={e => e.stopPropagation()}>
              <h3>제목 : {selectSchedule.title}</h3>
              <p>시간 : {selectSchedule.time}</p>
              <p>내용 : {selectSchedule.desc}</p>
              <button
                className="bt-close"
                type="button"
                onClick={() => {
                  setSelectSchedule(null);
                }}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Schedule;
