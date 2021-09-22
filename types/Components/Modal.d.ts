import React from 'react';
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
    var defaultProps: {
        headerColor: string;
        closeText: string;
        renderHeader: null;
    };
}
export default TWLoginModal;
