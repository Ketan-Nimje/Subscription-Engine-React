import React, { useState, useCallback, Fragment } from 'react';
import { Page, Card, Layout, Text, ButtonGroup, Button, FormLayout, TextField, Stack, Select, PageActions, useIndexResourceState, IndexTable, Toast } from '@shopify/polaris';
import {
    AnalyticsMinor, ViewMajor, HorizontalDotsMinor, InfoMinor, QuestionMarkMinor, DeleteMajor, EditMajor
} from '@shopify/polaris-icons';
import './../../App.css';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../Apiservice';
import { ResourcePicker } from "@shopify/app-bridge-react";


const weeks = [
    { label: 'Disabled', value: '0' },
    { label: 'Monday', value: '1' },
    { label: 'Tuesday', value: '2' },
    { label: 'Wednesday', value: '3' },
    { label: 'Thursday', value: '4' },
    { label: 'Friday', value: '5' },
    { label: 'Saturday', value: '6' },
    { label: 'Sunday', value: '7' },
];

let days = [];

for (let i = 0; i <= 31; i++) {
    days.push({ label: ((i == 2 ? `${i}nd of the month` : (((i == 1 || i == 21 || i == 31) ? `${i}st of the day` : ((i == 0) ? 'Disabled' : `${i}th of the day`))))), value: `${i}` });
}

let minOption = [];
let maxOption = [];
for (let i = 0; i <= 360; i++) {
    minOption.push({ label: `${i === 0 ? "Disabled" : i}`, value: `${i === 0 ? "" : i}` });
    maxOption.push({ label: `${i === 0 ? "Unlimited" : i}`, value: `${i === 0 ? "" : i}` });
}
const initialState = {
    plan_name: '',
    internal_name: '',
    plan_selector_name: '',
    products: [],
};
const initialStateError = {
    plan_name: '',
    internal_name: '',
    frequency_name: '',
    products: []

};

const initialStateSellingPlansToCreate = {
    frequency_type: 0,
    frequency_name: 'Deliver Every Month',
    interval: 'MONTH',
    deliveryIntervalCount: '1',
    billingIntervalCount: '1',
    discount_type: '',
    discount_value: "0",
    discount_type2: '',
    discount_value2: "0",
    after_cycle: "0",
    anchor_type: '0',
    anchor_day: "0",
    anchor_month: "1",
    preAnchorBehavior: 'NEXT',
    shopify_id: '',
    cutoff: '0',
    mincycles: "0",
    maxcycles: "0",
    description: 'You can edit, skip, reschedule and cancel subscription anytime.'
};

