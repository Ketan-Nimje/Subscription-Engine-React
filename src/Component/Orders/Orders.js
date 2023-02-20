import { Card, Page, Tabs } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function Orders() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all-customers-1',
            content: 'Upcomming Orders',
            accessibilityLabel: 'All customers',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'accepts-marketing-1',
            content: 'Completed Orders',
            panelID: 'accepts-marketing-content-1',
        },
        
    ];

    return (
        <Page
            title="Orders"
        >
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} >
                    <Card.Section title={tabs[selected].content}>
                        <p>Tab {selected} selected</p>
                    </Card.Section>
                </Tabs>
            </Card>
        </Page>
    );
}