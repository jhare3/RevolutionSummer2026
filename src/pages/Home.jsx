import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .hero-section {
          background-image: url("/revolution_hero.gif");
          background-size: cover;
          background-position: center;
          padding: clamp(2.5rem, 8vw, 5rem) 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glass-hero-capsule {
          background: #1a1a1a;
          border: 2px solid #ff4d4d;
          padding: clamp(1.25rem, 5vw, 2.25rem);
          border-radius: 12px;
          display: inline-block;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
          width: 92%;
          max-width: 650px;
        }

        .hero-title-pop {
          font-size: clamp(1.5rem, 8vw, 3rem);
          font-weight: 900;
          letter-spacing: -1px;
          color: #ffffff;
          text-shadow: 3px 3px 0px #ff4d4d;
          margin: 0;
          line-height: 1.1;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
        }

        .hero-subtitle {
          font-size: clamp(0.75rem, 2.8vw, 0.95rem);
          letter-spacing: 2px;
          color: #ff4d4d;
          font-weight: 800;
          margin-top: 12px;
          font-family: 'Montserrat', sans-serif;
        }

        .section-heading {
          font-size: clamp(1.25rem, 5vw, 1.75rem);
          font-weight: 800;
          font-style: italic;
          color: #1a1a1a;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
        }

        .section-heading::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 4px;
          background: #ff4d4d;
          border-radius: 2px;
        }

        .liquid-glass-card {
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 1.75rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        @media (hover: hover) {
          .liquid-glass-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(220, 53, 69, 0.12);
            border: 1px solid rgba(220, 53, 69, 0.15);
          }
        }

        .card-btn {
          background: #1a1a1a;
          color: white;
          border: none;
          padding: 0.85rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 100px;
          transition: all 0.2s ease;
          width: 100%;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Montserrat', sans-serif;
          letter-spacing: 0.5px;
        }

        .card-btn:hover {
          background: #ff4d4d;
          color: white;
          transform: translateY(-2px);
        }

        .x-small {
          font-size: 0.75rem;
          line-height: 1.4;
        }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section text-center">
        <div className="px-3 d-flex justify-content-center" style={{ width: '100%' }}>
          <div className="glass-hero-capsule">
            <h1 className="hero-title-pop fst-italic">
              REVOLUTION BASKETBALL
            </h1>
            <p className="hero-subtitle text-uppercase mb-0">
              Spring 2026 Season in Full Swing
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="px-3 px-md-5 my-4 my-md-5 py-4 py-md-5">
        <div className="text-center mb-4 mb-md-5">
          <h2 className="section-heading">Explore the League</h2>
        </div>

        <div className="row g-3 g-md-4 row-cols-1 row-cols-sm-2 row-cols-lg-3 justify-content-center">
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">SCHEDULE</h6>
                  <p className="card-text text-muted x-small">Full Spring 2026 game schedule and locations.</p>
                </div>
                <Link to="/schedule" className="card-btn mt-3">VIEW SCHEDULE</Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">ROSTERS</h6>
                  <p className="card-text text-muted x-small">Browse every team's players and captains.</p>
                </div>
                <Link to="/rosters" className="card-btn mt-3">CHECK ROSTERS</Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">STANDINGS</h6>
                  <p className="card-text text-muted x-small">Real-time team rankings and seasonal records.</p>
                </div>
                <Link to="/standings" className="card-btn mt-3">VIEW STANDINGS</Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">STATS</h6>
                  <p className="card-text text-muted x-small">Player performance metrics and league leaders.</p>
                </div>
                <Link to="/stats" className="card-btn mt-3">VIEW STATS</Link>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">DIRECTORY</h6>
                  <p className="card-text text-muted x-small">Find and explore individual player profiles.</p>
                </div>
                <Link to="/directory" className="card-btn mt-3">BROWSE DIRECTORY</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;