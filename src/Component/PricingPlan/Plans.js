import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Page, Card, Button, Text, List, Caption, Columns } from '@shopify/polaris';
import './../../App.css';
export default function Plans() {
    return (
        <React.Fragment>
            <Page
                title="Pricing Plan"
                fullWidth
            >
                <Layout>
                    <Layout.Section fullWidth>
                        <Columns columns={{ sm: 2, md: 2, lg: 4, xl: 4, xs: 1 }}>
                            <div>
                                <Card title="Starter">
                                    <Card.Section>
                                        <Text variant="heading2xl" as="p">$7 / Month<div style={{ marginTop: 5 }}><Text variant="bodySm" as="p">Billed Monthly(30 Day Free Trial)</Text></div></Text>
                                    </Card.Section>
                                    <Card.Section>
                                        <List type="bullet" >
                                            <List.Item>One Subscriptions group</List.Item>
                                            <List.Item>Unlimited Orders</List.Item>
                                            <List.Item>No transaction fees</List.Item>
                                            <List.Item>Customer Portal</List.Item>
                                            <List.Item>Custom Email Notification</List.Item>
                                            <List.Item>Cancellation Management</List.Item>
                                            <List.Item>Shopify Checkout</List.Item>
                                            <List.Item>Chat & Email Support</List.Item>
                                        </List>
                                        <div style={{ marginTop: 10 }} >
                                            <Button primary fullWidth>Add customer</Button>
                                        </div>
                                    </Card.Section>
                                </Card>
                            </div>
                            <div>
                                <Card title="Starter">
                                    <Card.Section>
                                        <Text variant="heading2xl" as="p">$7 / Month<div style={{ marginTop: 5 }}><Text variant="bodySm" as="p">Billed Monthly(30 Day Free Trial)</Text></div></Text>
                                    </Card.Section>
                                    <Card.Section>
                                        <List type="bullet" >
                                            <List.Item>One Subscriptions group</List.Item>
                                            <List.Item>Unlimited Orders</List.Item>
                                            <List.Item>No transaction fees</List.Item>
                                            <List.Item>Customer Portal</List.Item>
                                            <List.Item>Custom Email Notification</List.Item>
                                            <List.Item>Cancellation Management</List.Item>
                                            <List.Item>Shopify Checkout</List.Item>
                                            <List.Item>Chat & Email Support</List.Item>
                                        </List>
                                        <div style={{ marginTop: 10 }} >
                                            <Button primary fullWidth>Add customer</Button>
                                        </div>
                                    </Card.Section>
                                </Card>
                            </div>
                            <div>
                                <Card title="Starter">
                                    <Card.Section>
                                        <Text variant="heading2xl" as="p">$7 / Month<div style={{ marginTop: 5 }}><Text variant="bodySm" as="p">Billed Monthly(30 Day Free Trial)</Text></div></Text>
                                    </Card.Section>
                                    <Card.Section>
                                        <List type="bullet" >
                                            <List.Item>One Subscriptions group</List.Item>
                                            <List.Item>Unlimited Orders</List.Item>
                                            <List.Item>No transaction fees</List.Item>
                                            <List.Item>Customer Portal</List.Item>
                                            <List.Item>Custom Email Notification</List.Item>
                                            <List.Item>Cancellation Management</List.Item>
                                            <List.Item>Shopify Checkout</List.Item>
                                            <List.Item>Chat & Email Support</List.Item>
                                        </List>
                                        <div style={{ marginTop: 10 }} >
                                            <Button primary fullWidth>Add customer</Button>
                                        </div>
                                    </Card.Section>
                                </Card>
                            </div>
                            <div>
                                <Card title="Starter">
                                    <Card.Section>
                                        <Text variant="heading2xl" as="p">$7 / Month<div style={{ marginTop: 5 }}><Text variant="bodySm" as="p">Billed Monthly(30 Day Free Trial)</Text></div></Text>
                                    </Card.Section>
                                    <Card.Section>
                                        <List type="bullet" >
                                            <List.Item>One Subscriptions group</List.Item>
                                            <List.Item>Unlimited Orders</List.Item>
                                            <List.Item>No transaction fees</List.Item>
                                            <List.Item>Customer Portal</List.Item>
                                            <List.Item>Custom Email Notification</List.Item>
                                            <List.Item>Cancellation Management</List.Item>
                                            <List.Item>Shopify Checkout</List.Item>
                                            <List.Item>Chat & Email Support</List.Item>
                                        </List>
                                        <div style={{ marginTop: 10 }} >
                                            <Button primary fullWidth>Add customer</Button>
                                        </div>
                                    </Card.Section>
                                </Card>
                            </div>
                        </Columns>
                    </Layout.Section>
                    <Layout.Section oneThird sectioned>
                        <Card title="Starter">
                            <Card.Section>
                                <Text variant="heading2xl" as="p">$7 / Month<div style={{ marginTop: 5 }}><Text variant="bodySm" as="p">Billed Monthly(30 Day Free Trial)</Text></div></Text>
                            </Card.Section>
                            <Card.Section>
                                <List type="bullet" >
                                    <List.Item>One Subscriptions group</List.Item>
                                    <List.Item>Unlimited Orders</List.Item>
                                    <List.Item>No transaction fees</List.Item>
                                    <List.Item>Customer Portal</List.Item>
                                    <List.Item>Custom Email Notification</List.Item>
                                    <List.Item>Cancellation Management</List.Item>
                                    <List.Item>Shopify Checkout</List.Item>
                                    <List.Item>Chat & Email Support</List.Item>
                                </List>
                                <div style={{ marginTop: 10 }} >
                                    <Button primary fullWidth>Add customer</Button>
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneThird sectioned>
                        <Card title="Starter">
                            <Card.Section>
                                <Text variant="heading2xl" as="p">$7 / Month<div style={{ marginTop: 5 }}><Text variant="bodySm" as="p">Billed Monthly(30 Day Free Trial)</Text></div></Text>
                            </Card.Section>
                            <Card.Section>
                                <List type="bullet" >
                                    <List.Item>One Subscriptions group</List.Item>
                                    <List.Item>Unlimited Orders</List.Item>
                                    <List.Item>No transaction fees</List.Item>
                                    <List.Item>Customer Portal</List.Item>
                                    <List.Item>Custom Email Notification</List.Item>
                                    <List.Item>Cancellation Management</List.Item>
                                    <List.Item>Shopify Checkout</List.Item>
                                    <List.Item>Chat & Email Support</List.Item>
                                </List>
                                <div style={{ marginTop: 10 }} >
                                    <Button primary fullWidth>Add customer</Button>
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneThird sectioned>
                        <Card title="Premium">
                            <Card.Section>
                                <Text variant="heading2xl" as="p">$7 / Month<div style={{ marginTop: 5 }}><Text variant="bodySm" as="p">Billed Monthly(30 Day Free Trial)</Text></div></Text>
                            </Card.Section>
                            <Card.Section>

                                <List type="bullet">
                                    <List.Item>Unlimited Subscriptions groups</List.Item>
                                    <List.Item>Unlimited Orders</List.Item>
                                    <List.Item>No transaction fees</List.Item>
                                    <List.Item>Customer Portal</List.Item>
                                    <List.Item>Custom Email Notification</List.Item>
                                    <List.Item>Cancellation Management</List.Item>
                                    <List.Item>Shopify Checkout</List.Item>
                                    <List.Item>Priority Support</List.Item>

                                </List>
                                <div style={{ marginTop: 10 }} >
                                    <Button primary fullWidth>Add customer</Button>
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </React.Fragment>
    );
}
