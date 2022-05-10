/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Row, Col } from "react-bootstrap";

import Spinner from "../components/Spinner";
import { useSessionStorage } from "../utils/useSessionStorage";

export default function Auth0ProviderWithHistory({ children }) {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useSessionStorage("accessToken", null);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
        navigate("/Home");
    })();
  });

  return (
    <Container>
      <br /> <br /> <br /> <br /> <br />
      <Spinner />
      <br /> <br />
      <Row className="justify-content-md-center row">
        <Col>
          <p className="text-center">
            Center aligned text on all viewport sizes.
          </p>
        </Col>
      </Row>
    </Container>
  );
}