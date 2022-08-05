const timer = (blockWithTimer, deadLine) => {
    function getTime (deadLine) {
        const time = Date.parse(deadLine) - Date.parse(new Date()); //Date.parse преобразовыват в мм сек, new Date - текущие время
        const seconds = Math.floor((time/1000) % 60); // % 60 деление с остатком на 60, нам нужен остаток от числа
        const minutes = Math.floor((time/1000/60) % 60);
        const hours = Math.floor((time/1000/60/60) % 24);
        const days = Math.floor(time/1000/60/60/24);

        return {
            "total": time,
            "seconds": seconds,
            "minutes": minutes,
            "hours": hours,
            "days": days
        }
    }
    function setClock (blockWithTimer,deadLine) {
        const timer = document.querySelector(blockWithTimer);
        const days = timer.querySelector("#days");
        const hours = timer.querySelector("#hours");
        const minutes = timer.querySelector("#minutes");
        const seconds = timer.querySelector("#seconds");
        const timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            const time = getTime(deadLine);

            days.textContent = addZero(time.days);
            hours.textContent = addZero(time.hours);
            minutes.textContent = addZero(time.minutes);
            seconds.textContent = addZero(time.seconds);

            if (time.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
                clearInterval(timeInterval);
            }
        }
    }
    function addZero(number) {
        if (number < 10) {
            return number = `0${number}`;
        } else {
            return number;
        }
    }

    setClock (blockWithTimer,deadLine);

};

export default timer;
