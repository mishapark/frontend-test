import React, { useState } from "react";
import incomingIcon from "../icons/incoming.png";
import outgoingIcon from "../icons/outgoing.png";
import "./ActivityDetail.css";

const baseUrl = "https://aircall-job.herokuapp.com/activities/";

const ActivityDetail = ({
  id,
  from,
  to,
  created_at,
  direction,
  onFetchList,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const parsedDate = new Date(Date.parse(created_at));
  const date = parsedDate.toLocaleTimeString("en-us");

  const archiveHandler = async () => {
    try {
      setIsLoading(true);
      await fetch(baseUrl + id, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          is_archived: true,
        }),
      });
      await onFetchList();
    } catch (e) {
      console.error(`Error: ${e.toString()}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="detail">
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <React.Fragment>
          {direction === "inbound" ? (
            <img
              className="detail-icon"
              src={incomingIcon}
              alt="incoming call"
            />
          ) : (
            <img className="detail-icon" src={outgoingIcon} alt="call" />
          )}
          <div className="detail-info">
            <h3 className="detail-number">{from}</h3>
            <p className="detail-desc">tried to call on {to}</p>
          </div>
          <div className="detail-button" onClick={archiveHandler} />
          <div className="detail-date">
            <div className="detail-time">{date.slice(0, -6)}</div>
            <div className="detail-ampm">{date.slice(-2)}</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ActivityDetail;
