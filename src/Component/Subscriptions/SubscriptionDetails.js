import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Page,
    Card, Layout, ResourceList, Text, Thumbnail, Heading, DataTable, Badge, ButtonGroup, Button, Icon, Subheading, FormLayout, TextField, Banner, Form, Stack, Select, ResourceItem, Avatar, PageActions
} from '@shopify/polaris';
import { EditMajor, DeleteMajor, MobileCancelMajor, MobileAcceptMajor, CalendarTickMajor, ChevronUpMinor, ChevronDownMinor } from '@shopify/polaris-icons';
import './../../App.css';

export default function SubscriptionDetails() {
    const [shipping, setShipping] = useState(false);
    const [open, setOpen] = useState(false);

    const navigation = useNavigate();
    let { id } = useParams();
    const rows = [
        ['7 Nov 2021', <Badge status="warning">success</Badge>, 'Emerald Silk Gown'],
        ['7 Nov 2021', <Badge status="success">success</Badge>, 'Navy Merino Wool Blazer with khaki chinos Blazer with khaki chinos '],
        ['7 Nov 2021', <Badge status="success">success</Badge>, 'Navy Merino Wool Blazer with khaki chinos'],
    ];
    const itemsRows = [
        ['Emerald Silk Gown', '$875.00', 140, <ButtonGroup><Button icon={EditMajor} ></Button><Button icon={DeleteMajor}></Button></ButtonGroup>],
        ['Mauve Cashmere Scarf', '$230.00', 83, <ButtonGroup><Button icon={EditMajor}></Button><Button icon={DeleteMajor}></Button></ButtonGroup>],
        ['Navy Merino Wool Blazer with khaki chinos ', '$445.00', 32, <ButtonGroup><Button icon={EditMajor}></Button><Button icon={DeleteMajor}></Button></ButtonGroup>],
        [<React.Fragment><Stack alignment='center' spacing='tight' ><Stack.Item fill><Text variant="bodyMd" as="span" fontWeight="semibold">Shipping</Text></Stack.Item><Stack.Item><Stack alignment='center'>{shipping ? <TextField value='10.0' /> : <Text variant="bodyMd" as="span" color="subdued">100</Text>} {shipping ? <ButtonGroup>< Button icon={MobileAcceptMajor} primary ></Button > <Button icon={MobileCancelMajor} onClick={() => setShipping(false)}></Button></ButtonGroup > : <Button icon={EditMajor} onClick={() => setShipping(true)}></Button>}</Stack></Stack.Item></Stack></React.Fragment>]
    ];

    const iconContent = () => {
        return (
            <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="Polaris-Icon__Svg_375hu" focusable="false" aria-hidden="true"><path d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" fill="#fff" stroke="#00848E" strokeWidth="2"></path><path d="M10 5v5l3 3" stroke="#00848E" strokeWidth="2" strokeLinecap="round" strokeLinejoin='round'></path></svg>
        );
    };
    const handleToggle = useCallback(() => setOpen((open) => !open), []);
    console.log("open", open);
    return (
        <React.Fragment>
            <div>
                <Page title={`subscription ${id}`} breadcrumbs={[{ content: 'Products', onAction: () => navigation('/admin/dashboard') }]}
                    primaryAction={{ content: 'Save' }}
                >
                    <Layout>
                        <Layout.Section>
                            <Card title="Line items" actions={{ content: <Button plain>Add item</Button> }}>
                                <Card.Section>
                                    <div className='subscription-line-items'>
                                        <DataTable verticalAlign='middle'
                                            columnContentTypes={[
                                                'text',
                                                'numeric',
                                                'numeric',
                                                'numeric',
                                            ]}
                                            headings={[
                                                <Text variant="bodyMd" as="span" fontWeight="semibold">Product</Text>,
                                                <Text variant="bodyMd" as="span" fontWeight="semibold">Price</Text>,
                                                <Text variant="bodyMd" as="span" fontWeight="semibold">Total</Text>,
                                                <Text variant="bodyMd" as="span" fontWeight="semibold">Action</Text>

                                            ]}
                                            rows={itemsRows}

                                        />
                                    </div>
                                </Card.Section>
                            </Card>
                            <Card title={
                                <Stack alignment='center' spacing='tight'>
                                    <span style={{ borderRadius: "50%", display: "block", backgroundColor: "#a4e8f2", padding: "4px" }}><Icon source={iconContent} /></span>
                                    <Text variant="headingMd" as="h2">Scheduled</Text>
                                </Stack>
                            }>
                                <Card.Section>
                                    <Stack vertical spacing='loose'>
                                        <Stack alignment='center'>
                                            <Stack.Item fill>
                                                <Stack vertical spacing='tight'>
                                                    <Text variant="headingXs" as="h3">NEXT FULFILLMENT</Text>
                                                    <Stack spacing='extraTight' alignment='center'><Icon source={CalendarTickMajor} color="base" /><Text variant="headingXs" as="h3">15 April, 2022</Text></Stack>
                                                </Stack>
                                            </Stack.Item>
                                            <Stack.Item>
                                                <ButtonGroup>
                                                    <Button >Skip</Button>
                                                    <Button primary>Reshedule</Button>
                                                </ButtonGroup>
                                            </Stack.Item>
                                        </Stack>
                                        <Stack alignment='center' spacing='loose' >
                                            <Stack.Item >
                                                <div className='PaymentMethodWidget_widget__2dZ3B'>
                                                    <Thumbnail source="" size="small" />
                                                    <div>
                                                        <p>Visa ending in sdsdskdbskdshdklsds dsdklhjskldhsd 1111</p>
                                                        <p><Text variant="bodyMd" as="span" color="subdued">Quantity : </Text> 1</p>
                                                    </div>
                                                </div>
                                            </Stack.Item>
                                        </Stack>
                                    </Stack>
                                </Card.Section>
                                {
                                    open ?
                                        <React.Fragment>
                                            <Card.Section>
                                                <Stack vertical spacing='loose'>
                                                    <Stack alignment='center'>
                                                        <Stack.Item fill>
                                                            <Stack vertical spacing='tight'>
                                                                <Text variant="headingXs" as="h3">FULFILL ON</Text>
                                                                <Stack spacing='extraTight' alignment='center'><Icon source={CalendarTickMajor} color="base" /><Text variant="headingXs" as="h3">15 April, 2022</Text></Stack>
                                                            </Stack>
                                                        </Stack.Item>
                                                        <Stack.Item>
                                                            <ButtonGroup>
                                                                <Button >Skip</Button>
                                                                <Button primary>Reshedule</Button>
                                                            </ButtonGroup>
                                                        </Stack.Item>
                                                    </Stack>
                                                    <Stack alignment='center' spacing='loose' >
                                                        <Stack.Item >
                                                            <div className='PaymentMethodWidget_widget__2dZ3B'>
                                                                <Thumbnail source="" size="small" />
                                                                <div>
                                                                    <p>Visa ending in sdsdskdbskdshdklsds dsdklhjskldhsd 1111</p>
                                                                    <p><Text variant="bodyMd" as="span" color="subdued">Quantity : </Text> 1</p>
                                                                </div>
                                                            </div>
                                                        </Stack.Item>
                                                    </Stack>
                                                </Stack>
                                            </Card.Section>
                                            <Card.Section>
                                                <Stack vertical spacing='loose'>
                                                    <Stack alignment='center'>
                                                        <Stack.Item fill>
                                                            <Stack vertical spacing='tight'>
                                                                <Text variant="headingXs" as="h3">FULFILL ON</Text>
                                                                <Stack spacing='extraTight' alignment='center'><Icon source={CalendarTickMajor} color="base" /><Text variant="headingXs" as="h3">15 April, 2022</Text></Stack>
                                                            </Stack>
                                                        </Stack.Item>
                                                        <Stack.Item>
                                                            <ButtonGroup>
                                                                <Button >Skip</Button>
                                                                <Button primary>Reshedule</Button>
                                                            </ButtonGroup>
                                                        </Stack.Item>
                                                    </Stack>
                                                    <Stack alignment='center' spacing='loose' >
                                                        <Stack.Item >
                                                            <div className='PaymentMethodWidget_widget__2dZ3B'>
                                                                <Thumbnail source="" size="small" />
                                                                <div>
                                                                    <p>Visa ending in sdsdskdbskdshdklsds dsdklhjskldhsd 1111</p>
                                                                    <p><Text variant="bodyMd" as="span" color="subdued">Quantity : </Text> 1</p>
                                                                </div>
                                                            </div>
                                                        </Stack.Item>
                                                    </Stack>
                                                </Stack>
                                            </Card.Section>
                                        </React.Fragment> : <React.Fragment></React.Fragment>
                                }
                                <Card.Section>
                                    <div onClick={handleToggle}>
                                        {!open ? <Stack> <Stack.Item fill>
                                            View all fulfillments (2)
                                        </Stack.Item>
                                            <Stack.Item>
                                                <Icon source={ChevronDownMinor} />
                                            </Stack.Item></Stack>
                                            : <Stack>
                                                <Stack.Item fill>
                                                    Hide fulfillments
                                                </Stack.Item>
                                                <Stack.Item>
                                                    <Icon source={ChevronUpMinor} />
                                                </Stack.Item>
                                            </Stack>}
                                    </div>
                                </Card.Section>
                            </Card>
                            <Card title="Payments" actions={{ content: "Place order now" }} sectioned >
                                <div className='subscription-datatable'>
                                    <DataTable
                                        columnContentTypes={[
                                            'text',
                                            'text',
                                            'text'
                                        ]}
                                        headings={[
                                            'Date',
                                            'Status',
                                            'Details'
                                        ]}
                                        rows={rows}
                                        verticalAlign="middle"
                                    />
                                </div>
                            </Card>
                        </Layout.Section>
                        <Layout.Section secondary>
                            <Card title="Overview">
                                <Card.Section >
                                    <Stack vertical spacing='tight'>
                                        <Stack.Item >
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>
                                        <Stack.Item >
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>
                                        <Stack.Item >
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>

                                        <Stack.Item>
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>
                                    </Stack>
                                </Card.Section>
                                <Card.Section title="SHIPPING ADDRESS">
                                    <div>Ketan Nimje<br />1122 - near EKLERA Police Station behind bestan aws,<br />Surat-395010<br />Gujarat, India
                                    </div>
                                </Card.Section>
                            </Card>
                            <Card title="Payment method" secondaryFooterActions={[{ content: 'Edit shipment' }]}
                                footerActionAlignment="left">
                                <Card.Section >
                                    <Stack vertical>
                                        <Stack.Item>
                                            <div className='PaymentMethodWidget_widget__2dZ3B'>
                                                <img src='https://app.shop.paywhirl.com/static/media/visa.52d3db05.svg' className='PaymentMethodIcon_img__3WSfu' />
                                                <div>
                                                    <p>Visa ending in 1111</p>
                                                    <p><Text variant="bodyMd" as="span" color="subdued">Expires 10/23</Text></p>
                                                </div>
                                            </div>
                                        </Stack.Item>
                                    </Stack>
                                </Card.Section>
                            </Card>
                            <Card title="Billing Policy">
                                <Card.Section >
                                    <Stack vertical spacing='tight'>
                                        <Stack.Item >
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>
                                        <Stack.Item >
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>
                                        <Stack.Item >
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>

                                        <Stack.Item>
                                            <Stack distribution='equalSpacing'>
                                                <Stack.Item><Text>Order #1136</Text></Stack.Item>
                                                <Stack.Item>dfdf</Stack.Item>
                                            </Stack>
                                        </Stack.Item>
                                    </Stack>
                                </Card.Section>
                            </Card>
                            <Card title="Discount Management" >
                                <Card.Section alignment="center">
                                    <Stack>
                                        <Stack.Item>
                                            <Button>
                                                Add New Discount
                                            </Button>
                                        </Stack.Item>
                                    </Stack>
                                </Card.Section>
                            </Card>
                        </Layout.Section>
                    </Layout>
                </Page >
            </div>
        </React.Fragment >
    );
}
