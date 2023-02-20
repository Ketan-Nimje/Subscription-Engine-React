import React, { useState, useCallback } from 'react';
import { Page, Card, Layout, Text, DataTable, ButtonGroup, Button, Icon, Stack } from '@shopify/polaris';
import { AnalyticsMinor, ViewMajor, HorizontalDotsMinor } from '@shopify/polaris-icons';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import './../../App.css';

export default function Dashboard() {

    const options = {
        chart: {
            type: "spline"
        },
        yAxis: [{ //--- Primary yAxis
            title: {
                text: ''
            }
        }],
        colors: ["#008060"],
        title: {
            text: ""
        },
        legend: {
            align: 'left',
            enabled: false
        },
        series: [
            {
                name: 'Dates',
                data: [{ x: 1, y: 10 }, { x: 2, y: 30 }, { x: 3, y: 20 }, { x: 4, y: 10 }, { x: 5, y: 70 }, { x: 6, y: 0 }, { x: 7, y: 60 }]
            }
        ],
        credits: {
            enabled: false
        }
    };

    const rows = [
        [<Text variant="bodyMd" as="span" fontWeight="semibold">Emerald Silk Gown</Text>,
            '$875.00',
            124689,
            140,
            '$122,500.00',
        <ButtonGroup segmented spacing="tight">
            <Button size='slim'><Icon source={AnalyticsMinor} /></Button>
            <Button size='slim'><Icon source={ViewMajor} /></Button>
            <Button size='slim'><Icon source={HorizontalDotsMinor} /></Button>
        </ButtonGroup>],
        [<Text variant="bodyMd" as="span" fontWeight="semibold">Mauve Cashmere Scarf</Text>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
        <ButtonGroup segmented spacing="tight">
            <Button size='slim'><Icon source={AnalyticsMinor} /></Button>
            <Button size='slim'><Icon source={ViewMajor} /></Button>
            <Button size='slim'><Icon source={HorizontalDotsMinor} /></Button>
        </ButtonGroup>],
        [
            <Text variant="bodyMd" as="span" fontWeight="semibold">Navy Merino Wool Blazer with khaki chinos and yellow belt</Text>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            <ButtonGroup segmented spacing="tight">
                <Button size='slim'><Icon source={AnalyticsMinor} /></Button>
                <Button size='slim'><Icon source={ViewMajor} /></Button>
                <Button size='slim'><Icon source={HorizontalDotsMinor} /></Button>
            </ButtonGroup>
        ],
    ];

    return (
        <React.Fragment>
            <Page title="Dashboard">
                <Layout>
                    <Layout.Section>
                        <Card>
                            <Card.Section>
                                <Layout>
                                    <Layout.Section oneThird >
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Total Subscription</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Active Subscription</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Paused Subscription</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Cancelled Subscription</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Expired Subscription</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Failed Subscription</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Total Order</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Total Customer</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                    <Layout.Section oneThird>
                                        <div className='Polaris-grid'>
                                            <Text variant="headingMd" as="h2">Active Customer</Text>
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">100</Text>
                                        </div>
                                    </Layout.Section>
                                </Layout>
                            </Card.Section>
                            <Card.Section title="Top Selling Plans" actions={[{ content: <Button primary>Add Selling plan</Button> }]}>
                                <div style={{ borderRadius: '8px', border: '1px solid rgb(225 227 229)' }}>
                                    <DataTable
                                        columnContentTypes={[
                                            'text',
                                            'numeric',
                                            'numeric',
                                            'numeric',
                                            'numeric',
                                        ]}
                                        headings={[
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">Product</Text>,
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">Price</Text>,
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">SKU Number</Text>,
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">Net quantity</Text>,
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">Net sales</Text>,
                                            <Text variant="bodyMd" as="span" fontWeight="semibold">Action</Text>,
                                        ]}
                                        rows={rows}
                                    />
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Stack>
                            <Stack.Item fill>
                                <Text variant="headingMd" as="h2">Recently Activity</Text>
                            </Stack.Item>
                            <Stack.Item>
                                <Text variant="bodyMd" as="span" color="subdued">Last 30 Days</Text>
                            </Stack.Item>
                        </Stack>
                    </Layout.Section>
                    <Layout.Section oneHalf >
                        <Card title="New subscriptions" actions={[{ content: 'Last 30 days', disabled: true }]}>
                            <Card.Section>
                                {/* <Text variant="bodyMd" as="span" color="subdued">455 units available</Text> */}
                                <div style={{ width: '100%' }}>
                                    <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card title="Finished subscriptions" actions={[{ content: 'Last 30 days', disabled: true }]}>
                            <Card.Section>
                                {/* <Text variant="bodyMd" as="span" color="subdued">455 units available</Text> */}
                                <div style={{ width: '100%' }}>
                                    <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card title="Revenue" actions={[{ content: 'Last 30 days', disabled: true }]}>
                            <Card.Section>
                                {/* <Text variant="bodyMd" as="span" color="subdued">455 units available</Text> */}
                                <div style={{ width: '100%' }}>
                                    <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                    <Layout.Section oneHalf>
                        <Card title="New Orders" actions={[{ content: 'Last 30 days', disabled: true }]}>
                            <Card.Section>
                                {/* <Text variant="bodyMd" as="span" color="subdued">455 units available</Text> */}
                                <div style={{ width: '100%' }}>
                                    <HighchartsReact highcharts={Highcharts} containerProps={{ style: { height: "270px" } }} options={options} />
                                </div>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>
            </Page>
        </React.Fragment>);
}
