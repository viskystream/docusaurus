import React, { ReactNode, useEffect } from 'react';
import { useGetUserProfile } from '../../oidc';
import { useGetPublicConfigQuery } from '../../api/endpoints/getConfigValues';
import mixpanel from '../../mixpanel';

interface MixpanelWrapperProps {
    children: JSX.Element;
  }
  
  function MixpanelWrapper({
    children,
  }: MixpanelWrapperProps) {
    const { sub, family_name, given_name, email } = useGetUserProfile();
    const { data } = useGetPublicConfigQuery();
    const isNFDashboard = data?.keycloakUrl.includes('nativeframe-dashboard');
    useEffect(() => {
      if (isNFDashboard && data?.mixpanelProjectToken) {
        mixpanel.init(data.mixpanelProjectToken);
        console.log('Mixpanel initialized');
        if (sub) {
            mixpanel.indentify(sub);
            mixpanel.setUserInfo(email, given_name, family_name);
        }
      }
    }, []);
  
    return children;
  }
  
  export default MixpanelWrapper;