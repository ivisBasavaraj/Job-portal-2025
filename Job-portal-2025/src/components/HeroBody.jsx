import React from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { FaBriefcase, FaCalculator, FaCode, FaUsers } from "react-icons/fa";

const HeroBody = ({ className = "", style }) => {
  return (
    <Container className={`py-5 ${className}`} style={style}>
      <Row className="justify-content-center text-center">
        <Col lg={10} xl={8}>
          <h1 className="fw-bold display-5" style={{ color: "#333333", lineHeight: 1.2 }}>
            Find the <span style={{ color: "#ff5a1f" }}>job</span> that fits your life
          </h1>
          <p className="mt-3 mb-4" style={{ color: "#6c757d", fontSize: "1.05rem" }}>
            Type your keyword, then click search to find your perfect job.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10} xl={8} className="mx-auto">
          <Card className="shadow-sm rounded-4 border-0 mx-auto">
            <Card.Body className="p-3 p-md-4">
              <Form onSubmit={(e) => e.preventDefault()}>
                <Row className="g-3 align-items-center justify-content-center">
                  <Col xs={12} md={3}>
                    <Form.Label className="mb-1 fw-semibold" style={{ color: "#333333" }}>
                      WHAT
                    </Form.Label>
                    <Form.Select className="rounded-3" defaultValue="Job Title">
                      <option>Job Title</option>
                      <option>Company</option>
                      <option>Keyword</option>
                    </Form.Select>
                  </Col>

                  <Col xs={12} md={3}>
                    <Form.Label className="mb-1 fw-semibold" style={{ color: "#333333" }}>
                      TYPE
                    </Form.Label>
                    <Form.Select className="rounded-3" defaultValue="All Category">
                      <option>All Category</option>
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </Form.Select>
                  </Col>

                  <Col xs={12} md={4}>
                    <Form.Label className="mb-1 fw-semibold" style={{ color: "#333333" }}>
                      LOCATION
                    </Form.Label>
                    <InputGroup>
                      <InputGroup.Text className="bg-white border-end-0 rounded-start-3">
                        🔍
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Search..."
                        className="rounded-end-3"
                        style={{ borderLeft: "0" }}
                      />
                    </InputGroup>
                  </Col>

                  <Col xs={12} md={2} className="d-grid">
                    <Form.Label className="mb-1 opacity-0">Find Job</Form.Label>
                    <Button
                      type="submit"
                      className="rounded-pill py-2"
                      style={{ backgroundColor: "#ff5a1f", border: "none" }}
                    >
                      Find Job
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col lg={10} xl={8}>
          <div className="d-flex gap-3 pb-2" style={{ overflow: "hidden" }}>
            {[
              { name: "Management", jobs: 70, Icon: FaBriefcase },
              { name: "Accountant", jobs: 65, Icon: FaCalculator },
              { name: "Software", jobs: 55, Icon: FaCode },
              { name: "Human Resource", jobs: 45, Icon: FaUsers },
            ].map((cat) => (
              <Card
                key={cat.name}
                className="border-0 shadow-sm rounded-4 flex-shrink-1 flex-grow-1"
                style={{ minWidth: 140, flex: "1 1 140px" }}
              >
                <Card.Body className="text-center">
                  <div
                    className="mx-auto mb-3"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      backgroundColor: "#ff5a1f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                    }}
                    title={cat.name}
                    aria-hidden="true"
                  >
                    {cat.Icon ? <cat.Icon size={18} /> : "•"}
                  </div>

                  <div className="text-muted" style={{ color: "#6c757d" }}>
                    {cat.jobs} Jobs
                  </div>

                  <div className="fw-semibold mt-1" style={{ color: "#333333" }}>
                    {cat.name}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroBody;