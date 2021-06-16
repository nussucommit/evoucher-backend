import React, { useState } from "react";
import logo from "./logo.svg";
import "./@commitUI/assets/css/index.css";
import "./App.css";
import { Input } from "@commitUI/index";
import Login from "pages/Login";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
    return (
        <Router>
            <Login />

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
