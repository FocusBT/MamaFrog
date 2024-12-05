import { useState, useEffect } from "react";

interface CountdownProps {
    targetDate: string; // ISO format or parseable string
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeRemaining({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const format = (num: number) => num.toString().padStart(2, "0");

            setTimeRemaining({
                days: format(days),
                hours: format(hours),
                minutes: format(minutes),
                seconds: format(seconds),
            });
        };

        updateCountdown(); // Initial calculation
        const interval = setInterval(updateCountdown, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup
    }, [targetDate]);

    return (
        <div className="flex gap-2 justify-center items-center  rounded-lg">
            {Object.entries(timeRemaining).map(([unit, value]) => (
                <div
                    key={unit}
                    className="flex flex-col items-center justify-center min-w-[78px] h-fit p-[10px] bg-nigga text-white border-2 border-white rounded-lg"
                >
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-[20px] font-weird">{unit}</p>
                </div>
            ))}
        </div>
    );
};

export default Countdown;
