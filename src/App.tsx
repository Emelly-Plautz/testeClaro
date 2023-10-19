import "./styles/App.css";

import Title from "./components/Title/index";
import Description from "./components/Description/index";
import Form from "./components/Form";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app">
      <div className="content">
        <Title />
        <Description />
        <hr />
        <Form />
      </div>
    </div>
  );
}

export default App;
