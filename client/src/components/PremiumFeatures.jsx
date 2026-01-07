import React, { useState, useEffect } from 'react';
import {
    Activity, Play, Pause, RotateCcw, Award, Star,
    Flame, Calendar as CalendarIcon, ChevronLeft, ChevronRight
} from 'lucide-react';

// --- TREND CHART (Analytics) ---
export const TrendChart = ({ data }) => {
    const maxCount = Math.max(...data.map(d => d.count), 1);
    return (
        <div className="chart-container">
            <div className="chart-bars">
                {data.map((d, i) => (
                    <div key={i} className="bar-wrapper">
                        <div
                            className="chart-bar"
                            style={{ height: `${(d.count / maxCount) * 100}%` }}
                            title={`${d.count} tasks`}
                        >
                            <span className="bar-tooltip">{d.count}</span>
                        </div>
                        <span className="bar-label">{d.day}</span>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .chart-container { height: 200px; padding: 1.5rem 0.5rem 0.5rem; }
                .chart-bars { display: flex; align-items: flex-end; justify-content: space-between; height: 100%; gap: 0.75rem; }
                .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; height: 100%; }
                .chart-bar { width: 100%; background: linear-gradient(180deg, var(--accent-primary), rgba(99, 102, 241, 0.3)); border-radius: 6px 6px 0 0; position: relative; transition: height 0.6s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
                .chart-bar:hover { filter: brightness(1.2); }
                .bar-tooltip { position: absolute; top: -25px; left: 50%; transform: translateX(-50%); background: var(--text-primary); color: var(--bg-primary); padding: 2px 6px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
                .chart-bar:hover .bar-tooltip { opacity: 1; }
                .bar-label { font-size: 0.75rem; color: var(--text-secondary); font-weight: 600; }
            `}</style>
        </div>
    );
};

// --- POMODORO TIMER ---
export const PomodoroWidget = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('focus'); // focus, break

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            const nextMode = mode === 'focus' ? 'break' : 'focus';
            setMode(nextMode);
            setTimeLeft(nextMode === 'focus' ? 25 * 60 : 5 * 60);
            alert(mode === 'focus' ? "Break time! Take a rest." : "Focus time! Let's work.");
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="pomo-widget">
            <div className={`pomo-header ${mode}`}>
                <Activity size={16} />
                <span>{mode === 'focus' ? 'FOCUS SESSION' : 'SHORT BREAK'}</span>
            </div>
            <div className="pomo-display">{formatTime(timeLeft)}</div>
            <div className="pomo-controls">
                <button className="btn-icon pomo-btn" onClick={() => setIsActive(!isActive)}>
                    {isActive ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button className="btn-icon pomo-btn" onClick={() => { setIsActive(false); setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60); }}>
                    <RotateCcw size={18} />
                </button>
            </div>
            <style jsx>{`
                .pomo-widget { padding: 1rem 0; text-align: center; }
                .pomo-header { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; margin-bottom: 1.5rem; padding: 0.4rem 1rem; border-radius: 20px; }
                .pomo-header.focus { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
                .pomo-header.break { background: rgba(16, 185, 129, 0.1); color: #10b981; }
                .pomo-display { font-size: 3rem; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--text-primary); margin: 1rem 0; font-family: 'JetBrains Mono', monospace; }
                .pomo-controls { display: flex; justify-content: center; gap: 1.5rem; }
                .pomo-btn { width: 45px; height: 45px; border: 1px solid var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--bg-primary); color: var(--text-primary); transition: all 0.2s; }
                .pomo-btn:hover { border-color: var(--accent-primary); color: var(--accent-primary); transform: translateY(-2px); }
            `}</style>
        </div>
    );
};

// --- ACHIEVEMENTS ---
export const AchievementsList = ({ points, streak }) => {
    return (
        <div className="achievements-container">
            <div className="stats-row">
                <div className="mini-stat">
                    <Star className="icon-yellow" size={18} />
                    <div className="stat-v">
                        <span className="val">{points}</span>
                        <span className="lbl">Exp Points</span>
                    </div>
                </div>
                <div className="mini-stat">
                    <Flame className="icon-orange" size={18} />
                    <div className="stat-v">
                        <span className="val">{streak} Day</span>
                        <span className="lbl">Streak</span>
                    </div>
                </div>
            </div>
            <div className="badges-grid">
                <div className={`badge ${points >= 100 ? 'unlocked' : ''}`}>
                    <Award size={24} />
                    <span>Rookie</span>
                </div>
                <div className={`badge ${points >= 500 ? 'unlocked' : ''}`}>
                    <Award size={24} />
                    <span>Scholar</span>
                </div>
                <div className={`badge ${streak >= 7 ? 'unlocked' : ''}`}>
                    <Award size={24} />
                    <span>Consistent</span>
                </div>
            </div>
            <style jsx>{`
                .achievements-container { padding: 0.5rem 0; }
                .stats-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2.5rem; }
                .mini-stat { display: flex; align-items: center; gap: 1rem; background: var(--bg-primary); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color); }
                .stat-v { display: flex; flex-direction: column; }
                .val { font-weight: 800; font-size: 1.1rem; }
                .lbl { font-size: 0.65rem; color: var(--text-secondary); text-transform: uppercase; }
                .badges-grid { display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none; }
                .badge { flex-shrink: 0; width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.4rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 16px; opacity: 0.4; filter: grayscale(1); transition: all 0.4s; }
                .badge.unlocked { opacity: 1; filter: none; border-color: var(--accent-primary); color: var(--accent-primary); background: rgba(99, 102, 241, 0.05); }
                .badge span { font-size: 0.65rem; font-weight: 700; }
                .icon-yellow { color: #f59e0b; }
                .icon-orange { color: #f97316; }
            `}</style>
        </div>
    );
};

// --- STUDY CALENDAR ---
export const StudyCalendar = ({ tasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear()); i++) days.push(i);

    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <div className="study-calendar">
            <div className="cal-header">
                <h3>{monthName} {currentDate.getFullYear()}</h3>
                <div className="cal-nav">
                    <button onClick={prevMonth} className="btn-icon"><ChevronLeft size={18} /></button>
                    <button onClick={nextMonth} className="btn-icon"><ChevronRight size={18} /></button>
                </div>
            </div>
            <div className="cal-grid">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="cal-weekday">{d}</div>)}
                {days.map((day, idx) => {
                    const hasTask = day && tasks.some(t => t.due_date && new Date(t.due_date).getDate() === day && new Date(t.due_date).getMonth() === currentDate.getMonth());
                    const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
                    return (
                        <div key={idx} className={`cal-day ${day ? 'val' : ''} ${hasTask ? 'has-task' : ''} ${isToday ? 'today' : ''}`}>
                            {day}
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
                .study-calendar { padding: 0.5rem 0; }
                .cal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
                .cal-header h3 { font-size: 1.1rem; }
                .cal-nav { display: flex; gap: 0.5rem; }
                .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; }
                .cal-weekday { text-align: center; font-size: 0.7rem; font-weight: 800; color: var(--text-secondary); padding: 0.5rem 0; }
                .cal-day { height: 35px; display: flex; align-items: center; justify-content: center; border-radius: 8px; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
                .cal-day.val { background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; }
                .cal-day.val:hover { border-color: var(--accent-primary); }
                .cal-day.has-task { position: relative; border-color: var(--accent-primary); }
                .cal-day.has-task::after { content: ''; position: absolute; bottom: 4px; width: 4px; height: 4px; background: var(--accent-primary); border-radius: 50%; }
                .cal-day.today { background: var(--accent-primary); color: white; border-color: var(--accent-primary); }
            `}</style>
        </div>
    );
};
