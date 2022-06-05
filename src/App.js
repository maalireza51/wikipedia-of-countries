import { useState, useEffect } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Map from './components/Map/Map'
import Summary from './components/Summary/Summary';

function App() {
  const [selectcountry, setSelectcountry] = useState('WORLD MAP');
  const [summary, setSummary] = useState('')

  useEffect(() => {
    async function fetchData() {
      const resp = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${selectcountry}`
      )
        .then((response) => response.json())
        .then((article) => setSummary(article.query.pages[Object.keys(article.query.pages)[0]].extract));
    }
    fetchData();
  }, [selectcountry]);

  function handleSelected(name) {
    setSelectcountry(name);
  }

  return (
    <div className="App">
      <Container className='pt-3'>
        <Row>
          <Col className='text-center'>
            <h1>{selectcountry}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={9}>
            <Map handleSelected={handleSelected} />
          </Col>
          <Col xs={12} md={3}>
            <Card className="text-center">
              <Card.Header>WORLDMAP</Card.Header>
              <Card.Body>
                <Card.Title>{selectcountry}</Card.Title>
                <Card.Text className='text-center'>
                  World countries information
                </Card.Text>
                <Button variant="primary" href="#content">Go to contents</Button>
              </Card.Body>
              <Card.Footer className="text-muted">Select a country</Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row id="content">
          <Col xs>
            <Summary summary={summary} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;