import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .hero-section {
          /* Updated to use revolutionHero.png */
          background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/revolutionHero.png");
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
        }

        .liquid-glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .liquid-glass-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }

        .card-btn {
          background: #1a1a1a;
          color: #fff;
          border: none;
          padding: 10px 0;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.75rem;
          letter-spacing: 1px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .card-btn:hover {
          background: #ff4d4d;
          color: #fff;
        }

        .x-small { font-size: 0.7rem; line-height: 1.4; }
      `}</style>

      {/* Hero Section */}
      <div className="hero-section text-center">
        <div className="glass-hero-capsule">
        
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link to="/stats" className="btn btn-danger fw-black px-4 py-2" style={{ borderRadius: '4px', fontSize: '0.85rem' }}>LEAGUE STATS</Link>
            <Link to="/schedule" className="btn btn-outline-light fw-black px-4 py-2" style={{ borderRadius: '4px', fontSize: '0.85rem' }}>SCHEDULE</Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="container py-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">ROSTERS</h6>
                  <p className="card-text text-muted x-small">View official team rosters and player details.</p>
                </div>
                <Link to="/rosters" className="card-btn mt-3">VIEW ROSTERS</Link>
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

         
        </div>
      </div>
    </div>
  );
};

export default Home;