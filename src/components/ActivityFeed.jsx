import React, { useState, useEffect, useCallback } from "react";

import ActivityDetail from "./ActivityDetail.jsx";
import "./ActivityFeed.css";

const baseUrl = "https://aircall-job.herokuapp.com";

const ActivityFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState({});

  const handleFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(baseUrl + "/activities");
      const data = await response.json();

      const formattedData = data.reduce((acc, currentValue) => {
        const parsedDate = new Date(
          Date.parse(currentValue.created_at)
        ).toLocaleString("en-us", {
          day: "numeric",
          year: "numeric",
          month: "long",
        });

        const prev = acc[parsedDate];
        if (prev) {
          acc[parsedDate] = [...prev, currentValue];
        } else {
          acc[parsedDate] = [currentValue];
        }

        return acc;
      }, {});

      setActivities(formattedData);

      return formattedData;
    } catch (error) {
      console.error(`Error: ${error.toString()}`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  const handleReset = async () => {
    await fetch(baseUrl + "/reset");
    await handleFetch();
  };

  const content = Object.keys(activities).map((key) => {
    const currentElements = activities[key];

    return (
      <React.Fragment key={key}>
        <div className="feed-date">{key}</div>
        {currentElements.map(
          ({ id, to, from, created_at, direction, is_archived }) =>
            is_archived ? null : (
              <ActivityDetail
                key={id}
                id={id}
                to={to}
                from={from}
                created_at={created_at}
                direction={direction}
                onFetchList={handleFetch}
              />
            )
        )}
      </React.Fragment>
    );
  });

  return (
    <div className="feed-content">
      <div className="button-container">
        <button className="feed-btn" type="button" onClick={handleReset}>
          Reset Calls
        </button>
      </div>
      {isLoading ? <div>Loading...</div> : content}
    </div>
  );
};

export default ActivityFeed;
