import React, { useState, useCallback, useEffect } from 'react';
import { Page, Card, Text, DataTable, ButtonGroup, Button, Icon, Modal, Toast, Stack, Spinner } from '@shopify/polaris';
import { AnalyticsMinor, ViewMajor, HorizontalDotsMinor, PlusMinor, PagePlusMajor, EditMajor, DeleteMajor } from '@shopify/polaris-icons';
import './../../App.css';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Apiservice';

export default function Listing() {
    const navigation = useNavigate();

    const apiService = new ApiService();
    const [sellingPlanGroupList, setSellingPlanGroupList] = useState([]);
    const [sellingPlanGroupListJSON, setSellingPlanGroupListJSON] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModelShow, setDeleteModelShow] = useState(false);
    const [deleteSubscriptionObject, setDeleteSubscriptionObject] = useState(0);
    const [active, setActive] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState(false);

    useEffect(() => {
        subscriptionListGetMethod()
    }, []);

    const onClickDelete = (object) => {
        setDeleteModelShow(true);
        setDeleteSubscriptionObject(object)
    }
    const onClickDeleteModelAction = async () => {
        const payload = {
            selling_plan_group_id: deleteSubscriptionObject.selling_plan_group_id,
            shopify_id: deleteSubscriptionObject.shopify_id
        };
        const response = await apiService.deleteSellingPlan(payload);
        if (response.status === true) {
            subscriptionListGetMethod();
            setDeleteSubscriptionObject({});
            setDeleteModelShow(true);
            setActive(true);
            setToastMessage(response.message)
        } else {
            setActive(true);
            setToastMessage(response.message)
            setToastType(true);
        }
        setDeleteModelShow(false)
    }
    const onClickCloseModelAction = () => {
        setDeleteModelShow(false)
        setDeleteSubscriptionObject({})

    }
    const subscriptionListGetMethod = async () => {
        const payload = {
            limit: 100,
        };
        const response = await apiService.getSellingPlanList(payload);
        if (response.status === true) {
            let rowData = [];
            (response.data || []).map((object) => {
                rowData.push([
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.internal_name}</Text>,
                    <Text variant="bodyMd" as="span" fontWeight="semibold">{object.plan_name}</Text>,
                    `${object.planCount} Frequncy`,
                    `${object.productsCount} Products`,
                    <React.Fragment>
                        <ButtonGroup segmented spacing="tight">
                            <Button size='slim' icon={AnalyticsMinor}></Button>
                            <Button size='slim' onClick={() => navigation(`/admin/selling-plan-edit/${object.selling_plan_group_id}?${window.urlParams}`)} icon={EditMajor}></Button>
                            <Button size='slim' onClick={() => onClickDelete(object)} icon={DeleteMajor}></Button>
                        </ButtonGroup>
                    </React.Fragment>
                ]);
            })
            setSellingPlanGroupListJSON(response.data);
            setSellingPlanGroupList(rowData);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }
    const toggleActive = useCallback(() => (setActive((active) => !active), setToastMessage(''), setToastType(false)), []);

    return (
        <Page title="Selling plans"
            primaryAction={{ content: 'Create', onAction: () => navigation(`/admin/selling-plan-new?${window.urlParams}`) }}
        >
            <Card>
                <Card.Section >
                    <div style={{ borderRadius: '8px', border: '1px solid rgb(225 227 229)' }}>
                        <DataTable
                            columnContentTypes={[
                                'text',
                                'text',
                                'text',
                                'text',
                                'text'
                            ]}
                            headings={[
                                <Text variant="bodyMd" as="span" fontWeight="semibold">Internal Name</Text>,
                                <Text variant="bodyMd" as="span" fontWeight="semibold">Plan Name</Text>,
                                <Text variant="bodyMd" as="span" fontWeight="semibold">Frequency</Text>,
                                <Text variant="bodyMd" as="span" fontWeight="semibold">Products</Text>,
                                <Text variant="bodyMd" as="span" fontWeight="semibold">Action</Text>,
                            ]}
                            rows={isLoading ? [[<div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Stack alignment="center" vertical><Stack.Item><Spinner /> </Stack.Item></Stack></div>]] : sellingPlanGroupList}
                            footerContent={
                                (sellingPlanGroupList.length <= 0 && !isLoading && <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No Data found</div>)
                            }
                        />
                    </div>
                </Card.Section>
            </Card>
            {deleteModelShow && <Modal
                open={deleteModelShow}
                onClose={onClickCloseModelAction}
                title="Are you sure?"
                primaryAction={{
                    content: 'Delete',
                    onAction: onClickDeleteModelAction,
                    destructive: true
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: onClickCloseModelAction,
                    },
                ]}
            >
                <Modal.Section>
                    <p>
                        Are you sure want to delete this plan?
                    </p>
                </Modal.Section>
            </Modal>}
            {active && <Toast content={toastMessage} error={toastType} onDismiss={toggleActive} />}

        </Page >
    );
}
