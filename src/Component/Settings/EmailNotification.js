import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Card, Layout, FormLayout, Button, TextField, Stack,
} from '@shopify/polaris';
import {
    AnalyticsMinor
} from '@shopify/polaris-icons';
import './../../App.css';

export default function EmailNotification() {
    const navigation = useNavigate();

    return (
        <React.Fragment>
            <div>
                <Page title='Email Notification' breadcrumbs={[{ content: 'Products', onAction: () => navigation(`/admin/settings?${window.urlParams}`) }]}>
                    <Layout>
                        <Layout.AnnotatedSection
                            id='email-notification'
                            title="Email Notification"
                            description="Enable & customize the email template to notify your customer on specific events"
                        >
                            <Card>
                                <Card.Section title="Email Settings">
                                    <FormLayout>
                                        <TextField label="From Name" />
                                        <FormLayout.Group>
                                            <TextField label="From Email" />
                                            <TextField label="Reply to mail" />
                                        </FormLayout.Group>
                                        <Stack distribution='trailing'>
                                            <Stack.Item>
                                                <Button primary>Save</Button>
                                            </Stack.Item>
                                        </Stack>
                                    </FormLayout>
                                </Card.Section>
                                <Card.Section title="New Subscription" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer when they create a new subscription
                                    </p>
                                </Card.Section>
                                <Card.Section title="Subscription Expired" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer when their subscription expires
                                    </p>
                                </Card.Section>
                                <Card.Section title="Subscription Paused" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer when their subscription is paused
                                    </p>
                                </Card.Section>
                                <Card.Section title="Subscription Resumed" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>Sent to the customer when their subscription is resumed
                                    </p>
                                </Card.Section>
                                <Card.Section title="Subscription Cancelled" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer when their subscription is manually cancelled by themeselves or by an admin
                                    </p>
                                </Card.Section>
                                <Card.Section title="Payment Failed (Retrying)" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer after a failed payment which is sheduled for automatic retrying.
                                    </p>
                                </Card.Section>
                                <Card.Section title="Payment Failed (Last Attempt)" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer after the last attempt at processing failed payment.
                                    </p>
                                </Card.Section>
                                <Card.Section title="Order Skipped" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer after Skipping order.
                                    </p>
                                </Card.Section>
                                <Card.Section title="Address Changed" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer after they Manage an address in their customer portal.
                                    </p>
                                </Card.Section>
                                <Card.Section title="Payment Reminder" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Sent to the customer before an upcomming payment.
                                    </p>
                                </Card.Section>
                                <Card.Section title="Customer Account Invite" actions={[{ content: 'Manage' }, { content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]}>
                                    <p>
                                        Send the shopify account invite email to customers who checkout as guests
                                    </p>
                                </Card.Section>

                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page >
            </div>
        </React.Fragment >
    );
}
