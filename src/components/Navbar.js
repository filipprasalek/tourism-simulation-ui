import React, {useState} from "react";
import {Heading, Pane, TabNavigation, Tab} from "evergreen-ui";
import {Link} from "react-router-dom";


function Navbar() {
    const tabs = [{name: 'Visualization', routerPath: '/'}, {name: 'Statistics', routerPath: '/statistics'}];
    const [selectedTab, setSelectedTab] = useState(0);
    return (
        <Pane display="flex" padding={20} background="#121D27" borderRadius={3} marginBottom={'3em'}>
            <Heading paddingLeft={'1.5em'} size={600} color={'white'} marginRight={'1.5em'}>Tourism Simulation</Heading>
            <TabNavigation>
                {tabs.map((tab, index) => (
                    <Tab key={tab.name} id={tab}
                         is={Link}
                         to={tab.routerPath}
                         isSelected={index === selectedTab}
                         onSelect={() => setSelectedTab(index)}
                         color={'white'}
                    >
                        {tab.name}
                    </Tab>
                ))}
            </TabNavigation>
        </Pane>
    );
}

export default Navbar;