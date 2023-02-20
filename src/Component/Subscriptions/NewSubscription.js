import React, { useState, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Card, Layout, ResourceList, TextStyle, Thumbnail, Heading, DataTable, ButtonGroup, Button, Icon, FormLayout, TextField, Banner, Form, Stack, Select, Checkbox, PageActions
} from '@shopify/polaris';
import './../../App.css';

export default function NewSubscription() {
    const navigation = useNavigate();

    const [prepaidSubscription, setPrepaidSubscription] = useState(false);
    const [selectValue, setSelectValue] = useState('kg');
    const [selected, setSelected] = useState('today');
    const [shippingAddress, setShippingAddress] = useState(true);

    const handlePrepaidSubscriptionChange = useCallback(
        (value) => setPrepaidSubscription(value),
        [],
    );
    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'lastWeek' },
    ];
    return (
        <React.Fragment>
            <div>
                <Page title="New subscription" breadcrumbs={[{ content: 'Products', onAction: () => navigation(`/admin/subscription?${window.urlParams}`) }]}
                    divider primaryAction={{ content: 'Save' }}
                >
                    <Layout>
                        {/* <Layout.AnnotatedSection
                            id="Subscriptioninfo"
                            title="Subscription info"
                            description=""
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <Select
                                        label="currency"
                                        options={options}
                                        onChange={handleSelectChange}
                                        value={selected}
                                    />

                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection> */}
                        <Layout.AnnotatedSection
                            id="Select-customer"
                            title="Select customer"
                        >
                            <Card >
                                <Card.Section title="Customer info" >
                                    <FormLayout>
                                        <TextField type='email' label={"Email address"} />
                                    </FormLayout>
                                </Card.Section>
                                {
                                    shippingAddress && <Card.Section title="SHIPPING ADDRESS">
                                        <FormLayout>
                                            <FormLayout.Group>
                                                <TextField label={"First name"} />
                                                <TextField label={"Last name"} />
                                            </FormLayout.Group>

                                            <TextField label={"Address"} />
                                            <TextField label={"Apartment, suite, etc."} />
                                            <FormLayout.Group>
                                                <TextField label={"Zip/Postal code"} />
                                                <TextField label={"City"} />
                                            </FormLayout.Group>
                                            <FormLayout.Group>
                                                <TextField label={"Country"} />
                                                <TextField label={"State"} />
                                            </FormLayout.Group>
                                            <FormLayout.Group>
                                                <TextField label={"Phone"} type="phone" />
                                                <TextField label={"Company"} />
                                            </FormLayout.Group>
                                        </FormLayout>
                                    </Card.Section>
                                }
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id="billing"
                            title="Billing & Subscription shipping price or currency">
                            <Card>
                                <Card.Header title="Subscription interval and payment methods">
                                </Card.Header>
                                <Card.Section >
                                    <FormLayout>
                                        <FormLayout.Group >
                                            <Select
                                                value={selectValue}
                                                label="Payment method"
                                                onChange={handleSelectChange}
                                                options={[{ label: 'Today', value: 'today' },]}
                                            />
                                            <TextField type='date' label="Date when the customer will get charged" />
                                        </FormLayout.Group>
                                        <Checkbox
                                            label="This is a pre-paid subscription"
                                            checked={prepaidSubscription}
                                            onChange={handlePrepaidSubscriptionChange}
                                        />
                                        {
                                            prepaidSubscription ? <FormLayout.Group >
                                                <TextField label="Delivery every" type='number' onChange={() => { }} autoComplete="off" connectedRight={
                                                    <Select
                                                        value={selectValue}
                                                        label="type"
                                                        onChange={handleSelectChange}
                                                        labelHidden
                                                        options={['day(s)', 'week(s)', 'month(s)', 'year(s)']}
                                                    />
                                                } />
                                                <TextField label="Billing every" type='number' onChange={() => { }} autoComplete="off" suffix={"days"} />
                                            </FormLayout.Group> : <FormLayout.Group ><TextField label="Billing every" type='number' onChange={() => { }} autoComplete="off" connectedRight={
                                                <Select
                                                    value={selectValue}
                                                    label="type"
                                                    onChange={handleSelectChange}
                                                    labelHidden
                                                    options={['day(s)', 'week(s)', 'month(s)', 'year(s)']}
                                                />
                                            } />
                                            </FormLayout.Group>
                                        }
                                    </FormLayout>
                                </Card.Section>
                            </Card>

                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection id="billing"
                            title="Billing & Subscription shipping price or currency">
                            <Card title="shipping price or currency">
                                <Card.Section >

                                    <FormLayout>
                                        <Select
                                            label="currency"
                                            options={options}
                                            onChange={handleSelectChange}
                                            value={selected}
                                        />

                                    </FormLayout>
                                </Card.Section>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <br />
                    <PageActions
                        primaryAction={{
                            content: 'Save',
                        }}
                        secondaryActions={[
                            {
                                content: 'Cancel'
                            },
                        ]}
                    />
                </Page >
            </div>
        </React.Fragment >
    );
}
