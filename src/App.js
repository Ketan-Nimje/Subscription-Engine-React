import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';

import { Frame, Navigation, TopBar, FooterHelp, Link, Badge } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';

import { ShipmentMajor, CustomersMajor, SettingsMajor, HomeMajor, OrdersMajor, PlanMajor, AnalyticsMajor, BillingStatementDollarMajor } from '@shopify/polaris-icons';
import routesList, { apiKey } from "./routesList";
import ApiService from './Apiservice';
import './App.css';

export default function FrameExample() {

  const apiService = new ApiService();
  window.urlParams = new URLSearchParams(window.location.search);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    installApp();
  }, []);

  const installApp = async () => {
    const payload = {
      shop: window.urlParams.get('shop')
    }
    const data = await apiService.getDetails(payload);

    if (data.status) {
      if (data && data.install_url) {
        window.open(data.install_url, '_top');
      } else {
        window.app_plan_type = data.data.app_plan_type
        window.is_new_plan = data.data.is_new_plan

        if (window.self !== window.top) {
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    } else {
      if (data && data.install_url) {
        window.open(data.install_url, '_top');
      } else {
        setIsLoading(false);
      }
    }
  }


  const navigation = useNavigate();
  const location = useLocation();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive,
      ),
    [],
  );
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const onNavigate = (urls) => {
    // var params = Object.fromEntries(window.urlParams)
    // if (params && params.id && params && params.customer_id) {
    //   ['id', 'customer_id'].forEach((x) => { return delete params[x] })
    // }

    navigation(`${urls}?${window.urlParams}`)
  }

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Dashboard',
            icon: HomeMajor,
            selected: location.pathname == '/admin/dashboard',
            onClick: () => onNavigate(`/admin/dashboard`),
          },
          {
            label: 'Selling Plans',
            icon: PlanMajor,
            selected: location.pathname == '/admin/selling-plan-listing',
            onClick: () => onNavigate(`/admin/selling-plan-listing`),
          },
          {
            label: 'Subscriptions',
            icon: CustomersMajor,
            selected: location.pathname == '/admin/subscription',
            onClick: () => onNavigate(`/admin/subscription`),
          },
          // {
          //   label: 'Orders',
          //   icon: OrdersMajor,
          //   selected: location.pathname == '/admin/orders',
          //   onClick: () => onNavigate(`/admin/orders`),
          // },
          // {
          //   label: 'Shipping Profile',
          //   icon: ShipmentMajor,
          //   selected: location.pathname == '/admin/shipping',
          //   onClick: () => onNavigate(`/admin/shipping`),
          // },
          // {

          //   label: 'Analytics',
          //   icon: AnalyticsMajor,
          //   selected: location.pathname == '/admin/analytics',
          //   onClick: () => onNavigate(`/admin/analytics`),
          // },
          {
            label: 'Settings',
            icon: SettingsMajor,
            badge: <Badge status='info'>New</Badge>,
            selected: location.pathname == '/admin/settings',
            onClick: () => onNavigate(`/admin/settings`),
          },
          // {
          //   label: 'Pricing Plan',
          //   icon: BillingStatementDollarMajor,
          //   selected: location.pathname == '/admin/pricing-plan',
          //   onClick: () => onNavigate(`/admin/pricing-plan`)
          // },
        ]}
      />
    </Navigation>
  );

  let config;

  if (window.urlParams?.get('host')) {
    config = {
      apiKey: apiKey,
      host: window.urlParams?.get('host'),
      forceRedirect: false
    };
  } else {
    config = { apiKey: apiKey, shopOrigin: window.urlParams?.get('shop'), forceRedirect: false };
  }
  return (
    <div style={{ height: '500px' }}>
      <Provider config={config}>

        <Frame
          logo={{
            width: 124,
            test: "te",
            topBarSource: 'https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999',
            accessibilityLabel: 'Subscription Engine',
          }}
          showNavigationToggle={true}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
          topBar={topBarMarkup}
          navigation={navigationMarkup}
        >
          <React.Fragment>
            <Routes>
              {routesList.map((route, index) => {
                return route.component ? (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <React.Fragment>
                        {/* <Helmet>
                          <title>Post Purchase Upsell</title>
                        </Helmet> */}
                        {/* <RoutePropagator /> */}
                        <route.component />
                      </React.Fragment>
                    }
                  />
                ) : null
              })}
              <Route path="/" element={<Navigate to="/admin/dashboard" replace="/admin/" />} />
            </Routes>
          </React.Fragment>
        </Frame>
      </Provider>
    </div>
  );
}
