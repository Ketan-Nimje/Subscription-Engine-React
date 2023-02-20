import React, { useState, useCallback, Fragment, useEffect } from 'react';
import {
    Page,
    Card, Layout, ResourceList, TextStyle, Thumbnail, Text, DataTable, ButtonGroup, Button, Icon, FormLayout, TextField, Banner, Form, Stack, Select, ChoiceList, Tooltip, Columns, List, PageActions, Toast
} from '@shopify/polaris';
import {
    AnalyticsMinor, ViewMajor, HorizontalDotsMinor, InfoMinor, QuestionMarkMinor, DeleteMajor, EditMajor
} from '@shopify/polaris-icons';
import './../../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../Apiservice';


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
    anchor_month: 1,
    preAnchorBehavior: 'NEXT',
    shopify_id: '',
    cutoff: '0',
    mincycles: '',
    maxcycles: '',
    description: 'You can edit, skip, reschedule and cancel subscription anytime.'
};

export default function ShippingProfileEdit() {
    const apiService = new ApiService();
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const [sellingPlan, setSellingPlan] = useState(initialState);
    const [sellingPlansToCreateObjectIndex, setSellingPlansToCreateObjectIndex] = useState(0);
    const [sellingPlansToCreateObject, setSellingPlansToCreateObject] = useState({});
    const [sellingPlansToDelete, setSellingPlansToDelete] = useState([]);
    const [formErrors, setFormErrors] = useState(initialStateError);
    const [sellingPlansToCreateList, setSellingPlansToCreateList] = useState([]);
    const [sellingPlansToCreateForm, setSellingPlansToCreateForm] = useState(false);
    const [showAdvancedSetting, setShowAdvancedSetting] = useState(false);
    const [products, setProducts] = useState([]);
    const [active, setActive] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        getSubscriptionDetails();
    }, [])
    const getSubscriptionDetails = async () => {

        console.log("id", id);

        const response = await apiService.getSellingPlanDetails(id)
        if (response.status) {
            const cloneSellingPlansList = [];
            ((response && response.data && response.data.sellingPlans) || []).map((x) => {
                const obj = {
                    ...x,
                    interval: x.intervals,
                    deliveryIntervalCount: x.deliveryIntervalCount,
                    frequency_type: x.frequency_type,
                    adjustmentOldType: x.type,
                    shopify_id: x.shopify_id,
                    anchor_day: x.anchor_day.toString(),
                    anchor_month: x.anchor_month.toString(),
                    discount_type: x.discount_type.toString(),
                    discount_value: x.discount_value.toString(),
                    after_cycle: x.after_cycle.toString(),
                    discount_type2: x.discount_type2.toString(),
                    discount_value2: x.discount_value2.toString(),
                    shopify_id: x.shopify_id,
                };
                cloneSellingPlansList.push(obj);
            });
            console.log("cloneSellingPlansList", cloneSellingPlansList)
            setSellingPlansToCreateList(cloneSellingPlansList);
            setSellingPlan({
                shopify_id: response.data.sellingPlanGroup.shopify_id,
                internal_name: response.data.sellingPlanGroup.internal_name,
                plan_selector_name: JSON.parse(response.data.sellingPlanGroup.options)[0],
                plan_name: response.data.sellingPlanGroup.plan_name,
            })
        }
    }
    console.log("sellingPlansToCreateObject", sellingPlansToCreateObject);
    console.log("setSellingPlansToCreateObjectIndex", sellingPlansToCreateObjectIndex);
    console.log("setSellingPlansToCreateList", sellingPlansToCreateList);
    console.log("setSellingPlansToCreateForm", sellingPlansToCreateForm);
    console.log("formErrors", formErrors);
    const onChangeSellingPlan = (event) => {
        const { name, value } = event.target;
        setSellingPlan({ ...sellingPlan, [name]: value })
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
        if (clone[index].shopify_id !== '' && !sellingPlansToDelete.includes(parseInt(clone[index].shopify_id))) {
            setSellingPlansToDelete([...sellingPlansToDelete, clone[index].shopify_id]);
        }
        clone.splice(index, 1);
        setSellingPlansToCreateList(clone);
    }
    console.log("sellingPlansToDelete", sellingPlansToDelete);
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
        Object.keys(sellingPlan).forEach(name => {
            const error = formValidate(name, sellingPlan[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }
        const payload = {
            selling_plan_group_id: id,
            shopify_group_id: sellingPlan.shopify_id,
            internal_name: sellingPlan.internal_name,
            plan_name: sellingPlan.plan_name,
            plan_selector_name: sellingPlan.plan_selector_name,
            products: JSON.stringify(products),
            sellingPlansToCreate: sellingPlansToCreateList,
            sellingPlansDelete: sellingPlansToDelete
        };
        // setIsLoading(true);
        const response = await apiService.updateSubscriptionPlan(payload);
        if (response.status) {
            setActive(true);
            setToastMessage("Selling plan update successfully!");
            navigation(`/admin/selling-plan-listing?${window.urlParams}`);

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
                if (!value || value.toString().trim() === "") {
                    return "Ship product every must be greater than 0";
                } else if (sellingPlansToCreateObject && sellingPlansToCreateObject.frequency_type == 1 && parseInt(sellingPlansToCreateObject && sellingPlansToCreateObject.billingIntervalCount) < parseInt(value)) {
                    return "Delivery policy interval must be a multiple of billing policy interval.";
                } else {
                    return "";
                }
            case "billingIntervalCount":
                if (!value || value.toString().trim() === "") {
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
                    return ""
                }

            default: {
                return "";
            }
        }
    };
    const toggleActive = useCallback(() => (setActive((active) => !active), setToastMessage(''), setToastType(false)), []);

    return (
        <React.Fragment>
            <div>
                <Page title="Edit selling plan group"
                    divider
                    breadcrumbs={[{ content: 'Selling Plans', onAction: () => navigation(`/admin/selling-plan-listing?${window.urlParams}`) }]}
                // primaryAction={{ content: "Save", onAction: () => saveSellingPlans() }}
                >

                    <Layout>
                        <Layout.AnnotatedSection
                            id="storeDetails"
                            title="Store details"
                            description="Add the internal name of the group that uses to identify it in the admin & add the plan name of the group that is displayed on the product page."
                        >
                            <Card sectioned>
                                <FormLayout>
                                    <TextField label={"Internal name"}
                                        onChange={(value) => onChangeSellingPlan({ target: { name: 'internal_name', value: value } })}
                                        autoComplete="off" value={sellingPlan.internal_name} placeholder="Subscribe and save"
                                        error={formErrors.internal_name}
                                    />
                                    <TextField label="Plan Name"
                                        onChange={(value) => onChangeSellingPlan({ target: { name: 'plan_name', value: value } })}
                                        error={formErrors.plan_name}
                                        autoComplete="off" value={sellingPlan.plan_name} placeholder="Subscribe and save"
                                    />
                                    <TextField label="Plan selector title" onChange={(value) => setSellingPlan({ ...sellingPlan, plan_selector_name: value })} autoComplete="off" value={sellingPlan.plan_selector_name} placeholder="Deliver every" />
                                </FormLayout>
                            </Card>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id="Selling-Plan-Frequency"
                            title="Selling Plan Frequency"
                            description="Add the internal name of the group that uses to identify it in the admin & add the plan name of the group that is displayed on the product page."
                        >
                            <React.Fragment>
                                <FormLayout>
                                    {
                                        (sellingPlansToCreateList || []).map((object, index) => {
                                            return (
                                                <React.Fragment>
                                                    {
                                                        index == sellingPlansToCreateObjectIndex && sellingPlansToCreateForm ?
                                                            <Card key={index.toString()}>
                                                                <Card.Section>
                                                                    <FormLayout>
                                                                        <Stack>
                                                                            <Stack.Item fill>
                                                                                <Stack alignment='center'>
                                                                                    <Stack.Item>Frequency Type:</Stack.Item>
                                                                                    <Stack.Item>
                                                                                        <Select
                                                                                            options={[
                                                                                                { label: 'Pay as you go', value: 0 },
                                                                                                { label: 'Prepaid', value: 1 },
                                                                                            ]}
                                                                                            onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "frequency_type", value: value } })}
                                                                                            value={parseInt(sellingPlansToCreateObject.frequency_type)}
                                                                                        />
                                                                                    </Stack.Item>
                                                                                </Stack>
                                                                            </Stack.Item>
                                                                            <Stack.Item>
                                                                                <ButtonGroup>
                                                                                    <Button primary onClick={() => saveSellingPlanToCreate()}>
                                                                                        Save
                                                                                    </Button>
                                                                                    {sellingPlansToCreateList.length > 1 && <Button destructive onClick={() => saveSellingPlanToCreateCancel()}>Cancel</Button>}
                                                                                </ButtonGroup>
                                                                            </Stack.Item>
                                                                        </Stack>
                                                                        <TextField label={"Frequency Name"}
                                                                            value={sellingPlansToCreateObject.frequency_name}
                                                                            onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "frequency_name", value: value } })}
                                                                            autoComplete="off"
                                                                            placeholder='Deliver Every Month'
                                                                            error={formErrors?.frequency_name}
                                                                        />
                                                                        <FormLayout.Group condensed>
                                                                            <TextField label="Deliver every" type='number'
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "deliveryIntervalCount", value: value } })}
                                                                                autoComplete="off" suffix={sellingPlansToCreateObject.interval.toUpperCase()} value={sellingPlansToCreateObject.deliveryIntervalCount} />
                                                                            {sellingPlansToCreateObject.frequency_type == 1 && <TextField label="Bill every" type='number'
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "billingIntervalCount", value: value } })}
                                                                                autoComplete="off" suffix={sellingPlansToCreateObject.interval.toUpperCase()} value={sellingPlansToCreateObject.billingIntervalCount} />
                                                                            }
                                                                            <Select
                                                                                label={'Interval'}
                                                                                options={[
                                                                                    { label: 'DAY', value: 'DAY' },
                                                                                    { label: 'WEEK', value: 'WEEK' },
                                                                                    { label: 'MONTH', value: 'MONTH' },
                                                                                    { label: 'YEAR', value: 'YEAR' },
                                                                                ]}
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "interval", value: value } })}

                                                                                value={sellingPlansToCreateObject.interval}
                                                                            />
                                                                        </FormLayout.Group>
                                                                    </FormLayout>
                                                                </Card.Section>
                                                                <Card.Section>
                                                                    <FormLayout>
                                                                        <Stack vertical={true} spacing='extraTight'>
                                                                            <Stack.Item >
                                                                                <Text variant="headingMd" as="h2">Want to set order date?</Text>
                                                                            </Stack.Item>
                                                                        </Stack>
                                                                        <FormLayout.Group condensed >
                                                                            <Select
                                                                                label={'Anchor day'}
                                                                                disabled={sellingPlansToCreateObject.interval == 'DAY'}
                                                                                value={sellingPlansToCreateObject.anchor_day}
                                                                                options={sellingPlansToCreateObject.interval == 'WEEK' ? weeks : days}
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "anchor_day", value: value } })}

                                                                            />
                                                                            {sellingPlansToCreateObject.interval == "YEAR" && <Select
                                                                                label={'Anchor MONTH'}
                                                                                disabled={parseInt(sellingPlansToCreateObject.anchor_day) == 0}
                                                                                value={sellingPlansToCreateObject.anchor_month}
                                                                                options={[
                                                                                    { label: "January", value: "1" },
                                                                                    { label: "February", value: "2" },
                                                                                    { label: "March", value: "3" },
                                                                                    { label: "April", value: "4" },
                                                                                    { label: "May", value: "5" },
                                                                                    { label: "June", value: "6" },
                                                                                    { label: "July", value: "7" },
                                                                                    { label: "August", value: "8" },
                                                                                    { label: "September", value: "9" },
                                                                                    { label: "October", value: "10" },
                                                                                    { label: "November", value: "11" },
                                                                                    { label: "December", value: "12" },
                                                                                ]}
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "anchor_month", value: value } })}

                                                                            />}
                                                                            <Select
                                                                                label={"First Delivery"}
                                                                                value={sellingPlansToCreateObject.preAnchorBehavior}
                                                                                disabled={parseInt(sellingPlansToCreateObject.anchor_day) == 0}
                                                                                options={[
                                                                                    { label: 'On Checkout', value: 'ASAP' },
                                                                                    { label: 'On anchor', value: 'NEXT' },
                                                                                ]}
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "preAnchorBehavior", value: value } })}

                                                                            />
                                                                            <TextField label="Cutt off (in Days)"
                                                                                disabled={parseInt(sellingPlansToCreateObject.anchor_day) == 0}
                                                                                type='number' onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "cutoff", value: value } })}
                                                                                value={sellingPlansToCreateObject.cutoff} autoComplete="off" />
                                                                        </FormLayout.Group>
                                                                    </FormLayout>
                                                                </Card.Section>
                                                                <Card.Section>
                                                                    <FormLayout>
                                                                        <FormLayout.Group >
                                                                            <Select
                                                                                label={'Discount Type'}
                                                                                options={[
                                                                                    { label: 'None', value: '' },
                                                                                    { label: 'Fixed amount discount', value: 'FIXED_AMOUNT' },
                                                                                    { label: 'Percentage discount', value: 'PERCENTAGE' },
                                                                                    { label: 'Manual Price', value: 'PRICE' },
                                                                                ]}
                                                                                value={sellingPlansToCreateObject.discount_type}
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "discount_type", value: value } })}

                                                                            />
                                                                            <TextField label="Discount Value"
                                                                                disabled={sellingPlansToCreateObject.discount_type == '' || sellingPlansToCreateObject.discount_type == 'null'}
                                                                                type='number'
                                                                                value={sellingPlansToCreateObject.discount_value}
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "discount_value", value: value } })} autoComplete="off" />
                                                                        </FormLayout.Group>

                                                                        <Text variant="headingMd" as="h2">Discount after cycles</Text>

                                                                        <FormLayout.Group>
                                                                            <Select
                                                                                label={'Discount Type'}
                                                                                disabled={sellingPlansToCreateObject.discount_type == '' || sellingPlansToCreateObject.discount_type == 'null'}
                                                                                options={[
                                                                                    { label: 'None', value: '' },
                                                                                    { label: 'Fixed amount discount', value: 'FIXED_AMOUNT' },
                                                                                    { label: 'Percentage discount', value: 'PERCENTAGE' },
                                                                                    { label: 'Manual Price', value: 'PRICE' },
                                                                                ]}
                                                                                value={sellingPlansToCreateObject.discount_type2}
                                                                                onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "discount_type2", value: value } })}

                                                                            />
                                                                            <FormLayout>
                                                                                <FormLayout.Group condensed>
                                                                                    <TextField label="Discount Value"
                                                                                        disabled={sellingPlansToCreateObject.discount_type == '' || sellingPlansToCreateObject.discount_type == 'null'}
                                                                                        type='number' value={sellingPlansToCreateObject.discount_value2}
                                                                                        onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "discount_value2", value: value } })}
                                                                                        autoComplete="off" />
                                                                                    <TextField label="After cycle"
                                                                                        disabled={sellingPlansToCreateObject.discount_type == '' || sellingPlansToCreateObject.discount_type == 'null'}
                                                                                        type='number' min={1} onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "after_cycle", value: value } })} value={sellingPlansToCreateObject.after_cycle} autoComplete="off" />
                                                                                </FormLayout.Group>
                                                                            </FormLayout>
                                                                        </FormLayout.Group>
                                                                    </FormLayout>
                                                                </Card.Section>
                                                                <Card.Section>
                                                                    <FormLayout>
                                                                        <Button plain onClick={() => setShowAdvancedSetting(!showAdvancedSetting)} >{showAdvancedSetting ? "Hide advanced settings" : "Show advanced settings"}</Button>
                                                                        {showAdvancedSetting &&

                                                                            <FormLayout.Group condensed>
                                                                                <Select
                                                                                    label="Minimum Number of Orders"
                                                                                    options={minOption}
                                                                                    value={sellingPlansToCreateObject.mincycles}
                                                                                    onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "mincycles", value: value } })}

                                                                                />
                                                                                <Select
                                                                                    label="Maximum Number of Orders"
                                                                                    options={maxOption}
                                                                                    value={sellingPlansToCreateObject.maxcycles}
                                                                                    onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "maxcycles", value: value } })}
                                                                                />
                                                                                <Select
                                                                                    label="Inventory Policy"
                                                                                    options={maxOption}
                                                                                    value={sellingPlansToCreateObject.maxcycles}
                                                                                    onChange={(value) => onChangeSellingPlanToCreate({ target: { name: "maxcycles", value: value } })}
                                                                                />
                                                                            </FormLayout.Group>
                                                                        }
                                                                    </FormLayout>
                                                                </Card.Section>
                                                            </Card>
                                                            :
                                                            <Card key={index.toString()}>
                                                                <Card.Section>
                                                                    <Stack distribution='equalSpacing'>
                                                                        <Stack.Item>
                                                                            <Stack vertical spacing='extraTight'>
                                                                                <Stack.Item>
                                                                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Frequency Name : </Text><Text variant="bodyMd" as="span" color="subdued">{object.frequency_name}</Text>
                                                                                </Stack.Item>
                                                                                <Stack.Item>
                                                                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Frequency Internal : </Text><Text variant="bodyMd" as="span" color="subdued">{object.interval.charAt(0).toUpperCase() + object.interval.slice(1).toLowerCase()}</Text>
                                                                                </Stack.Item>
                                                                                <Stack.Item>
                                                                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Frequency Type : </Text><Text variant="bodyMd" as="span" color="subdued">{object.frequency_type == 0 ? "Pay As You Go" : "Prepaid"}</Text>
                                                                                </Stack.Item>
                                                                                <Stack.Item>
                                                                                    <Text variant="bodyMd" as="span" fontWeight="semibold">Discount : </Text><Text variant="bodyMd" as="span" color="subdued">{object.discount_type == 'PERCENTAGE' ? `${object.discount_value}%` : object.discount_type == 'FIXED_AMOUNT' ? `${object.discount_value} INR` : ' - '}</Text>
                                                                                </Stack.Item>
                                                                            </Stack>
                                                                        </Stack.Item>
                                                                        <Stack.Item>
                                                                            <ButtonGroup>
                                                                                <Button icon={EditMajor} onClick={() => editSellingPlanToCreate(index)}></Button>
                                                                                {sellingPlansToCreateList.length > 1 && <Button icon={DeleteMajor} onClick={() => deleteSellingPlanToCreate(index)}></Button>}
                                                                            </ButtonGroup>
                                                                        </Stack.Item>
                                                                    </Stack>
                                                                </Card.Section>
                                                            </Card>
                                                    }
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    {!sellingPlansToCreateForm && <Button primary onClick={() => saveSellingPlanToCreate()}>Add New Frequency</Button>}
                                </FormLayout>
                            </React.Fragment>
                        </Layout.AnnotatedSection>
                        <Layout.AnnotatedSection
                            id="Products"
                            title="Product & Collections"
                            description="Products available for subscription"
                        >
                            <Card title="Products for subscription">
                                <Card.Section >
                                    <Stack alignment='center' distribution='center' spacing='loose' >
                                        <Stack.Item><Text variant="headingMd" as="p">No Products are selected,Please select the products.</Text></Stack.Item>
                                    </Stack>
                                </Card.Section>
                                <Card.Section>
                                    <Button primary>Select Products</Button>
                                </Card.Section>
                            </Card>
                        </Layout.AnnotatedSection>
                    </Layout>
                    <br />
                    <PageActions
                        primaryAction={<ButtonGroup>
                            <Button destructive onClick={() => navigation(`/admin/selling-plan-listing?${window.urlParams}`)}>Cancel</Button>
                            <Button primary loading={isLoading} disabled={sellingPlan.internal_name == '' || sellingPlan.plan_name == '' || sellingPlansToCreateForm} onClick={() => saveSellingPlans()}>Save</Button>
                        </ButtonGroup>}
                    />
                </Page >
                {active && <Toast content={toastMessage} error={toastType} onDismiss={toggleActive} />}
            </div>
        </React.Fragment >
    );
}
