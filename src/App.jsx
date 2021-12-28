import React from "react";
import ReactDOM from "react-dom";
import ActivityFeed from "./components/ActivityFeed.jsx";

import Header from "./Header.jsx";

const App = () => {
  return (
    <div className="container">
      <Header />
      <ActivityFeed />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
