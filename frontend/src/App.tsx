import React, { useState } from "react";
import logo from "./logo.svg";
import "./@commitUI/assets/css/index.css";
import "./App.css";
import { Input } from "@commitUI/index";
import Navbar from "components/Navbar";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
    const [value, setValue] = useState("");
    return (
        <Router>
            <Input
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(event.target.value)
                }
                label="First Name"
                style={{ marginTop: 100 }}
            />
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
