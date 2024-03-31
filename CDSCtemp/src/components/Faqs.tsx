import Accordion from "react-bootstrap/Accordion";
import React from "react";

function Faqs() {
  return (
    <div className="faqs-information" style={{ width: "80%" }}>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            What are the requirements to compete?{" "}
          </Accordion.Header>
          <Accordion.Body>
            |-Get Good in programming and Know the Reaper
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>When is the deadline? </Accordion.Header>
          <Accordion.Body>|- May 31st 2024</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Faqs;
