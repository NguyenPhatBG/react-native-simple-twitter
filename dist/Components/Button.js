import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, SafeAreaView, } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import Header from './Header';
import twitter from '../client';
function TWLoginButton(props) {
    const [isVisible, setVisible] = useState(false);
    const [authURL, setAuthURL] = useState('');
    const [token, setToken] = useState({
        oauth_token: '',
        oauth_token_secret: '',
    });
    let Component;
    switch (props.type) {
        case 'TouchableOpacity':
            Component = TouchableOpacity;
            break;
        case 'TouchableHighlight':
            Component = TouchableHighlight;
            break;
        case 'TouchableWithoutFeedback':
            Component = TouchableWithoutFeedback;
            break;
        default:
            console.warn('TWLoginButton type must be TouchableOpacity or TouchableHighlight or TouchableWithoutFeedback');
            return null;
    }
    const onButtonPress = async (e) => {
        await props.onPress(e);
        try {
            const loginURL = await twitter.getLoginUrl(props.callbackUrl);
            setAuthURL(loginURL);
        }
        catch (err) {
            console.warn(`[getLoginUrl failed] ${err}`);
        }
    };
    const onClosePress = (e) => {
        setVisible(false);
        props.onClose(e);
    };
    const onNavigationStateChange = async (webViewState) => {
        const match = webViewState.url.match(/\?oauth_token=.+&oauth_verifier=(.+)/);
        if (match && match.length > 0) {
            setVisible(false);
            try {
                const response = await twitter.getAccessToken(match[1]);
                setToken(response);
            }
            catch (err) {
                console.warn(`[getAccessToken failed] ${err}`);
                props.onError(err);
            }
        }
    };
    useEffect(() => {
        if (authURL !== '') {
            setVisible(true);
        }
    }, [authURL]);
    useEffect(() => {
        if (!isVisible) {
            setAuthURL('');
        }
    }, [isVisible]);
    useEffect(() => {
        if (token && token.oauth_token && token.oauth_token_secret) {
            props.onGetAccessToken(token);
            const options = {
                include_entities: false,
                skip_status: true,
                include_email: true,
            };
            twitter
                .api('GET', 'account/verify_credentials.json', options)
                .then((response) => {
                props.onSuccess(response);
            })
                .catch((err) => {
                props.onError(err);
            });
        }
    }, [token]);
    return (<Component {...props} onPress={onButtonPress}>
      {props.children}
      <Modal isVisible={isVisible} animationIn="fadeIn">
        <SafeAreaView style={{ flex: 1, backgroundColor: props.headerColor }}>
          {props.renderHeader ? (props.renderHeader({ onClose: onClosePress })) : (<Header headerColor={props.headerColor} onClose={onClosePress} closeText={props.closeText}/>)}
          <WebView source={{ uri: authURL }} onNavigationStateChange={onNavigationStateChange}/>
        </SafeAreaView>
      </Modal>
    </Component>);
}
TWLoginButton.propTypes = {
    type: PropTypes.string,
    headerColor: PropTypes.string,
    callbackUrl: PropTypes.string,
    closeText: PropTypes.string,
    onPress: PropTypes.func,
    onGetAccessToken: PropTypes.func,
    onClose: PropTypes.func,
    onError: PropTypes.func,
    renderHeader: PropTypes.func,
    children: PropTypes.element,
};
TWLoginButton.defaultProps = {
    type: 'TouchableOpacity',
    headerColor: '#f7f7f7',
    callbackUrl: null,
    closeText: 'close',
    onPress: () => { },
    onGetAccessToken: () => { },
    onClose: () => { },
    onError: () => { },
    renderHeader: null,
    children: null,
};
export default TWLoginButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbXBvbmVudHMvQnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDbkQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsd0JBQXdCLEVBQ3hCLFlBQVksR0FDYixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSxZQUFZLENBQUM7QUFDbkMsT0FBTyxLQUFLLE1BQU0sb0JBQW9CLENBQUM7QUFHdkMsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFHM0MsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBRzlCLE9BQU8sT0FBTyxNQUFNLFdBQVcsQ0FBQztBQWtCaEMsU0FBUyxhQUFhLENBQUMsS0FBWTtJQUNqQyxNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBVSxLQUFLLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBUyxFQUFFLENBQUMsQ0FBQztJQUNuRCxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBYztRQUM5QyxXQUFXLEVBQUUsRUFBRTtRQUNmLGtCQUFrQixFQUFFLEVBQUU7S0FDdkIsQ0FBQyxDQUFDO0lBRUgsSUFBSSxTQUFTLENBQUM7SUFDZCxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDbEIsS0FBSyxrQkFBa0I7WUFDckIsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1lBQzdCLE1BQU07UUFDUixLQUFLLG9CQUFvQjtZQUN2QixTQUFTLEdBQUcsa0JBQWtCLENBQUM7WUFDL0IsTUFBTTtRQUNSLEtBQUssMEJBQTBCO1lBQzdCLFNBQVMsR0FBRyx3QkFBd0IsQ0FBQztZQUNyQyxN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O0lBQ2hDLE9BQU8sRUFBRSxTQUFTLENBQUMsSUFBSTtJQUN2QixPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUk7SUFDdkIsWUFBWSxFQUFFLFNBQVMsQ0FBQyxJQUFJO0lBQzVCLFFBQVEsRUFBRSxTQUFTLENBQUMsT0FBTztDQUM1QixDQUFDO0FBRUYsYUFBYSxDQUFDLFlBQVksR0FBRztJQUMzQixJQUFJLEVBQUUsa0JBQWtCO0lBQ3hCLFdBQVcsRUFBRSxTQUFTO0lBQ3RCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFNBQVMsRUFBRSxPQUFPO0lBQ2xCLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRSxDQUFDO0lBQ2pCLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7SUFDMUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7SUFDakIsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFFLENBQUM7SUFDakIsWUFBWSxFQUFFLElBQUk7SUFDbEIsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDO0FBRUYsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIFRvdWNoYWJsZU9wYWNpdHksXG4gIFRvdWNoYWJsZUhpZ2hsaWdodCxcbiAgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrLFxuICBTYWZlQXJlYVZpZXcsXG59IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE1vZGFsIGZyb20gJ3JlYWN0LW5hdGl2ZS1tb2RhbCc7XG5cbi8qIG5wbSAqL1xuaW1wb3J0IFdlYlZpZXcgZnJvbSAncmVhY3QtbmF0aXZlLXdlYnZpZXcnO1xuXG4vKiBjb21wb25lbnRzICovXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcblxuLyogY2xpZW50ICovXG5pbXBvcnQgdHdpdHRlciBmcm9tICcuLi9jbGllbnQnO1xuXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlLCBBY2Nlc3NUb2tlbiwgVHdpdHRlclVzZXIgfSBmcm9tICcuLi90eXBlcyc7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIHR5cGU6ICdUb3VjaGFibGVPcGFjaXR5JyB8ICdUb3VjaGFibGVIaWdobGlnaHQnIHwgJ1RvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayc7XG4gIGhlYWRlckNvbG9yOiBzdHJpbmc7XG4gIGNhbGxiYWNrVXJsOiBzdHJpbmc7XG4gIGNsb3NlVGV4dDogc3RyaW5nO1xuICBvblByZXNzOiAoZTogYW55KSA9PiB2b2lkO1xuICBvbkdldEFjY2Vzc1Rva2VuOiAodG9rZW46IEFjY2Vzc1Rva2VuKSA9PiB2b2lkO1xuICBvbkNsb3NlOiAoZTogYW55KSA9PiB2b2lkO1xuICBvblN1Y2Nlc3M6ICh1c2VyOiBUd2l0dGVyVXNlcikgPT4gdm9pZDtcbiAgb25FcnJvcjogKGU6IEVycm9yUmVzcG9uc2UpID0+IHZvaWQ7XG4gIHJlbmRlckhlYWRlcjogKHByb3BzOiBhbnkpID0+IFJlYWN0LlJlYWN0RWxlbWVudDx7fT47XG4gIGNoaWxkcmVuOiBhbnk7XG59O1xuXG5mdW5jdGlvbiBUV0xvZ2luQnV0dG9uKHByb3BzOiBQcm9wcykge1xuICBjb25zdCBbaXNWaXNpYmxlLCBzZXRWaXNpYmxlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2F1dGhVUkwsIHNldEF1dGhVUkxdID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFt0b2tlbiwgc2V0VG9rZW5dID0gdXNlU3RhdGU8QWNjZXNzVG9rZW4+KHtcbiAgICBvYXV0aF90b2tlbjogJycsXG4gICAgb2F1dGhfdG9rZW5fc2VjcmV0OiAnJyxcbiAgfSk7XG5cbiAgbGV0IENvbXBvbmVudDtcbiAgc3dpdGNoIChwcm9wcy50eXBlKSB7XG4gICAgY2FzZSAnVG91Y2hhYmxlT3BhY2l0eSc6XG4gICAgICBDb21wb25lbnQgPSBUb3VjaGFibGVPcGFjaXR5O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnVG91Y2hhYmxlSGlnaGxpZ2h0JzpcbiAgICAgIENvbXBvbmVudCA9IFRvdWNoYWJsZUhpZ2hsaWdodDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1RvdWNoYWJsZVdpdGhvdXRGZWVkYmFjayc6XG4gICAgICBDb21wb25lbnQgPSBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2s7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVFdMb2dpbkJ1dHRvbiB0eXBlIG11c3QgYmUgVG91Y2hhYmxlT3BhY2l0eSBvciBUb3VjaGFibGVIaWdobGlnaHQgb3IgVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrJyxcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG9uQnV0dG9uUHJlc3MgPSBhc3luYyAoZTogYW55KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgYXdhaXQgcHJvcHMub25QcmVzcyhlKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBsb2dpblVSTCA9IGF3YWl0IHR3aXR0ZXIuZ2V0TG9naW5VcmwocHJvcHMuY2FsbGJhY2tVcmwpO1xuICAgICAgc2V0QXV0aFVSTChsb2dpblVSTCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLndhcm4oYFtnZXRMb2dpblVybCBmYWlsZWRdICR7ZXJyfWApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBvbkNsb3NlUHJlc3MgPSAoZTogYW55KSA9PiB7XG4gICAgc2V0VmlzaWJsZShmYWxzZSk7XG4gICAgcHJvcHMub25DbG9zZShlKTtcbiAgfTtcblxuICBjb25zdCBvbk5hdmlnYXRpb25TdGF0ZUNoYW5nZSA9IGFzeW5jICh3ZWJWaWV3U3RhdGU6IGFueSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoID0gd2ViVmlld1N0YXRlLnVybC5tYXRjaChcbiAgICAgIC9cXD9vYXV0aF90b2tlbj0uKyZvYXV0aF92ZXJpZmllcj0oLispLyxcbiAgICApO1xuXG4gICAgaWYgKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFZpc2libGUoZmFsc2UpO1xuXG4gICAgICAvKiBnZXQgYWNjZXNzIHRva2VuICovXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHR3aXR0ZXIuZ2V0QWNjZXNzVG9rZW4obWF0Y2hbMV0pO1xuICAgICAgICBzZXRUb2tlbihyZXNwb25zZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBbZ2V0QWNjZXNzVG9rZW4gZmFpbGVkXSAke2Vycn1gKTtcblxuICAgICAgICBwcm9wcy5vbkVycm9yKGVycik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGF1dGhVUkwgIT09ICcnKSB7XG4gICAgICBzZXRWaXNpYmxlKHRydWUpO1xuICAgIH1cbiAgfSwgW2F1dGhVUkxdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNWaXNpYmxlKSB7XG4gICAgICBzZXRBdXRoVVJMKCcnKTtcbiAgICB9XG4gIH0sIFtpc1Zpc2libGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0b2tlbiAmJiB0b2tlbi5vYXV0aF90b2tlbiAmJiB0b2tlbi5vYXV0aF90b2tlbl9zZWNyZXQpIHtcbiAgICAgIHByb3BzLm9uR2V0QWNjZXNzVG9rZW4odG9rZW4pO1xuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBpbmNsdWRlX2VudGl0aWVzOiBmYWxzZSxcbiAgICAgICAgc2tpcF9zdGF0dXM6IHRydWUsXG4gICAgICAgIGluY2x1ZGVfZW1haWw6IHRydWUsXG4gICAgICB9O1xuXG4gICAgICB0d2l0dGVyXG4gICAgICAgIC5hcGk8VHdpdHRlclVzZXI+KCdHRVQnLCAnYWNjb3VudC92ZXJpZnlfY3JlZGVudGlhbHMuanNvbicsIG9wdGlvbnMpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHByb3BzLm9uU3VjY2VzcyhyZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgcHJvcHMub25FcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH0sIFt0b2tlbl0pO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudCB7Li4ucHJvcHN9IG9uUHJlc3M9e29uQnV0dG9uUHJlc3N9PlxuICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgPE1vZGFsXG4gICAgICAgIGlzVmlzaWJsZT17aXNWaXNpYmxlfVxuICAgICAgICBhbmltYXRpb25Jbj1cImZhZGVJblwiXG4gICAgICA+XG4gICAgICAgIDxTYWZlQXJlYVZpZXcgc3R5bGU9e3sgZmxleDogMSwgYmFja2dyb3VuZENvbG9yOiBwcm9wcy5oZWFkZXJDb2xvciB9fT5cbiAgICAgICAgICB7cHJvcHMucmVuZGVySGVhZGVyID8gKFxuICAgICAgICAgICAgcHJvcHMucmVuZGVySGVhZGVyKHsgb25DbG9zZTogb25DbG9zZVByZXNzIH0pXG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxIZWFkZXJcbiAgICAgICAgICAgICAgaGVhZGVyQ29sb3I9e3Byb3BzLmhlYWRlckNvbG9yfVxuICAgICAgICAgICAgICBvbkNsb3NlPXtvbkNsb3NlUHJlc3N9XG4gICAgICAgICAgICAgIGNsb3NlVGV4dD17cHJvcHMuY2xvc2VUZXh0fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxXZWJWaWV3XG4gICAgICAgICAgICBzb3VyY2U9e3sgdXJpOiBhdXRoVVJMIH19XG4gICAgICAgICAgICBvbk5hdmlnYXRpb25TdGF0ZUNoYW5nZT17b25OYXZpZ2F0aW9uU3RhdGVDaGFuZ2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TYWZlQXJlYVZpZXc+XG4gICAgICA8L01vZGFsPlxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufVxuXG5UV0xvZ2luQnV0dG9uLnByb3BUeXBlcyA9IHtcbiAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgaGVhZGVyQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNhbGxiYWNrVXJsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjbG9zZVRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uUHJlc3M6IFByb3BUeXBlcy5mdW5jLFxuICBvbkdldEFjY2Vzc1Rva2VuOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uRXJyb3I6IFByb3BUeXBlcy5mdW5jLFxuICByZW5kZXJIZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQsXG59O1xuXG5UV0xvZ2luQnV0dG9uLmRlZmF1bHRQcm9wcyA9IHtcbiAgdHlwZTogJ1RvdWNoYWJsZU9wYWNpdHknLFxuICBoZWFkZXJDb2xvcjogJyNmN2Y3ZjcnLFxuICBjYWxsYmFja1VybDogbnVsbCxcbiAgY2xvc2VUZXh0OiAnY2xvc2UnLFxuICBvblByZXNzOiAoKSA9PiB7fSxcbiAgb25HZXRBY2Nlc3NUb2tlbjogKCkgPT4ge30sXG4gIG9uQ2xvc2U6ICgpID0+IHt9LFxuICBvbkVycm9yOiAoKSA9PiB7fSxcbiAgcmVuZGVySGVhZGVyOiBudWxsLFxuICBjaGlsZHJlbjogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFRXTG9naW5CdXR0b247XG4iXX0=