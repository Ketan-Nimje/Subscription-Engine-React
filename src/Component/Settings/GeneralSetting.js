import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Card, Layout, Checkbox, Icon, FormLayout, TextField, Select, ChoiceList, Toast,
} from '@shopify/polaris';
import {
    AnalyticsMinor
} from '@shopify/polaris-icons';
import './../../App.css';
import ApiService from '../../Apiservice';

export default function GeneralSetting() {
    const navigation = useNavigate();
    const apiService = new ApiService();

    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState(false);
    const [generalSettings, setGeneralSettings] = useState({
        payment_retry: "0",
        payment_retry_interval: "0",
        after_riches_retry: "0",
        shipping_method_name: "Subscription Shipping",
        shipping_method_name_by: "0",
        update_auto_delivery_rate: "1",
        ssb_on_order_status_page: 1,
        tag_subscription_order: 1,
        first_order_tag: '',
        recurring_order_tag: '',
    });

    useEffect(() => {
        getGeneralSettings();
    }, [])

    const getGeneralSettings = useCallback(async () => {
        const response = await apiService.getSettings({ column: ['payment_retry', 'payment_retry_interval', 'after_riches_retry', 'update_auto_delivery_rate', 'shipping_method_name_by', 'shipping_method_name', 'ssb_on_order_status_page', 'tag_subscription_order', 'first_order_tag', 'recurring_order_tag'] })
        if (response.status) {
            setGeneralSettings(response.data);
        }
    }, [])

    const saveGeneralSettings = async () => {

        setIsLoading(true)
        const response = await apiService.saveSettings(generalSettings)
        if (response.status) {
            setIsLoading(false);
            setActive(true);

        }
    }
    const toggleActive = useCallback(() => setActive((active) => !active), []);

    const [textFieldValue, setTextFieldValue] = useState('');


    const renderChildren = useCallback(
        (isSelected) =>
            isSelected && (
                <TextField
                    labelHidden
                    label="Shipping Method Name"
                    helpText="The shipping method name will be set on each subscription after it is created in the shop. Click the button below to set the shipping method name on your existing subscriptions."
                    value={generalSettings.shipping_method_name}
                    onChange={(value) => setGeneralSettings({ ...generalSettings, shipping_method_name: value })}
                    autoComplete="off"
                />
            ),
        [generalSettings],
    );


    return (
        <React.Fragment>
            <div>
                <Page title='General settings' breadcrumbs={[{ content: 'Products', onAction: () => navigation(`/admin/settings?${window.urlParams}`) }]}>
                    <Layout>
                        <Layout.AnnotatedSection
                            id="billing"
                            title="Billing settings"
                            description="Control how to bill your customers.">
                            <Card sectioned primaryFooterAction={{ content: 'Save', onAction: () => saveGeneralSettings(), loading: isLoading }}>
                                <FormLayout>
                                    <Select
                                        helpText="Configure how many times you want the system to retry the failed billing attempt before applying the action specified below."
                                        label="Retry failed billing attempts"
                                        options={[
                                            { label: "Don't retry", value: 0 },
                                            { label: '1 times', value: 1 },
                                            { label: '2 times', value: 2 },
                                            { label: '3 times', value: 3 },
                                            { label: '4 times', value: 4 },
                                        ]}
                                        value={parseInt(generalSettings.payment_retry)}
                                        onChange={(value) => setGeneralSettings({ ...generalSettings, payment_retry: parseInt(value) })}

                                    />
                                    <Select
                                        helpText="Configure the delay between the retries of a failed billing attempt."
                                        label="Delay between retries of a failed billing attempt"
                                        options={[
                                            { label: '1 Days', value: 1 },
                                            { label: '2 Days', value: 2 },
                                            { label: '3 Days', value: 3 },
                                            { label: '4 Days', value: 4 },
                                            { label: '5 Days', value: 5 }
                                        ]}
                                        onChange={(value) => setGeneralSettings({ ...generalSettings, payment_retry_interval: parseInt(value) })}

                                        value={parseInt(generalSettings.payment_retry_interval)} />
                                    <Select
                                        helpText="Configure what to do when the payment fails multiple times."
                                        label="When the subscription reaches maximum number of failures"
                                        options={[
                                            { label: "CANCEL SUBSCRIPTION", value: 0 },
                                            { label: 'PAUSED  SUBSCRIPTION', value: 1 },
                                            { label: 'EXPIRED  SUBSCRIPTION', value: 2 },
                                            { label: 'SKIP BILLING / ORDER', value: 3 },
                                        ]}
                                        onChange={(value) => setGeneralSettings({ ...generalSettings, after_riches_retry: parseInt(value) })}

                                        value={parseInt(generalSettings.after_riches_retry)} />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id="shipping-for-auto-charging-subscriptions"
                            title="Shipping for auto-charging subscriptions"
                        // description="Choose when you want the system to automatically update the delivery cost in your subscriptions according to the shipping rates set up in your shop. The delivery cost will be automatically updated a few minutes after the change was applied to the subscription."
                        >
                            <Card primaryFooterAction={{ content: 'Save', onAction: () => saveGeneralSettings(), loading: isLoading }}>
                                <Card.Section>
                                    <Checkbox
                                        label="Update delivery cost for auto-charging subscription"
                                        checked={generalSettings.update_auto_delivery_rate == 1}
                                        onChange={(value) => setGeneralSettings({ ...generalSettings, update_auto_delivery_rate: value ? 1 : 0 })}

                                        helpText="Turn this on if you want the app to automatically update the delivery cost of subscription according to your shipping rates after the subscription gets created. This resolves the issue if the customer got free shipping because they bought enough to get free shipping, but the subscription doesn't have enough products to have free shipping rate."
                                    />
                                </Card.Section>
                                <Card.Section title="SHIPPING METHOD NAME FOR SUBSCRIPTION RENEWALS">
                                    <FormLayout>
                                        <ChoiceList
                                            choices={[
                                                {
                                                    label: 'Default by Shopify',
                                                    value: 0,
                                                    helpText: 'The default shipping method, set by Shopify. Usually set as "Subscription shipping."',

                                                },
                                                {
                                                    label: 'Custom shipping method name',
                                                    value: 1,
                                                    renderChildren,
                                                },
                                            ]}
                                            selected={[parseInt(generalSettings.shipping_method_name_by)]}
                                            onChange={(value) => setGeneralSettings({ ...generalSettings, shipping_method_name_by: parseInt(value) })}
                                        />
                                    </FormLayout>
                                </Card.Section>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id='order'
                            title="Order Related settings"
                        // description="When an auto-charging subscription is purchased, the app can show a box with a description of the subscription, a link to the subscriptions and a button to resend the initial email."
                        >
                            <Card title="Order status page settings" primaryFooterAction={{ content: 'Save', onAction: () => saveGeneralSettings(), loading: isLoading }}>
                                <Card.Section>
                                    <FormLayout>
                                        <Checkbox
                                            label="Show subscription box with link to the account"
                                            helpText="When the order contains an auto-charging subscription product, the app will add a box with instructions on how to access the subscription to the order status page."
                                            checked={generalSettings.ssb_on_order_status_page == 1}
                                            onChange={(value) => setGeneralSettings({ ...generalSettings, ssb_on_order_status_page: value ? 1 : 0 })}

                                        />
                                    </FormLayout>
                                </Card.Section>
                                <Card.Section title="Orders tag setting">
                                    <FormLayout>
                                        <Checkbox
                                            label="Tag subscription first order and recurring order"
                                            checked={generalSettings.tag_subscription_order == 1}
                                            onChange={(value) => setGeneralSettings({ ...generalSettings, tag_subscription_order: value ? 1 : 0 })}

                                        />
                                        <TextField label="First subscription order tag"
                                            value={generalSettings.first_order_tag}
                                            helpText="Each new subscription order will be tagged with this tag."
                                            onChange={(value) => setGeneralSettings({ ...generalSettings, first_order_tag: value })}
                                        />
                                        <TextField label="Subsequent/Recurring subscription order tag"
                                            value={generalSettings.recurring_order_tag}
                                            helpText="Each subsequent/recurring subscription order will be tagged with this tag. You can separate tags with commas and use the placeholders listed below to add additional info to the tag."
                                            onChange={(value) => setGeneralSettings({ ...generalSettings, recurring_order_tag: value })}
                                        />

                                    </FormLayout>
                                </Card.Section>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                </Page >
                {active && <Toast content={"Setting Update Successfully!"} onDismiss={toggleActive} duration={1000} />}

            </div>

        </React.Fragment >
    );
}
