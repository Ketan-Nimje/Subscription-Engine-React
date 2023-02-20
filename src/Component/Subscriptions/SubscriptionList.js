import React, { useState, useCallback, useEffect } from 'react';
import { Page, Card, Text, DataTable, ButtonGroup, Button, Icon, Modal, Toast, Tabs, TextField, Badge, Stack, Pagination, Spinner } from '@shopify/polaris';
import { AnalyticsMinor, SearchMajor, HorizontalDotsMinor, PlusMinor, PagePlusMajor, EditMajor, DeleteMajor } from '@shopify/polaris-icons';
import './../../App.css';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Apiservice';

export default function SubscriptionList() {
    const navigation = useNavigate();

    const apiService = new ApiService();
    const [subscriptionContractList, setSubscriptionContractList] = useState([]);
    const [subscriptionContractJSON, setSubscriptionContractJSON] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [active, setActive] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState(false);
    const [selected, setSelected] = useState(0);
    const [pageNo, setPageNo] = useState(0);
    const [search, setSearch] = useState('');

    const handleTabChange = useCallback(
        (selectedTabIndex) => setSelected(selectedTabIndex),
        [],
    );

    const tabs = [
        {
            id: 'all-subscription',
            content: 'All',
            accessibilityLabel: 'All Subscription',
            panelID: 'all-subscription-content-1',
        },
        {
            id: 'active-subscription',
            content: 'Active',
            panelID: 'active-subscription-content-1',
        },
        {
            id: 'pause-subscription-1',
            content: 'Paused',
            panelID: 'pause-subscription-content-1',
        },
        {
            id: 'cancelled-subscription-1',
            content: 'Cancelled',
            panelID: 'cancelled-subscription-content-1',
        },
        {
            id: 'failed-subscription-1',
            content: 'Failed',
            panelID: 'failed-subscription-content-1',
        },
        {
            id: 'expired-subscription-1',
            content: 'Expired',
            panelID: 'expired-subscription-content-1',
        },
    ];
    useEffect(() => {
        setIsLoading(true);

        let delayTimeOutFunction = setTimeout(() => {
            subscriptionListGetMethod()
        }, 500);
        return () => clearTimeout(delayTimeOutFunction);
    }, [selected, search, pageNo]);


    const subscriptionListGetMethod = async () => {

        const payload = {
            pageNo: pageNo,
            search: search,
            limit: 100,
            status: selected === 0 ? 'ALL' : selected === 1 ? "ACTIVE" : selected === 2 ? 'PAUSED' : selected === 3 ? "CANCELLED" : selected === 4 ? 'FAILED' : selected === 5 ? "EXPIRED" : 'ALL'
        };
        const response = await apiService.getSubscriptionContractList(payload);
        if (response.status === true) {
            let rowData = [];
            (response.data || []).map((object) => {
                rowData.push([
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.internal_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.plan_name}</Text>,
                    `${object.planCount} Frequncy`,
                    `${object.productsCount} Products`,
                    <Badge status='success'>Active</Badge>
                ]);
                rowData.push([
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.internal_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.plan_name}</Text>,
                    `${object.planCount} Frequncy`,
                    `${object.productsCount} Products`,
                    <Badge status='attention'>Failed</Badge>
                ]);
                rowData.push([
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.internal_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.plan_name}</Text>,
                    `${object.planCount} Frequncy`,
                    `${object.productsCount} Products`,
                    <Badge status='critical'>Cancelled</Badge>
                ]);
                rowData.push([
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.internal_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.plan_name}</Text>,
                    `${object.planCount} Frequncy`,
                    `${object.productsCount} Products`,
                    <Badge status='new'>Expired</Badge>
                ]);
                rowData.push([
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.internal_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.plan_name}</Text>,
                    `${object.planCount} Frequncy`,
                    `${object.productsCount} Products`,
                    <Badge status='info'>Paused</Badge>
                ]);
                rowData.push([
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.internal_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" >{object.plan_name}</Text>,
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.plan_name}</Text>,
                    `${object.planCount} Frequncy`,
                    `${object.productsCount} Products`,
                    <Badge status='warning'>Active</Badge>
                ]);
            })
            setSubscriptionContractJSON(response.data);
            setSubscriptionContractList(rowData);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }
    const toggleActive = useCallback(() => (setActive((active) => !active), setToastMessage(''), setToastType(false)), []);

    return (
        <Page title="Subscriptions"
            fullWidth
            primaryAction={{ content: 'Create Subscription', onAction: () => navigation(`/admin/new-subscription?${window.urlParams}`) }}
        >
            <Card>
                <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <Card.Section>
                        <TextField
                            type='search'
                            placeholder='Search...'
                            autoFocus
                            labelHidden
                            value={search}
                            onChange={(value) => setSearch(value)}
                            prefix={<Icon source={SearchMajor} />}

                        />
                    </Card.Section>
                    <Card.Section >
                        <div style={{ borderRadius: '8px', border: '1px solid rgb(225 227 229)' }}>
                            <DataTable
                                columnContentTypes={[
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'numeric'
                                ]}
                                headings={[
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Subscription ID</Text>,
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Products</Text>,
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Customer</Text>,
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Created at</Text>,
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Next Billing Date</Text>,
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">From</Text>,
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Type</Text>,
                                    <Text variant="bodyMd" as="span" fontWeight="semibold">status</Text>,
                                ]}
                                rows={isLoading ? [[<Stack alignment="center" vertical><Stack.Item><Spinner /> </Stack.Item></Stack>]] : subscriptionContractList}
                                footerContent={
                                    (subscriptionContractList.length ? <Stack alignment="center">
                                        <Stack.Item fill>
                                            <Pagination
                                                hasPrevious={pageNo > 1 ? true : false}
                                                onPrevious={() => {
                                                    setPageNo(pageNo - 1)
                                                }}
                                                hasNext={subscriptionContractList.length >= 10 ? true : false}
                                                onNext={() => {
                                                    setPageNo(pageNo + 1)
                                                }}
                                            />
                                        </Stack.Item>
                                        <Stack.Item >Page No: {<Button icon={pageNo} />}</Stack.Item>
                                    </Stack> : !isLoading && "No Subscription found")
                                }
                            />
                        </div>
                    </Card.Section>
                </Tabs>


            </Card>

            {active && <Toast content={toastMessage} error={toastType} onDismiss={toggleActive} />}

        </Page >
    );
}
