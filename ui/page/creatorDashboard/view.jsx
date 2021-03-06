// @flow
import React from 'react';
import Page from 'component/page';
import Spinner from 'component/spinner';
import Button from 'component/button';
import CreatorAnalytics from 'component/creatorAnalytics';
import ChannelSelector from 'component/channelSelector';
import usePersistedState from 'effects/use-persisted-state';

type Props = {
  channels: Array<ChannelClaim>,
  fetchingChannels: boolean,
  openChannelCreateModal: () => void,
};

export default function CreatorDashboardPage(props: Props) {
  const { channels, fetchingChannels, openChannelCreateModal } = props;
  const [selectedChannelUrl, setSelectedChannelUrl] = usePersistedState('analytics-selected-channel');
  const hasChannels = channels && channels.length > 0;
  const firstChannel = hasChannels && channels[0];
  const firstChannelUrl = firstChannel && (firstChannel.canonical_url || firstChannel.permanent_url); // permanent_url is needed for pending publishes
  const channelFoundForSelectedChannelUrl =
    channels &&
    channels.find(channel => {
      return selectedChannelUrl === channel.canonical_url || selectedChannelUrl === channel.permanent_url;
    });

  React.useEffect(() => {
    // set default channel
    if ((!selectedChannelUrl || !channelFoundForSelectedChannelUrl) && firstChannelUrl) {
      setSelectedChannelUrl(firstChannelUrl);
    }
  }, [setSelectedChannelUrl, selectedChannelUrl, firstChannelUrl, channelFoundForSelectedChannelUrl]);

  return (
    <Page>
      {fetchingChannels && (
        <div className="main--empty">
          <Spinner delayed />
        </div>
      )}

      {!fetchingChannels && (!channels || !channels.length) && (
        <section className="main--empty">
          <div className=" section--small">
            <h2 className="section__title--large">{__("You haven't created a channel yet, let's fix that!")}</h2>
            <div className="section__actions">
              <Button button="primary" onClick={openChannelCreateModal} label={__('Create A Channel')} />
            </div>
          </div>
        </section>
      )}

      {!fetchingChannels && channels && channels.length && (
        <React.Fragment>
          <div className="section">
            <ChannelSelector
              selectedChannelUrl={selectedChannelUrl}
              onChannelSelect={newChannelUrl => {
                setSelectedChannelUrl(newChannelUrl);
              }}
            />
          </div>
          <CreatorAnalytics uri={selectedChannelUrl} />
        </React.Fragment>
      )}
    </Page>
  );
}
