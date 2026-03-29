import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import playersData from '../data/players.json';

const Rosters = () => {
  const players = playersData.players || [];
  const teams = players.reduce((acc, player) => {
    const teamName = player.team || 'Unassigned';
    if (!acc[teamName]) acc[teamName] = [];
    acc[teamName].push(player);
    return acc;
  }, {});

  const teamNames = Object.keys(teams).sort();

  return (
    <Container className="py-5">
      <h1 className="text-center page-header">League Rosters</h1>
      <Row className="g-4">
        {teamNames.map((teamName) => (
          <Col key={teamName} xs={12} md={6} lg={4}>
            <Card className={`rev-card team-header-${teamName.toLowerCase()}`}>
              <Card.Body>
                <Card.Title className="fw-bold border-bottom pb-2 mb-3">
                  {teamName}
                </Card.Title>
                {teams[teamName].map((player) => (
                  <div key={player.id} className="py-1 border-bottom border-secondary small">
                    {player.first_name} {player.last_name}
                    {player.captain && <span className="ms-2 text-warning">★</span>}
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Rosters;