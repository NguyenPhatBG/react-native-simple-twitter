import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, SafeAreaView, } from 'react-native';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbXBvbmVudHMvQnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDbkQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixrQkFBa0IsRUFDbEIsd0JBQXdCLEVBQ3hCLFlBQVksR0FDYixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEtBQUssTUFBTSxvQkFBb0IsQ0FBQztBQUd2QyxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUczQyxPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFHOUIsT0FBTyxPQUFPLE1BQU0sV0FBVyxDQUFDO0FBa0JoQyxTQUFTLGFBQWEsQ0FBQyxLQUFZO0lBQ2pDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFVLEtBQUssQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELE1BQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFjO1FBQzlDLFdBQVcsRUFBRSxFQUFFO1FBQ2Ysa0JBQWtCLEVBQUUsRUFBRTtLQUN2QixDQUFDLENBQUM7SUFFSCxJQUFJLFNBQVMsQ0FBQztJQUNkLFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtRQUNsQixLQUFLLGtCQUFrQjtZQUNyQixTQUFTLEdBQUcsZ0JBQWdCLENBQUM7WUFDN0IsTUFBTTtRQUNSLEtBQUssb0JBQW9CO1lBQ3ZCLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSywwQkFBMEI7WUFDN0IsU0FBUyxHQUFHLHdCQUF3QixDQUFDO1lBQ3JDLE1BQU07UUFDUjtZQUNFLE9BQU8sQ0FBQyxJQUFJLENB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QUFFLEdBQUUsQ0FBQztJQUNqQixZQUFZLEVBQUUsSUFBSTtJQUNsQixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRixlQUFlLGFBQWEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgVG91Y2hhYmxlT3BhY2l0eSxcbiAgVG91Y2hhYmxlSGlnaGxpZ2h0LFxuICBUb3VjaGFibGVXaXRob3V0RmVlZGJhY2ssXG4gIFNhZmVBcmVhVmlldyxcbn0gZnJvbSAncmVhY3QtbmF0aXZlJztcbmltcG9ydCBNb2RhbCBmcm9tICdyZWFjdC1uYXRpdmUtbW9kYWwnO1xuXG4vKiBucG0gKi9cbmltcG9ydCBXZWJWaWV3IGZyb20gJ3JlYWN0LW5hdGl2ZS13ZWJ2aWV3JztcblxuLyogY29tcG9uZW50cyAqL1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcic7XG5cbi8qIGNsaWVudCAqL1xuaW1wb3J0IHR3aXR0ZXIgZnJvbSAnLi4vY2xpZW50JztcblxuaW1wb3J0IHsgRXJyb3JSZXNwb25zZSwgQWNjZXNzVG9rZW4sIFR3aXR0ZXJVc2VyIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG50eXBlIFByb3BzID0ge1xuICB0eXBlOiAnVG91Y2hhYmxlT3BhY2l0eScgfCAnVG91Y2hhYmxlSGlnaGxpZ2h0JyB8ICdUb3VjaGFibGVXaXRob3V0RmVlZGJhY2snO1xuICBoZWFkZXJDb2xvcjogc3RyaW5nO1xuICBjYWxsYmFja1VybDogc3RyaW5nO1xuICBjbG9zZVRleHQ6IHN0cmluZztcbiAgb25QcmVzczogKGU6IGFueSkgPT4gdm9pZDtcbiAgb25HZXRBY2Nlc3NUb2tlbjogKHRva2VuOiBBY2Nlc3NUb2tlbikgPT4gdm9pZDtcbiAgb25DbG9zZTogKGU6IGFueSkgPT4gdm9pZDtcbiAgb25TdWNjZXNzOiAodXNlcjogVHdpdHRlclVzZXIpID0+IHZvaWQ7XG4gIG9uRXJyb3I6IChlOiBFcnJvclJlc3BvbnNlKSA9PiB2b2lkO1xuICByZW5kZXJIZWFkZXI6IChwcm9wczogYW55KSA9PiBSZWFjdC5SZWFjdEVsZW1lbnQ8e30+O1xuICBjaGlsZHJlbjogYW55O1xufTtcblxuZnVuY3Rpb24gVFdMb2dpbkJ1dHRvbihwcm9wczogUHJvcHMpIHtcbiAgY29uc3QgW2lzVmlzaWJsZSwgc2V0VmlzaWJsZV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFthdXRoVVJMLCBzZXRBdXRoVVJMXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbdG9rZW4sIHNldFRva2VuXSA9IHVzZVN0YXRlPEFjY2Vzc1Rva2VuPih7XG4gICAgb2F1dGhfdG9rZW46ICcnLFxuICAgIG9hdXRoX3Rva2VuX3NlY3JldDogJycsXG4gIH0pO1xuXG4gIGxldCBDb21wb25lbnQ7XG4gIHN3aXRjaCAocHJvcHMudHlwZSkge1xuICAgIGNhc2UgJ1RvdWNoYWJsZU9wYWNpdHknOlxuICAgICAgQ29tcG9uZW50ID0gVG91Y2hhYmxlT3BhY2l0eTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1RvdWNoYWJsZUhpZ2hsaWdodCc6XG4gICAgICBDb21wb25lbnQgPSBUb3VjaGFibGVIaWdobGlnaHQ7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdUb3VjaGFibGVXaXRob3V0RmVlZGJhY2snOlxuICAgICAgQ29tcG9uZW50ID0gVG91Y2hhYmxlV2l0aG91dEZlZWRiYWNrO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1RXTG9naW5CdXR0b24gdHlwZSBtdXN0IGJlIFRvdWNoYWJsZU9wYWNpdHkgb3IgVG91Y2hhYmxlSGlnaGxpZ2h0IG9yIFRvdWNoYWJsZVdpdGhvdXRGZWVkYmFjaycsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBvbkJ1dHRvblByZXNzID0gYXN5bmMgKGU6IGFueSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGF3YWl0IHByb3BzLm9uUHJlc3MoZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9naW5VUkwgPSBhd2FpdCB0d2l0dGVyLmdldExvZ2luVXJsKHByb3BzLmNhbGxiYWNrVXJsKTtcbiAgICAgIHNldEF1dGhVUkwobG9naW5VUkwpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS53YXJuKGBbZ2V0TG9naW5VcmwgZmFpbGVkXSAke2Vycn1gKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgb25DbG9zZVByZXNzID0gKGU6IGFueSkgPT4ge1xuICAgIHNldFZpc2libGUoZmFsc2UpO1xuICAgIHByb3BzLm9uQ2xvc2UoZSk7XG4gIH07XG5cbiAgY29uc3Qgb25OYXZpZ2F0aW9uU3RhdGVDaGFuZ2UgPSBhc3luYyAod2ViVmlld1N0YXRlOiBhbnkpID0+IHtcbiAgICBjb25zdCBtYXRjaCA9IHdlYlZpZXdTdGF0ZS51cmwubWF0Y2goXG4gICAgICAvXFw/b2F1dGhfdG9rZW49Lismb2F1dGhfdmVyaWZpZXI9KC4rKS8sXG4gICAgKTtcblxuICAgIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRWaXNpYmxlKGZhbHNlKTtcblxuICAgICAgLyogZ2V0IGFjY2VzcyB0b2tlbiAqL1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0d2l0dGVyLmdldEFjY2Vzc1Rva2VuKG1hdGNoWzFdKTtcbiAgICAgICAgc2V0VG9rZW4ocmVzcG9uc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgW2dldEFjY2Vzc1Rva2VuIGZhaWxlZF0gJHtlcnJ9YCk7XG5cbiAgICAgICAgcHJvcHMub25FcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhdXRoVVJMICE9PSAnJykge1xuICAgICAgc2V0VmlzaWJsZSh0cnVlKTtcbiAgICB9XG4gIH0sIFthdXRoVVJMXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzVmlzaWJsZSkge1xuICAgICAgc2V0QXV0aFVSTCgnJyk7XG4gICAgfVxuICB9LCBbaXNWaXNpYmxlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodG9rZW4gJiYgdG9rZW4ub2F1dGhfdG9rZW4gJiYgdG9rZW4ub2F1dGhfdG9rZW5fc2VjcmV0KSB7XG4gICAgICBwcm9wcy5vbkdldEFjY2Vzc1Rva2VuKHRva2VuKTtcblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgaW5jbHVkZV9lbnRpdGllczogZmFsc2UsXG4gICAgICAgIHNraXBfc3RhdHVzOiB0cnVlLFxuICAgICAgICBpbmNsdWRlX2VtYWlsOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgdHdpdHRlclxuICAgICAgICAuYXBpPFR3aXR0ZXJVc2VyPignR0VUJywgJ2FjY291bnQvdmVyaWZ5X2NyZWRlbnRpYWxzLmpzb24nLCBvcHRpb25zKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBwcm9wcy5vblN1Y2Nlc3MocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHByb3BzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LCBbdG9rZW5dKTtcblxuICByZXR1cm4gKFxuICAgIDxDb21wb25lbnQgey4uLnByb3BzfSBvblByZXNzPXtvbkJ1dHRvblByZXNzfT5cbiAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgIDxNb2RhbFxuICAgICAgICBpc1Zpc2libGU9e2lzVmlzaWJsZX1cbiAgICAgICAgYW5pbWF0aW9uSW49XCJmYWRlSW5cIlxuICAgICAgPlxuICAgICAgICA8U2FmZUFyZWFWaWV3IHN0eWxlPXt7IGZsZXg6IDEsIGJhY2tncm91bmRDb2xvcjogcHJvcHMuaGVhZGVyQ29sb3IgfX0+XG4gICAgICAgICAge3Byb3BzLnJlbmRlckhlYWRlciA/IChcbiAgICAgICAgICAgIHByb3BzLnJlbmRlckhlYWRlcih7IG9uQ2xvc2U6IG9uQ2xvc2VQcmVzcyB9KVxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgICAgIGhlYWRlckNvbG9yPXtwcm9wcy5oZWFkZXJDb2xvcn1cbiAgICAgICAgICAgICAgb25DbG9zZT17b25DbG9zZVByZXNzfVxuICAgICAgICAgICAgICBjbG9zZVRleHQ9e3Byb3BzLmNsb3NlVGV4dH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8V2ViVmlld1xuICAgICAgICAgICAgc291cmNlPXt7IHVyaTogYXV0aFVSTCB9fVxuICAgICAgICAgICAgb25OYXZpZ2F0aW9uU3RhdGVDaGFuZ2U9e29uTmF2aWdhdGlvblN0YXRlQ2hhbmdlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU2FmZUFyZWFWaWV3PlxuICAgICAgPC9Nb2RhbD5cbiAgICA8L0NvbXBvbmVudD5cbiAgKTtcbn1cblxuVFdMb2dpbkJ1dHRvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIHR5cGU6ICdUb3VjaGFibGVPcGFjaXR5JyxcbiAgaGVhZGVyQ29sb3I6ICcjZjdmN2Y3JyxcbiAgY2FsbGJhY2tVcmw6IG51bGwsXG4gIGNsb3NlVGV4dDogJ2Nsb3NlJyxcbiAgb25QcmVzczogKCkgPT4ge30sXG4gIG9uR2V0QWNjZXNzVG9rZW46ICgpID0+IHt9LFxuICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgb25FcnJvcjogKCkgPT4ge30sXG4gIHJlbmRlckhlYWRlcjogbnVsbCxcbiAgY2hpbGRyZW46IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBUV0xvZ2luQnV0dG9uO1xuIl19