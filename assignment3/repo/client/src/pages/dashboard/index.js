/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Alert, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import PortfolioChart from "./PortfolioChart";
import Portfolio from "./Portfolio";
import apiHelper from "../../api/apiHelper";

import { useSessionStorage } from "../../utils/useSessionStorage";

import Menu from "../../components/Menu";

import "./index.css";

export default function Dashboard() {
  const [accessToken, setAccessToken] = useSessionStorage("accessToken", null);
  const [userProfile, setUserProfile] = useSessionStorage("userProfile", null);

  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    (async () => {
      refreshPortfolio();
    })();
  }, []);

  const handlePosting = async (request, callback) => {
    await apiHelper.postTransaction(accessToken, request);
    callback();
  };

  const refreshPortfolio = async () => {
    let portfolio = await apiHelper.getPortfolio(accessToken);
    setPortfolio(portfolio);
  }

  const ExistingUser = () => {
    return (
      <>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="chart">
              {portfolio && <PortfolioChart portfolio={portfolio} />}
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xl lg="12">
            {portfolio && (
              <Portfolio portfolio={portfolio} handlePosting={handlePosting} refreshPortfolio={refreshPortfolio} />
            )}
          </Col>
        </Row>
      </>
    );
  };

  const NewJoiner = () => {
    return (
      <Alert variant="success">
        <Alert.Heading>Hi {userProfile.name}</Alert.Heading>
        <hr />
        <p>
          Welcome onboard ! Start your portfolio by adding transaction now !
        </p>
      </Alert>
    );
  };

  return (
    <>
      <Container>
        <Menu />
        {portfolio && portfolio.transactions.length === 0 ? (
          <NewJoiner />
        ) : (
          <ExistingUser />
        )}
      </Container>
    </>
  );
}
