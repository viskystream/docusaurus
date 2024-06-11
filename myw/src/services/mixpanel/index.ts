/* eslint-disable max-len */
import mixpanel from 'mixpanel-browser';

type EventName = 'Session Start' | 'View Configs' | 'Login';

interface User {
  projectKey?: string;
  companyName?: string;
}

interface EventTrackProps {
  event: EventName;

}

class WrappedMixpanelClient {
  /** Allows direct use of the mixpanel api */
  private readonly api: typeof mixpanel;
  private initialized: boolean;

  constructor() {
    this.api = mixpanel;
    this.initialized = false;
  }

  public init(mixpanelProjectToken: string) {
    if (this.initialized) return;
    this.api.init(mixpanelProjectToken, {
      track_pageview: 'url-with-path',
    });
    this.initialized = true;
  }

  public trackEvent({ event, ...others }:EventTrackProps) {
    if (!this.initialized) return;
    this.api.track(event, { ...others });
  }

  public register(props: User) {
    if (!this.initialized) return;
    this.api.register(props);
  }

  public getDistinctId() {
    if (!this.initialized) return '';
    return this.api.get_distinct_id();
  }

  // KeyCloak userId (sub)
  public indentify(kcId: string) {
    if (!this.initialized) return;
    this.api.identify(kcId);
  }

  public setUserInfo(email: string = "", given: string = "", family: string = "") {
    if (!this.initialized) return;
    this.api.people.set({
      $email: email,
      $first_name: given,
      $last_name: family,
    });
  };
}

/**
 * Wraps the mixpanel api to provide app-specific typing to event and user properties
 * with some custom methods.
 */
const client = new WrappedMixpanelClient();

export default client;
