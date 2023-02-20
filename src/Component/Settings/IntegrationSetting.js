import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Card, Layout, Checkbox, FormLayout, Toast, Button, TextField, Link, Text, Heading, List } from '@shopify/polaris';
import './../../App.css';
import ApiService from '../../Apiservice';

let initialStateObject = {
    allowCustomerToManagePausedResumeSubscription: false,
    allowCustomerToManageCancelSubscription: false,
    allowCustomerToManageSkipSubscription: false,
    allowCustomerToManageChargeSubscription: false,
    allowCustomerToManageIntervalSubscription: false,
    allowCustomerToManageNextBillingDateSubscription: false,
    allowCustomerToManageDiscountCodeSubscription: false,
    allowCustomerToManageAddRemoveProductsSubscription: false,
    allowCustomerToManageMinMaxSubscription: false,
    allowCustomerToManageShippingAddressSubscription: false,
}
export default function IntegrationSetting() {
    const apiService = new ApiService();
    const navigation = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [active, setActive] = useState(false);

    const [customerPortalObject, setCustomerPortalObject] = useState(initialStateObject);
    useEffect(() => {
        getCustomerPortalSettings();
    }, [])

    const getCustomerPortalSettings = async () => {
        const response = await apiService.getSettings({ column: ['customer_portal_settings'] })
        if (response.status) {
            if (response.data.customer_portal_settings) {
                setCustomerPortalObject(response.data.customer_portal_settings);
            }
        }
    }

    const saveCustomerPortalSettings = async () => {

        setIsLoading(true)
        const response = await apiService.saveSettings({ customer_portal_settings: customerPortalObject })
        if (response.status) {
            setIsLoading(false);
            setActive(true);

        }
    }
    const toggleActive = useCallback(() => setActive((active) => !active), []);

    console.log("active", active);
    return (
        <React.Fragment>
            <div>
                <Page title='Integration Settings' breadcrumbs={[{ content: 'Settings', onAction: () => navigation(`/admin/settings?${window.urlParams}`) }]}>
                    <Layout>
                        <Layout.AnnotatedSection
                            id="klaviyo-integration"
                            title="Klaviyo"
                            description="Use email automation flows based on subscriptions"
                        >
                            <Card title="Klaviyo " actions={[{ content: <Button plain  ><label className="switch"><input type="checkbox" checked={true} /*onChange={(value) => settingAction({ target: { name: 'is_enable_share_wishlist', value } })}*/ /><span className="slider round"></span></label></Button> }]} primaryFooterAction={{ content: 'Save', onAction: () => saveCustomerPortalSettings(), loading: isLoading }} >
                                <Card.Section >
                                    <FormLayout>
                                        <TextField
                                            label="Klaviyo Private API Key"
                                            value=""
                                            placeholder='pk_0000355656545645**********'
                                            helpText={<Text> The Private API Key can be found Klaviyo->Account->Settings->Api Keys <Link external url=''>Click here</Link></Text>}
                                        />
                                        <Text variant='headingMd' as='h2' >The matrics that are sent to klaviyo are:</Text>
                                        <List>
                                            <List.Item>
                                                Subscription Engine Start
                                            </List.Item>
                                            <List.Item>
                                                Subscription Engine Paused
                                            </List.Item>
                                            <List.Item>
                                                Subscription Engine Cancelled
                                            </List.Item>
                                            <List.Item>
                                                Subscription Engine Payment Failed
                                            </List.Item>
                                            <List.Item>
                                                Subscription Engine Skipped Order
                                            </List.Item>
                                            <List.Item>
                                                Subscription Engine Payment Success
                                            </List.Item>
                                            <List.Item>
                                                Subscription Engine Payment Failed
                                            </List.Item>
                                        </List>
                                    </FormLayout>
                                </Card.Section>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id="omnisend-integration"
                            title="Omnisend"
                            description="Use email automation flows based on subscriptions"
                        >
                            <Card title="Omnisend" primaryFooterAction={{ content: 'Save', onAction: () => saveCustomerPortalSettings(), loading: isLoading }} >
                                <Card.Section >
                                    <FormLayout>

                                    </FormLayout>
                                </Card.Section>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id="mailchimp-integration"
                            title="Mailchimp"
                            description="Use email automation flows based on subscriptions"
                        >
                            <Card title="Mailchimp" primaryFooterAction={{ content: 'Save', onAction: () => saveCustomerPortalSettings(), loading: isLoading }} >
                                <Card.Section >
                                    <FormLayout>

                                    </FormLayout>
                                </Card.Section>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>

                </Page >
            </div>
            {active && <Toast content={"Setting Update Successfully!"} onDismiss={toggleActive} duration={1000} />}
        </React.Fragment >
    );
}
