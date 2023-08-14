import { Container, Navbar } from "react-bootstrap";
const Header = () => {
  return (
    <header style={{ marginBottom: "20px" }}>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#">Todo App</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
