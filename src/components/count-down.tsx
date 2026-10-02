import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  /** Ngày giờ đích theo giờ Việt Nam (VD: "2026-12-31T23:59:59") */
  targetDate: string | Date;
  onComplete?: () => void;
  className?: string;
}

/**
 * Lấy timestamp hiện tại theo giờ Việt Nam (UTC+7)
 */
const getVietnamTimestamp = (): number => {
  const now = new Date();
  // getTimezoneOffset() trả về số phút chênh lệch so với UTC (VD: VN = -420)
  const localOffset = now.getTimezoneOffset(); // phút
  const vietnamOffset = -7 * 60; // UTC+7 → -420 phút

  // Chuyển về timestamp theo giờ Việt Nam
  return now.getTime() + (localOffset - vietnamOffset) * 60 * 1000;
};

/**
 * Parse targetDate thành timestamp theo giờ Việt Nam
 * (Giả định chuỗi truyền vào là giờ Việt Nam)
 */
const parseVietnamTarget = (target: string | Date): number => {
  if (target instanceof Date) {
    return target.getTime();
  }

  // Nếu chuỗi không có timezone, ta coi nó là giờ Việt Nam
  // Ví dụ: "2026-12-31T23:59:59" → coi là 23:59:59 giờ VN
  const date = new Date(target);

  // Tính lại để đảm bảo đúng giờ VN
  const localOffset = date.getTimezoneOffset();
  const vietnamOffset = -7 * 60;

  return date.getTime() + (localOffset - vietnamOffset) * 60 * 1000;
};

const Countdown: React.FC<CountdownProps> = ({
  targetDate,
  onComplete,
  className = "",
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const nowVN = getVietnamTimestamp();
    const targetVN = parseVietnamTarget(targetDate);
    const difference = targetVN - nowVN;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const initial = calculateTimeLeft();
    if (
      initial.days === 0 &&
      initial.hours === 0 &&
      initial.minutes === 0 &&
      initial.seconds === 0
    ) {
      setIsCompleted(true);
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsCompleted(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const pad = (num: number): string => String(num).padStart(2, "0");

  if (isCompleted) {
    return (
      <div className={`countdown completed ${className}`}>
        <span className="message">Đã đến giờ!</span>
      </div>
    );
  }

  return (
    <div className={`flex gap-2 items-center justify-center ${className}`}>
      <motion.div
        className="flex flex-col items-center w-25 h-19 rounded-[12px] border border-[rgba(42,159,214,.16)]"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.25 }}
      >
        <span className="text-[#39a9e8] text-[26px] font-bold">
          {pad(timeLeft.days)}
        </span>
        <span className="text-[#8c6b65] text-xs font-bold">Ngày</span>
      </motion.div>
      <motion.div
        className="flex flex-col items-center w-25 h-19 rounded-[12px] border border-[rgba(42,159,214,.16)]"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="text-[#39a9e8] text-[26px] font-bold">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-[#8c6b65] text-xs font-bold">Giờ</span>
      </motion.div>
      <motion.div
        className="flex flex-col items-center w-25 h-19 rounded-[12px] border border-[rgba(42,159,214,.16)]"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.75 }}
      >
        <span className="text-[#39a9e8] text-[26px] font-bold">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-[#8c6b65] text-xs font-bold">Phút</span>
      </motion.div>
      <motion.div
        className="flex flex-col items-center w-25 h-19 rounded-[12px] border border-[rgba(42,159,214,.16)]"
        initial={{ y: -60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="text-[#39a9e8] text-[26px] font-bold">
          {pad(timeLeft.seconds)}
        </span>
        <span className="text-[#8c6b65] text-xs font-bold">Giây</span>
      </motion.div>
    </div>
  );
};

export default Countdown;
