import React from 'react';
import PropTypes from 'prop-types';
import { ErrorResponse, AccessToken, TwitterUser } from '../types';
declare type Props = {
    type: 'TouchableOpacity' | 'TouchableHighlight' | 'TouchableWithoutFeedback';
    headerColor: string;
    callbackUrl: string;
    closeText: string;
    onPress: (e: any) => void;
    onGetAccessToken: (token: AccessToken) => void;
    onClose: (e: any) => void;
    onSuccess: (user: TwitterUser) => void;
    onError: (e: ErrorResponse) => void;
    renderHeader: (props: any) => React.ReactElement<{}>;
    children: any;
};
declare function TWLoginButton(props: Props): JSX.Element | null;
declare namespace TWLoginButton {
    var propTypes: {
        type: PropTypes.Requireable<string>;
        headerColor: PropTypes.Requireable<string>;
        callbackUrl: PropTypes.Requireable<string>;
        closeText: PropTypes.Requireable<string>;
        onPress: PropTypes.Requireable<(...args: any[]) => any>;
        onGetAccessToken: PropTypes.Requireable<(...args: any[]) => any>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
        onError: PropTypes.Requireable<(...args: any[]) => any>;
        renderHeader: PropTypes.Requireable<(...args: any[]) => any>;
        children: PropTypes.Requireable<PropTypes.ReactElementLike>;
    };
    var defaultProps: {
        type: string;
        headerColor: string;
        callbackUrl: null;
        closeText: string;
        onPress: () => void;
        onGetAccessToken: () => void;
        onClose: () => void;
        onError: () => void;
        renderHeader: null;
        children: null;
    };
}
export default TWLoginButton;
