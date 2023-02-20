
import { useState, useCallback } from 'react';
import { Page, Card, Layout, Text, DataTable, ButtonGroup, Button, Icon, Stack } from '@shopify/polaris';
import { AnalyticsMinor, ViewMajor, HorizontalDotsMinor } from '@shopify/polaris-icons';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
export default function Analytics() {
    const [selected, setSelected] = useState(0);

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );
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
    return (
        <Page title="Analytics">
            <Layout>
                <Layout.Section oneHalf>
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
    );
}