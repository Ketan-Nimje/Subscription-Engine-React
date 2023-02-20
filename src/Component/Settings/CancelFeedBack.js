import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page, Card, Layout, Checkbox, FormLayout, Toast } from '@shopify/polaris';
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
export default function CancelFeedBack() {
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
                <Page title='Cancellation Flow & Feedbacks' breadcrumbs={[{ content: 'Settings', onAction: () => navigation(`/admin/settings?${window.urlParams}`) }]}>
                    <Layout>
                        <Layout.AnnotatedSection
                            id="klaviyo-integration"
                            title="Klaviyo"
                            description="Use email automation flows based on subscriptions"
                        >
                            <Card title="Klaviyo " primaryFooterAction={{ content: 'Save', onAction: () => saveCustomerPortalSettings(), loading: isLoading }} >
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
