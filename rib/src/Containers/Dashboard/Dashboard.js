import React, { Component } from 'react';
import Wrap from "../../HOC/Wrap";

class Dashboard extends Component {


    render() {
        return (
            <Wrap>
                <div>
                    Header
                </div>
                <div>
                    SideMenu
                </div>
                <main>
                    Content
                </main>
            </Wrap>


        );
    }
}

export default Dashboard;