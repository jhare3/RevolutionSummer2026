import React from 'react';
import { Container, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="home-hero text-center py-5">
      <Container>
        <h1 className="display-3 page-header">Revolution Basketball</h1>
        <div className="my-4">
          <img 
            src="/revolution_hero.gif" 
            alt="League Action" 
            className="img-fluid rounded shadow-lg border border-primary"
            style={{ maxHeight: '500px' }}
          />
        </div>
        <p className="lead mb-4">Spring 2026 Season in Full Swing</p>
        <div className="d-flex justify-content-center gap-3">
          <Button variant="primary" size="lg" href="/schedule">View Schedule</Button>
          <Button variant="outline-primary" size="lg" href="/rosters">Check Rosters</Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;