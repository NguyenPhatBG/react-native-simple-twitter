import React from 'react';
import { SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';

/* npm */
import WebView, { WebViewNavigation } from 'react-native-webview';

/* components */
import Header from './Header';

type PackageProps = {
  visible: boolean,
  authURL: string,
  onClosePress: () => void,
  onWebViewStateChanged: (webViewState: WebViewNavigation) => void,
}

export type Props = {
  headerColor?: string,
  textColor?: string,
  closeText?: string,
  renderHeader?: (props: { onClose: () => void }) => React.ReactElement,
}

function TWLoginModal(props: Props & PackageProps) {
  return (
    <Modal isVisible={props.visible} animationIn="slideInUp">
      <SafeAreaView style={{ flex: 1, backgroundColor: props.headerColor }}>
        {props.renderHeader ? props.renderHeader({ onClose: props.onClosePress })
          : <Header textColor={props.textColor} headerColor={props.headerColor} onClose={props.onClosePress} closeText={props.closeText} />}
        <WebView
          originWhitelist={['*']}
          startInLoadingState
          javaScriptEnabledAndroid
          javaScriptEnabled
          source={{ uri: props.authURL }}
          onNavigationStateChange={props.onWebViewStateChanged}
        />
      </SafeAreaView>
    </Modal>
  );
}

TWLoginModal.propTypes = {
  headerColor: PropTypes.string,
  closeText: PropTypes.string,
};

TWLoginModal.defaultProps = {
  headerColor: '#f7f7f7',
  closeText: 'close',
};

export default TWLoginModal;
