/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CollectionPlay } from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Feature from "./Feature";
import Recommendation from "./Recommendation";
import { useSessionStorage } from "../../utils/useSessionStorage";

import apiHelper from "../../api/apiHelper";

import "./index.css";
import Spinner from "../../components/Spinner";

export default function PreLogin() {
  const { isAuthenticated, isLoading } = useAuth0();

  const [userProfile, setUserProfile] = useSessionStorage("userProfile", null);
  const [recommendations, setRecommendations] = useState([]);
  const [features, setFeatures] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    // Only process if isLoaded
    if (!isLoading) {

      // If customer is Authenticated, redirect to home page
      if (userProfile){
        return navigate("/Home");
      }

      // Get the recommendations and features
      (async () => {
        let featuresList = await apiHelper.getFeatures();
        setFeatures(featuresList);

        let recommendationList = await apiHelper.getRecommendation();
        setRecommendations(recommendationList);
      })();
    }
  }, [isLoading, userProfile]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row xs={1} md={2} className="g-4 bg-secondary">
        <Col>
          <div className="text-black p-3 m-3 text-white">
            <p className="p-3 m-3"></p>
            <h1>The best way to invest with your friends!</h1>
            <p className="p-0 ml-0"></p>
            <p>
              Investing with friends might seem like an intriguing concept.
              Instead of being the sole decision maker, you can share financial
              and knowledge-based resources to come up with a compelling
              investment strategy that serves your collective goals.
            </p>
            <p className="p-2 m-2"></p>
            <p className="p-0">
              See it in action <CollectionPlay />
            </p>
          </div>
        </Col>
        <Col>
            <Feature features={features} />
        </Col>
      </Row>

      <Recommendation recommendations={recommendations} />
    </>
  );
}