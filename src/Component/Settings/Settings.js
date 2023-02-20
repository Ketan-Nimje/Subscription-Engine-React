import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Card, Layout, ResourceList, Columns, Text, Thumbnail, Heading, DataTable, ButtonGroup, Button, Icon, FormLayout, TextField, Banner, Form, Stack, Select, ChoiceList, ResourceItem, Avatar, Badge
} from '@shopify/polaris';
import {
    CustomerPlusMajor, DnsSettingsMajor, ChannelsMajor, SettingsMajor, TemplateMajor, ManagedStoreMajor, LanguageMinor, ChatMajor, AutomationMajor, NotificationMajor
} from '@shopify/polaris-icons';
import './../../App.css';

export default function Settings() {
    const navigation = useNavigate();

    function renderItem(item) {
        const { id, url, name, media, notes, is_new } = item;

        return <ResourceList.Item id={id} onClick={() => navigation(url)} media={media} accessibilityLabel={`View details for ${name}`}>
            <Stack distribution='trailing' spacing='baseTight'>
                <Stack.Item fill>
                    <h3>
                        <Text variant="bodyMd" as="span" fontWeight="semibold">{name}</Text>
                    </h3>
                </Stack.Item>
                {
                    is_new && <Stack.Item>
                        <Badge status='info'>New</Badge>
                    </Stack.Item>
                }
            </Stack>
            <div style={{ marginTop: '5px' }}>
                <Text variant="bodyMd" as="span" color="subdued">{notes}</Text>
            </div>
        </ResourceList.Item>;
    }
    return (
        <React.Fragment>
            <div className='settings'>
                <Page title="Settings">
                    <Card >
                        <Card.Section>
                            <Columns columns={{ sm: 2, md: 2, lg: 3, xl: 3, xs: 1 }}>
                                <div>
                                    <ResourceList resourceName={{ singular: 'product', plural: 'products' }} items={[{
                                        id: 1,
                                        name: <Text variant="headingMd" as="h2">General Settings</Text>,
                                        url: `/admin/general-setting?${window.urlParams}`,
                                        media: <Thumbnail size="small" source={SettingsMajor} alt="Black orange scarf" />,
                                        notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds ',
                                        is_new: false,
                                    }]}
                                        renderItem={renderItem}
                                    />
                                </div>
                                <div>
                                    <ResourceList resourceName={{ singular: 'product', plural: 'products' }} items={[{
                                        id: 2,
                                        name: <Text variant="headingMd" as="h2">Subscription Layout</Text>,
                                        url: `/admin/subscription-layout-setting?${window.urlParams}`,
                                        media: <Thumbnail size="small" source={TemplateMajor} alt="Black orange scarf" />,
                                        notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds ',
                                        is_new: false,
                                    }]} renderItem={renderItem} />
                                </div>
                                <div>
                                    <ResourceList resourceName={{ singular: 'product', plural: 'products' }}
                                        items={[{
                                            id: 3,
                                            name: <Text variant="headingMd" as="h2">Customer portal settings</Text>,
                                            url: `/admin/customer-portal?${window.urlParams}`,
                                            media: <Thumbnail size="small" source={ManagedStoreMajor} alt="Black orange scarf" />,
                                            notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds ',
                                            is_new: false,
                                        }]}
                                        renderItem={renderItem}
                                    />
                                </div>
                                <div>
                                    <ResourceList resourceName={{ singular: 'product', plural: 'products' }}
                                        items={[{
                                            id: 4,
                                            name: <Text variant="headingMd" as="h2">Language & Translations</Text>,
                                            url: `/admin/language?${window.urlParams}`,
                                            media: <Thumbnail size="small" source={LanguageMinor} alt="Black orange scarf" />,
                                            notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds ',
                                            is_new: false,
                                        }]} renderItem={renderItem}
                                    />
                                </div>
                                <div>
                                    <ResourceList resourceName={{ singular: 'product', plural: 'products' }}
                                        items={[{
                                            id: 5,
                                            name: <Text variant="headingMd" as="h2">Cancel Feedback</Text>,
                                            url: `/admin/cancel-feedback?${window.urlParams}`,
                                            media: <Thumbnail size="small" source={ChatMajor} alt="Black orange scarf" />,
                                            notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds ',
                                            is_new: false,
                                        }]} renderItem={renderItem}
                                    />
                                </div>
                                <div>
                                    <ResourceList resourceName={{ singular: 'notification', plural: 'notification' }} items={[{
                                        id: 6,
                                        name: <Text variant="headingMd" as="h2">Notification</Text>,
                                        url: `/admin/email-notification?${window.urlParams}`,
                                        media: <Thumbnail size="small" source={NotificationMajor} alt="Black orange scarf" />,
                                        notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds',
                                        is_new: false,
                                    }]} renderItem={renderItem}
                                    />
                                </div>
                                <div>
                                    <ResourceList resourceName={{ singular: 'Bulk Automation', plural: 'Bulk Automation' }} items={[{
                                        id: 7,
                                        name: <Text variant="headingMd" as="h2">Bulk Automation</Text>,
                                        url: `/admin/bulk-automation?${window.urlParams}`,
                                        media: <Thumbnail size="small" source={AutomationMajor} alt="Black orange scarf" />,
                                        notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds',
                                        is_new: false,
                                    }]} renderItem={renderItem}
                                    />
                                </div>
                                <div>
                                    <ResourceList resourceName={{ singular: 'Integrations', plural: 'Integrations' }} items={[{
                                        id: 8,
                                        name: <Text variant="headingMd" as="h2">Integrations</Text>,
                                        url: `/admin/integration-setting?${window.urlParams}`,
                                        media: <Thumbnail size="small" source={ChannelsMajor} alt="Black orange scarf" />,
                                        notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds',
                                        is_new: true,
                                    }]} renderItem={renderItem}
                                    />
                                </div>
                                {/* <div>
                                    <ResourceList resourceName={{ singular: 'Customer Segment', plural: 'Customer Segment' }} items={[{
                                        id: 9,
                                        name: <Text variant="headingMd" as="h2">Customer Segment</Text>,
                                        url: `/admin/customer-segment-setting?${window.urlParams}`,
                                        media: <Thumbnail size="small" source={CustomerPlusMajor} alt="Black orange scarf" />,
                                        notes: 'No supplier listed sdsd sd sds sdsdsd sdsdsds',
                                        is_new: false,
                                    }]} renderItem={renderItem}
                                    />
                                </div> */}
                            </Columns>
                        </Card.Section>

                    </Card>
                </Page >
            </div>
        </React.Fragment >
    );
}
