import React from "react";
import logo from "./logo.svg";
import "../src/commitUI/assets/css/index.css";
import "./App.css";
import { Button } from "commitUI/components/Button";
import { Heading } from "commitUI/components/Heading";
import { Text } from "commitUI/components/Text";
import Navbar from "commitUI/components/Navbar";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar />
            {/* <header className="App-header">
                <div style={{ width: "20%", flexDirection: "column" }}>
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

                    <Heading level={1} className="text">
                        H1
                    </Heading>

                    <Text className="text" size="xs" bold>
                        Text
                    </Text>

                    <Text className="text" size="xs" semibold>
                        Text
                    </Text>
                </div>
            </header> */}
        </Router>
    );
}

export default App;
