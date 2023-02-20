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
export default function CustomerPortal() {
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
                <Page title='Customer Portal' breadcrumbs={[{ content: 'Settings', onAction: () => navigation(`/admin/settings?${window.urlParams}`) }]}>
                    <Layout>
                        <Layout.AnnotatedSection
                            id="Customer-portal-management"
                            title="Customer Portal Management"
                        >
                            <Card title="Customer Portal Management" primaryFooterAction={{ content: 'Save', onAction: () => saveCustomerPortalSettings(), loading: isLoading }}
                            >
                                <Card.Section>
                                    <FormLayout>
                                        <Checkbox label="Show PAUSE/RESUME button in the customer portal"
                                            helpText="When turned on, customers will be able to pause/resume their subscriptions in the customer portal."
                                            checked={customerPortalObject.allowCustomerToManagePausedResumeSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManagePausedResumeSubscription: !customerPortalObject.allowCustomerToManagePausedResumeSubscription })}
                                        />
                                        <Checkbox label="Show CANCEL button in the customer portal"
                                            helpText="When turned on, customers will be able to cancelled their subscriptions in the customer portal."
                                            checked={customerPortalObject.allowCustomerToManageCancelSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageCancelSubscription: !customerPortalObject.allowCustomerToManageCancelSubscription })}

                                        />
                                        <Checkbox label="Show SKIP button in the customer portal"
                                            helpText="When turned on, customers will be able to skip their subscription in the customer portal."
                                            checked={customerPortalObject.allowCustomerToManageSkipSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageSkipSubscription: !customerPortalObject.allowCustomerToManageSkipSubscription })}

                                        />
                                        <Checkbox label="Allow customers to charge themselves at any time"
                                            helpText="This will show a Place order now button in the customer portal"
                                            checked={customerPortalObject.allowCustomerToManageChargeSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageChargeSubscription: !customerPortalObject.allowCustomerToManageChargeSubscription })}

                                        />
                                        <Checkbox label="Allow customers to change subscription interval"
                                            helpText="Customers will be able to change the subscription interval in the customer portal"
                                            checked={customerPortalObject.allowCustomerToManageIntervalSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageIntervalSubscription: !customerPortalObject.allowCustomerToManageIntervalSubscription })}

                                        />
                                        <Checkbox label="Allow customers to change subscription next billing date"
                                            helpText="Customers will be able to change the subscription next billing date in the customer portal"
                                            checked={customerPortalObject.allowCustomerToManageNextBillingDateSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageNextBillingDateSubscription: !customerPortalObject.allowCustomerToManageNextBillingDateSubscription })}

                                        />
                                        <Checkbox label="Allow customers to enter a discount code"
                                            helpText="Customers will have an option to use a discount code on their subscriptions."
                                            checked={customerPortalObject.allowCustomerToManageDiscountCodeSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageDiscountCodeSubscription: !customerPortalObject.allowCustomerToManageDiscountCodeSubscription })}

                                        />
                                        <Checkbox label="Allow customers to add/remove products from the subscription"
                                            helpText="Customers will be able to remove and add products to the subscription. The shipping cost won't get updated when the customer adds/removes a product from the subscription."
                                            checked={customerPortalObject.allowCustomerToManageAddRemoveProductsSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageAddRemoveProductsSubscription: !customerPortalObject.allowCustomerToManageAddRemoveProductsSubscription })}

                                        />
                                        <Checkbox label="Allow customers to manage min/max no of time recurring order will place"
                                            checked={customerPortalObject.allowCustomerToManageMinMaxSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageMinMaxSubscription: !customerPortalObject.allowCustomerToManageMinMaxSubscription })}

                                        />
                                        <Checkbox label="Allow customers to change shipping address"
                                            checked={customerPortalObject.allowCustomerToManageShippingAddressSubscription}
                                            onChange={() => setCustomerPortalObject({ ...customerPortalObject, allowCustomerToManageShippingAddressSubscription: !customerPortalObject.allowCustomerToManageShippingAddressSubscription })}

                                        />
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
