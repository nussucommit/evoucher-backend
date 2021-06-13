import React from "react";
import logo from "./logo.svg";
import "../src/commitUI/assets/css/index.css";
import "./App.css";
import { Button } from "commitUI/components/Button";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: "20%" }}>
                    <Button className="test">Test</Button>
                    <Button className="test" type="text">
                        Test
                    </Button>
                    <Button className="test" type="danger">
                        Danger
                    </Button>
                    <Button className="test" type="success">
                        Success
                    </Button>
                    <Button className="test" type="secondary">
                        Secondary
                    </Button>
                    <Button className="test" type="outlined">
                        Outlined
                    </Button>
                    <Button className="test" size="small">
                        Small
                    </Button>
                </div>
            </header>
        </div>
    );
}

export default App;
