import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Card, Layout, Checkbox, FormLayout, Select, ChoiceList, Tabs,
} from '@shopify/polaris';
import {
    AnalyticsMinor
} from '@shopify/polaris-icons';
import './../../App.css';

export default function LanguageSettings() {
    const navigation = useNavigate();
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'message-1',
            content: 'Message',
            accessibilityLabel: 'Message',
            panelID: 'all-customers-content-1',
        },
        {
            id: 'customer-portal-1',
            content: 'Customer Portal',
            panelID: 'accepts-marketing-content-1',
        },

    ];
    return (
        <React.Fragment>
            <div>
                <Page title='Language Settings' breadcrumbs={[{ content: 'Settings', onAction: () => navigation(`/admin/settings?${window.urlParams}`) }]}>
                    <Card>
                        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} >
                            <Card.Section title={tabs[selected].content}>
                                <p>Tab {selected} selected</p>
                            </Card.Section>
                        </Tabs>
                    </Card>
                </Page >
            </div>
        </React.Fragment >
    );
}
