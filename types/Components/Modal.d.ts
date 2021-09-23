import React from 'react';
import PropTypes from 'prop-types';
import { WebViewNavigation } from 'react-native-webview';
declare type PackageProps = {
    visible: boolean;
    authURL: string;
    onClosePress: () => void;
    onWebViewStateChanged: (webViewState: WebViewNavigation) => void;
};
export declare type Props = {
    headerColor?: string;
    textColor?: string;
    closeText?: string;
    renderHeader?: (props: {
        onClose: () => void;
    }) => React.ReactElement;
};
declare function TWLoginModal(props: Props & PackageProps): JSX.Element;
declare namespace TWLoginModal {
    var propTypes: {
        headerColor: PropTypes.Requireable<string>;
        closeText: PropTypes.Requireable<string>;
    };
    var defaultProps: {
        headerColor: string;
        closeText: string;
    };
}
export default TWLoginModal;