export default function ShippingProfileNew() {
    const apiService = new ApiService();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [setllingPlan, setSetllingPlan] = useState(initialState);
    const [sellingPlansToCreateObjectIndex, setSellingPlansToCreateObjectIndex] = useState(0);
    const [sellingPlansToCreateObject, setSellingPlansToCreateObject] = useState(initialStateSellingPlansToCreate);
    const [formErrors, setFormErrors] = useState(initialStateError);
    const [sellingPlansToCreateList, setSellingPlansToCreateList] = useState([initialStateSellingPlansToCreate]);
    const [sellingPlansToCreateForm, setSellingPlansToCreateForm] = useState(true);
    const [showAdvancedSetting, setShowAdvancedSetting] = useState(false);
    const [isChooseProducts, setIsChooseProducts] = useState(false);

    const [products, setProducts] = useState([]);
    const [active, setActive] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState(false);

    console.log("sellingPlansToCreateObject", sellingPlansToCreateObject);
    console.log("setSellingPlansToCreateObjectIndex", sellingPlansToCreateObjectIndex);
    console.log("setSellingPlansToCreateList", sellingPlansToCreateList);
    console.log("setSellingPlansToCreateForm", sellingPlansToCreateForm);
    console.log("formErrors", formErrors);
    const onChangeSellingPlan = (event) => {
        const { name, value } = event.target;
        setSetllingPlan({ ...setllingPlan, [name]: value })
        setFormErrors(formErrors => ({
            ...formErrors,
            [name]: formValidate(name, value)
        }));
    }
    const saveSellingPlanToCreate = () => {
        let validationErrors = {};
        Object.keys(sellingPlansToCreateObject).forEach(name => {
            const error = formValidate(name, sellingPlansToCreateObject[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        const clone = [...sellingPlansToCreateList];
        if (!sellingPlansToCreateForm) {
            clone.push(initialStateSellingPlansToCreate);
            setSellingPlansToCreateList(clone);
            setSellingPlansToCreateForm(true);
            setSellingPlansToCreateObject(clone[clone.length - 1]);
            setSellingPlansToCreateObjectIndex(clone.length - 1);
        } else {
            clone[sellingPlansToCreateObjectIndex] = sellingPlansToCreateObject;
            setSellingPlansToCreateList(clone);
            setSellingPlansToCreateObject({});
            setSellingPlansToCreateForm(false);
        }
    }
    const editSellingPlanToCreate = (index) => {
        const clone = [...sellingPlansToCreateList];
        setSellingPlansToCreateObject(clone[index]);
        setSellingPlansToCreateForm(true);
        setSellingPlansToCreateObjectIndex(index);
    }
    const deleteSellingPlanToCreate = (index) => {
        const clone = [...sellingPlansToCreateList];
        clone.splice(index, 1);
        setSellingPlansToCreateList(clone);
    }
    const saveSellingPlanToCreateCancel = () => {
        setSellingPlansToCreateObject({});
        setSellingPlansToCreateForm(false);
    }
    const onChangeSellingPlanToCreate = (event) => {
        const { name, value } = event.target;
        if (event.target.name === "deliveryIntervalCount") {
            const newValue = event.target.value.replace(/[^\d]/, "");
            if (parseInt(newValue) !== 0) {
                if (parseInt(sellingPlansToCreateObject.deliveryIntervalCount) == parseInt(sellingPlansToCreateObject.billingIntervalCount)) {
                    setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: newValue, billingIntervalCount: newValue });
                } else {
                    setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: newValue });
                }
            }
        } else if (event.target.name === "billingIntervalCount") {
            const newValue = event.target.value.replace(/[^\d]/, "");
            if (parseInt(newValue) !== 0 && parseInt(newValue) >= parseInt(sellingPlansToCreateObject.deliveryIntervalCount)) {
                setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: newValue });
            }
        } else if (event.target.name === "discount_type" && (value === "" || value === "0" || value === "none")) {
            setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, discount_value: '0', [name]: value, discount_type2: '', discount_value2: "0", after_cycle: "0" })
        } else if (event.target.name === "interval") {
            setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: value, anchor_day: "0", preAnchorBehavior: "ASAP", cutoff: "0" });
        } else if (event.target.name === "discount_value") {
            setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: value, });
        } else if (event.target.name === "discount_type2") {
            if (value === "" || value === "0" || value === "none") {
                setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: value, discount_value2: "0", after_cycle: "0" });
            } else {
                setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: value, after_cycle: "1" });
            }
        } else {
            setSellingPlansToCreateObject({ ...sellingPlansToCreateObject, [name]: value });
        }
        setFormErrors(formErrors => ({
            ...formErrors,
            [name]: formValidate(name, value)
        }));
    }


    const saveSellingPlans = async () => {
        let validationErrors = {};
        Object.keys(setllingPlan).forEach(name => {
            const error = formValidate(name, setllingPlan[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }
        const payload = {
            internal_name: setllingPlan.internal_name,
            plan_name: setllingPlan.plan_name,
            plan_selector_name: setllingPlan.plan_selector_name,
            products: JSON.stringify(products),
            sellingPlansToCreate: sellingPlansToCreateList,

        };
        // setIsLoading(true);
        const response = await apiService.createSubscriptionPlan(payload);
        if (response.status) {
            setActive(true);
            setToastMessage("Selling plan create successfully!");
            navigation(`/admin/shipping?${window.urlParams}`);

        } else {
            setActive(true);
            setToastMessage(response.message)
            setToastType(true)
        }
    }

    const formValidate = (name, value) => {

        switch (name) {
            case "internal_name":
                if (!value || value.trim() === "") {
                    return "Internal name is required";
                } else {
                    return "";
                }
            case "plan_name":
                if (!value || value.trim() === "") {
                    return "Plan name is required";
                } else {
                    return "";
                }
            case "frequency_name":
                if (!value || value.trim() === "") {
                    return "Frequncy name is required";
                } else {
                    return "";
                }
            case "deliveryIntervalCount":
                if (!value || value.trim() === "") {
                    return "Ship product every must be greater than 0";
                } else if (sellingPlansToCreateObject && sellingPlansToCreateObject.frequency_type == 1 && parseInt(sellingPlansToCreateObject && sellingPlansToCreateObject.billingIntervalCount) < parseInt(value)) {
                    return "Delivery policy interval must be a multiple of billing policy interval.";
                } else {
                    return "";
                }
            case "billingIntervalCount":
                if (!value || value.trim() === "") {
                    if (sellingPlansToCreateObject && sellingPlansToCreateObject.plan_type == 1) {
                        return "Charge every must be greater than 0";
                    }
                } else {
                    return "";
                }
            case "after_cycle":
                if (sellingPlansToCreateObject.discount_type2 != '' && parseInt(value) <= 0) {
                    return "Second After Cycle can not be less than 1.";
                } else {
                    return "";
                }
            default: {
                return "";
            }
        }
    };
    const onCancel = () => {
        setIsChooseProducts(false);
    };
    const onSelectProduct = async (record) => {
        const productsData = [];

        record.selection.map((x, i) => {
            let variantId = [];
            let count = 1;
            (x.options || []).map((z) => {
                count = count * z.values.length
            });
            x.variants.map((y) => {
                const variantObj = {
                    id: y.id,
                    inventoryQuantity: y.inventoryQuantity,
                    price: y.price,
                    title: y.title,
                    compareAtPrice: y.compareAtPrice,
                    inventoryItemId: y.inventoryItem.id,
                    productId: y.product.id,
                    image: y.image ? y.image : '',
                    inventoryPolicy: y.inventoryPolicy,
                    inventoryManagement: y.inventoryManagement
                };
                variantId.push(variantObj)
            });
            let obj = {
                id: x.id,
                handle: x.handle,
                title: x.title,
                prductsTitle: x.title,
                totalInventory: x.totalInventory,
                variantCount: count,
                isAllVariants: count === x.variants.length ? 1 : 0,
                is_all_variant: count === x.variants.length ? 1 : 0,
                // variants: count !== x.variants.length ?  variantId : [],
                variants: variantId
            };
            productsData.push(obj);

        });

        setIsChooseProducts(false);

        setProducts(productsData);
    };
    const toggleActive = useCallback(() => (setActive((active) => !active), setToastMessage(''), setToastType(false)), []);
    const customers = [
        {
            id: '3411',
            url: 'customers/341',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            orders: 20,
            amountSpent: '$2,400',
        },
        {
            id: '2561',
            url: 'customers/256',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            orders: 30,
            amountSpent: '$140',
        },
    ];
    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(customers);

    const rowMarkup = customers.map(
        ({ id, name, location, orders, amountSpent }, index) => (
            <IndexTable.Row
                id={id}
                key={id}
                selected={selectedResources.includes(id)}
                position={index}
            >
                <IndexTable.Cell>
                    <Text variant="bodyMd" fontWeight="bold" as="span">
                        {name}
                    </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{location}</IndexTable.Cell>
                <IndexTable.Cell>{orders}</IndexTable.Cell>
                <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
            </IndexTable.Row>
        ),
    );
    return (
        <React.Fragment>
            <div>
                <Page title="Create Shipping Profile"
                    divider
                    breadcrumbs={[{ content: 'Shipping Profile', onAction: () => navigation(`/admin/shipping?${window.urlParams}`) }]}
                // primaryAction={{ content: "Save", onAction: () => saveSellingPlans() }}
                >

                    <Layout>
                        <Layout.AnnotatedSection
                            id="storeDetails"
                            title="Shipping Profile"
                            description="test."
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <TextField label={"Shipping Profile name"}
                                        onChange={(value) => onChangeSellingPlan({ target: { name: 'internal_name', value: value } })}
                                        autoComplete="off" value={setllingPlan.internal_name} placeholder="Subscribe and save"
                                        error={formErrors.internal_name}
                                    />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id="selling-plan-list"
                            title="Selling Plans"
                            description="Selling plans available for subscription"
                        >
                            <Card title="Selling Plans">
                                <Card.Section >
                                    {
                                        products.length ?
                                            <IndexTable
                                                resourceName={{
                                                    singular: 'Products',
                                                    plural: 'Products',
                                                }}
                                                itemCount={customers.length}
                                                selectedItemsCount={
                                                    allResourcesSelected ? 'All' : selectedResources.length
                                                }
                                                onSelectionChange={handleSelectionChange}
                                                headings={[
                                                    { title: 'Name' },
                                                    { title: 'Location' },
                                                    { title: 'Order count' },
                                                    { title: 'Amount spent' },
                                                ]}
                                            >
                                                {rowMarkup}
                                            </IndexTable>
                                            :
                                            <Stack alignment='center' distribution='center' spacing='loose' >
                                                <Stack.Item><Text variant="headingMd" as="p">No Products are selected,Please select the products.</Text></Stack.Item>
                                            </Stack>
                                    }
                                </Card.Section>
                                <Card.Section>
                                    <Button primary onClick={() => setIsChooseProducts(true)}>Select Products</Button>
                                </Card.Section>



                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <br />
                    <PageActions
                        primaryAction={<ButtonGroup>
                            <Button destructive onClick={() => navigation(`/admin/shipping?${window.urlParams}`)}>Cancel</Button>
                            <Button primary loading={isLoading} disabled={setllingPlan.internal_name == '' || setllingPlan.plan_name == '' || sellingPlansToCreateForm} onClick={() => saveSellingPlans()}>Save</Button>
                        </ButtonGroup>}
                    />
                </Page >
                {active && <Toast content={toastMessage} error={toastType} onDismiss={toggleActive} />}
                {
                    isChooseProducts && <ResourcePicker
                        resourceType={"Product"}
                        showVariants={true}
                        open={isChooseProducts}
                        onSelection={onSelectProduct}
                        initialSelectionIds={products}
                        onCancel={onCancel}
                    />
                }
            </div>
        </React.Fragment >
    );
}
