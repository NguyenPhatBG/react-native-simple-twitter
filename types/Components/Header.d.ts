/// <reference types="react" />
import { ViewStyle } from 'react-native';
import PropTypes from 'prop-types';
declare type Props = {
    headerColor: string;
    textColor: string;
    style: ViewStyle;
    closeText: string;
    onClose: (e: any) => void;
};
declare function Header(props: Props): JSX.Element;
declare namespace Header {
    var propTypes: {
        headerColor: PropTypes.Requireable<string>;
        textColor: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<PropTypes.InferProps<{}>>;
        closeText: PropTypes.Requireable<string>;
        onClose: PropTypes.Requireable<(...args: any[]) => any>;
    };
    var defaultProps: {
        headerColor: string;
        textColor: string;
        style: null;
        closeText: string;
        onClose: () => void;
    };
}
export default Header;
