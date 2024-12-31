import { useEffect, useState } from "react";
import Background from "../background";
import SingleFirework from "../SingleFirework/SingleFirework";
import "./CountdownToNewYear.css";
import { Typewriter } from "../Typewriter/Typewriter";

const CountdownToNewYear = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isToday, setIsToday] = useState(false);
  const [dayLabel, setDayLabel] = useState("días");
  const [hoursLabel, setHoursLabel] = useState("horas");
  const [minutesLabel, setMinutesLabel] = useState("minutos");
  const [secondsLabel, setSecondsLabel] = useState("segundos");
  const [showTypewriter, setShowTypewriter] = useState(false);
  const currentYear = new Date().getFullYear();
  const TargetYear = currentYear + 1;

  useEffect(() => {
    let targetDate = new Date(`${TargetYear}-01-01T00:00:00`);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsToday(true);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setDayLabel(days === 1 ? "día" : "días");
        setHoursLabel(hours === 1 ? "hora" : "horas");
        setMinutesLabel(minutes === 1 ? "minuto" : "minutos");
        setSecondsLabel(seconds === 1 ? "segundo" : "segundos");

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isToday) {
      const fireworksTimeout = setTimeout(() => {
        setShowTypewriter(true);
        
      }, 5000);

      return () => clearTimeout(fireworksTimeout);
    }
  }, [isToday]);

  if (!timeLeft) return null;

  return (
    <>
      {isToday && (
        <>
          {showTypewriter && (
            <Typewriter message={`¡Feliz Año Nuevo ${TargetYear}!`} />
          )}

          <SingleFirework />
        </>
      )}

      {!isToday && (
        <div className="count-container">
          <h1 className="title">{currentYear + 1}</h1>
          <p className="countdown">
            Faltan {timeLeft.days} {dayLabel} {timeLeft.hours} {hoursLabel}{" "}
            {timeLeft.minutes} {minutesLabel} y {timeLeft.seconds}{" "}
            {secondsLabel}
          </p>
        </div>
      )}
      <p className="made-by">Hecho por <a href="">Jonatan</a></p>
      <Background activateFireworks={showTypewriter} />
    </>
  );
};

export default CountdownToNewYear;
