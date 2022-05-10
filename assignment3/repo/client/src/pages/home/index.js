/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Table, Container, Row, Col, Card } from "react-bootstrap";
// import Avatar from "react-avatar";
import Avatar from "../../avater/index.js"
import moment from "moment";

import TransactionModal from "../../components/TransactionModal";
import { useSessionStorage } from "../../utils/useSessionStorage";
import apiHelper from "../../api/apiHelper";
import Menu from "../../components/Menu";
import Spinner from "../../components/Spinner";
import SimpleTable from "../../components/SimpleTable";

export default function Home() {
  const [accessToken, setAccessToken] = useSessionStorage("accessToken", null);
  const [isLoading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);
  const [etfInfo, setETFInfo] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = (request) => {
    handlePosting(request);
    handleClose();
  };
  const buy = (symbol) => {
    setTxnData({ symbol, action: "Buy" });
    handleShow();
  };
  const [txnData, setTxnData] = useState({});

  useEffect(() => {
    if (accessToken == null) {
      alert("Invalid access");
    }

    (async () => {
      let portfolio = await apiHelper.getPortfolio(accessToken);
      setPortfolio(portfolio);

      let recommendations = await apiHelper.getRecommendation(accessToken);
      setRecommendations(recommendations);

      let etfInfo = await apiHelper.getETFInfo();
      setETFInfo(etfInfo);

      setLoading(false)
    })();
  }, []);

  const handlePosting = (request) => {
    apiHelper.postTransaction(accessToken, request).then((res) => {
      setPortfolio(res);
    });
  };

  const Recommendation = () => {
    return (
      <Row xs={1} md={1}>
        {recommendations.map((recommendation) => (
          <Col key={recommendation.id}>
            <Card>
              <Card.Body className="bg-light">
                <Card.Title>
                  <Avatar 
                  color={Avatar.getRandomColor(recommendation.name, ['#A62A21', '#7e3794', '#0B51C1', '#3A6024', '#A81563', '#B3003C'])} 
                  name={recommendation.name} size="30px" round="20px" />{" "}
                  #{recommendation.symbol}
                </Card.Title>
                <Card.Text>
                  {recommendation.text}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  const Summary = () => {
    var stockSet = new Set();
    portfolio.transactions.forEach((t) => stockSet.add(t.symbol));
    let marketValue =
      portfolio.historical.length === 0
        ? "0"
        : portfolio.historical[portfolio.historical.length - 1].price;

    let list = [];
    list.push({
      key: "Member Since",
      value: moment(portfolio.createTime).format("YYYY-MM-DD"),
    });
    list.push({ key: "Market Value", value: `USD ${marketValue}` });
    list.push({ key: "Number of Txn", value: portfolio.transactions.length });
    list.push({
      key: "Number of Buy",
      value: portfolio.transactions.filter((t) => t.action === "Buy").length,
    });
    list.push({
      key: "Number of Sell",
      value: portfolio.transactions.filter((t) => t.action === "Sell").length,
    });
    // list.push({ key: "Number of Stock", value: stockSet.size });

    return <SimpleTable list={list} />;
  };

  const ETFInfo = () => {
    let list = etfInfo.map(item => {return {key : `${item.symbol} (${item.name})`, value : `USD ${item.price}`}});
    return <SimpleTable list={list} />;
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <Container>
        <Menu />
        <Row xs={1} md={2} className="g-2 p-2 m-2">
          <Col sm={8}>
            <Summary />
            <ETFInfo />
          </Col>
          <Col sm={4}>
            <Recommendation />
          </Col>
        </Row>

        <TransactionModal
          handleClose={handleClose}
          handleConfirm={handleConfirm}
          show={show}
          txnData={txnData}
        />
      </Container>
    </>
  );
}
