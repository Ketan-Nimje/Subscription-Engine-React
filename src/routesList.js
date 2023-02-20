import Dashboard from "./Component/Dashboard/Dashboard";
import New from "./Component/SellingPlan/New";
import Listing from "./Component/SellingPlan/Listing";
import Plans from "./Component/PricingPlan/Plans";
import NewSubscription from "./Component/Subscriptions/NewSubscription";
import SubscriptionDetails from "./Component/Subscriptions/SubscriptionDetails";

import Edit from "./Component/SellingPlan/Edit";
import SubscriptionList from "./Component/Subscriptions/SubscriptionList";
import ShippingProfileListing from "./Component/ShippingProfile/ShippingProfileListing";
import ShippingProfileNew from "./Component/ShippingProfile/ShippingProfileNew";
import ShippingProfileEdit from "./Component/ShippingProfile/ShippingProfileEdit";
import Orders from "./Component/Orders/Orders";

import Settings from "./Component/Settings/Settings";
import GeneralSetting from "./Component/Settings/GeneralSetting";
import CustomerPortal from "./Component/Settings/CustomerPortal";
import SubscriptionLayoutSettings from "./Component/Settings/SubscriptionLayoutSettings";
import LanguageSettings from "./Component/Settings/LanguageSettings";
import IntegrationSetting from "./Component/Settings/IntegrationSetting";
import CancelFeedBack from "./Component/Settings/CancelFeedBack";
import EmailNotification from "./Component/Settings/EmailNotification";
import BulkAutomation from "./Component/Settings/BulkAutomation";
import Analytics from "./Component/Orders/Analytics";

export const baseUrl = '/admin';
const routesList = [
  { path: `${baseUrl}/`, name: 'Dashboard', component: Dashboard, exact: true },
  { path: `${baseUrl}/dashboard`, name: 'Dashboard', component: Dashboard, exact: true },
  { path: `${baseUrl}/pricing-plan`, name: 'PricingPlan', component: Plans, exact: true },
  { path: `${baseUrl}/selling-plan-listing`, name: 'Listing', component: Listing, exact: true },
  { path: `${baseUrl}/selling-plan-new`, name: 'New', component: New, exact: true },
  { path: `${baseUrl}/selling-plan-edit/:id`, name: 'Edit Subscription Plan', component: Edit, exact: true },
  { path: `${baseUrl}/subscription`, name: 'Subscription', component: SubscriptionList, exact: true },
  { path: `${baseUrl}/subscription/:id`, name: 'Subscription Details', component: SubscriptionDetails, exact: true },
  { path: `${baseUrl}/new-subscription`, name: 'New Subscription', component: NewSubscription, exact: true },
  { path: `${baseUrl}/settings`, name: 'Settings', component: Settings, exact: true },
  { path: `${baseUrl}/subscription-layout-setting`, name: 'Subscription Layput Settings', component: SubscriptionLayoutSettings, exact: true },
  { path: `${baseUrl}/general-setting`, name: 'General Setting', component: GeneralSetting, exact: true },
  { path: `${baseUrl}/customer-portal`, name: 'Custome Portal', component: CustomerPortal, exact: true },
  { path: `${baseUrl}/integration-setting`, name: 'Integrations Settings', component: IntegrationSetting, exact: true },
  { path: `${baseUrl}/language`, name: 'Language', component: LanguageSettings, exact: true },
  { path: `${baseUrl}/cancel-feedback`, name: 'Language', component: CancelFeedBack, exact: true },
  { path: `${baseUrl}/email-notification`, name: 'Email Notifications', component: EmailNotification, exact: true },
  { path: `${baseUrl}/bulk-automation`, name: 'Bulk Automations', component: BulkAutomation, exact: true },
  { path: `${baseUrl}/analytics`, name: 'Bulk Automations', component: Analytics, exact: true },
  { path: `${baseUrl}/shipping`, name: 'Shipping Profile', component: ShippingProfileListing, exact: true },
  { path: `${baseUrl}/shipping-profile-new`, name: 'Shipping Profile New', component: ShippingProfileNew, exact: true },
  { path: `${baseUrl}/shipping-profile-edit/:id`, name: 'Shipping Profile Edit', component: ShippingProfileEdit, exact: true },
  { path: `${baseUrl}/orders`, name: 'Orders', component: Orders, exact: true },
];
export default routesList;
export const apiKey = '5a239888c8ec9280a7d8ec823cc2743f';
export const urlParams = new URLSearchParams(window.location.search);




