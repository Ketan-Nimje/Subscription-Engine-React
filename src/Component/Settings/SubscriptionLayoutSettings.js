import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Card, Layout, Checkbox, FormLayout, Select, ChoiceList,
} from '@shopify/polaris';
import {
    AnalyticsMinor
} from '@shopify/polaris-icons';
import './../../App.css';

export default function SubscriptionLayoutSettings() {
    const navigation = useNavigate();

    return (
        <React.Fragment>
            <div>
                <Page title='Subscription Layout Settings' breadcrumbs={[{ content: 'Products', onAction: () => navigation(`/admin/settings?${window.urlParams}`) }]}>
                    <Layout>
                        <Layout.Section oneHalf>
                            <Card >
                                <Card.Section>

                                </Card.Section>
                            </Card>
                        </Layout.Section>
                        <Layout.Section oneHalf>
                            <Card >
                                <Card.Section>

                                </Card.Section>
                            </Card>
                        </Layout.Section>

                    </Layout>
                </Page >
            </div>
        </React.Fragment >
    );
}
