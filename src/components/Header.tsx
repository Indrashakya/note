import * as React from "react";
import { Container, Navbar } from "react-bootstrap";

interface HeaderProps {
  totalNotes: number;
  pinnedNotes: number;
}

const Header: React.FunctionComponent<HeaderProps> = ({ totalNotes, pinnedNotes }) => {
  return (
    <Navbar fixed="top" className="top-nav" variant="dark">
      <Container>
        <Navbar.Brand className="fw-bold">My Smart Notes</Navbar.Brand>
        <span className="header-stat">
          {totalNotes} notes • {pinnedNotes} pinned
        </span>
      </Container>
    </Navbar>
  );
};

export default Header;
