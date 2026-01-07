import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Target, BarChart2 } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Master Your Studies with <span className="text-gradient">Intelligence</span>
                    </h1>
                    <p className="hero-subtitle">
                        The all-in-one planner designed for students who want to stay organized,
                        track progress, and crush their academic goals.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn btn-primary btn-lg">
                            Get Started Free <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="btn btn-secondary btn-lg">
                            View Demo
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card glass">
                        <div className="card-header">
                            <Target className="icon-primary" />
                            <span>Daily Goal</span>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: '75%' }}></div>
                        </div>
                        <p>75% Completed</p>
                    </div>
                    <div className="floating-card glass second">
                        <BarChart2 className="icon-success" />
                        <span>Weekly Progress</span>
                        <div className="stat">+12% increase</div>
                    </div>
                </div>
            </header>

            <section className="features-grid">
                <div className="feature-card card">
                    <div className="feature-icon"><BookOpen /></div>
                    <h3>Subject Planning</h3>
                    <p>Organize your tasks by subject and stay on top of your curriculum.</p>
                </div>
                <div className="feature-card card">
                    <div className="feature-icon"><Clock /></div>
                    <h3>Deadline Alerts</h3>
                    <p>Never miss a due date with our proactive reminder system.</p>
                </div>
                <div className="feature-card card">
                    <div className="feature-icon"><Target /></div>
                    <h3>Priority Matrix</h3>
                    <p>Focus on what matters most with intelligent task prioritization.</p>
                </div>
            </section>

            <style jsx>{`
                .landing-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 2rem;
                }
                .hero-section {
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    margin-bottom: 8rem;
                }
                .hero-title {
                    font-size: 4rem;
                    line-height: 1.1;
                    margin-bottom: 1.5rem;
                    color: var(--text-primary);
                }
                .text-gradient {
                    background: linear-gradient(135deg, var(--accent-primary), #ec4899);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--text-secondary);
                    margin-bottom: 2.5rem;
                    line-height: 1.6;
                }
                .hero-actions {
                    display: flex;
                    gap: 1.5rem;
                }
                .btn-lg {
                    padding: 1rem 2rem;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .btn-secondary {
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                }
                .hero-visual {
                    position: relative;
                    height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .floating-card {
                    padding: 1.5rem;
                    border-radius: 1.5rem;
                    position: absolute;
                    width: 240px;
                    animation: float 6s ease-in-out infinite;
                }
                .floating-card.second {
                    bottom: 0px;
                    right: 40px;
                    animation-delay: -3s;
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .progress-bar-container {
                    height: 8px;
                    background: var(--border-color);
                    border-radius: 4px;
                    margin: 1rem 0 0.5rem;
                }
                .progress-bar {
                    height: 100%;
                    background: var(--accent-primary);
                    border-radius: 4px;
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                .feature-card {
                    text-align: center;
                    transition: transform 0.3s ease;
                }
                .feature-card:hover {
                    transform: translateY(-10px);
                }
                .feature-icon {
                    width: 60px;
                    height: 60px;
                    background: var(--bg-primary);
                    border-radius: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    color: var(--accent-primary);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                }
                @media (max-width: 968px) {
                    .hero-section {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }
                    .hero-actions {
                        justify-content: center;
                    }
                    .hero-visual {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
