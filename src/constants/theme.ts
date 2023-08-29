
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window')


export const COLORS = {
    'teal-001': '#0898A0',
    'teal-002': '#F6FFFE',
    'teal-003': '#41BCC4',
    'instructive-green': '#27BF41',
    'lighter-green': 'rgba(76, 217, 100, 0.15)',
    'bg-light-001': '#FEFAF7',
    'bg-light-002': '#FDF4F9',
    'border': '#E1E8ED',
    'dark-mode': '#171C22',
    'dark-text': '#012224',
    'orange-001': '#FE7122',
    'indigo-001': '#B80074',
    'off-white': '#fff',
    'off-white-003': '#71879C1A',
    'off-white-004': '#71879C0D',
    'off-white-light-stroke': '#71879C33',
    'text-black': '#222',
    'input-color': '#292F33',
    'text-soft': '#71879C',
    'text-004': '#94A1AD',
    'instructive-red': '#EB5757',
    'lighter-red': 'rgba(235, 87, 87, 0.15)',
    'gray-1': '#333',

}

export const SIZES = {
    padding: 20,
    inputPadding: 16,
    width: width,
    height: height,
}

export const commonStyles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: COLORS['off-white']
    },
    row: {
        flexDirection: 'row',
        alignItems: "center"
    },
    authButton: {

        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 'auto'

    },
    grotesk: {
        fontFamily: 'grotesk'
    },
    groteskBold: {
        fontFamily: 'groteskBold'
    },
    normalText: {
        fontFamily: 'dm-sans'
    },
    darkText: {
        fontFamily: 'dm-sans-black'
    },
    boldText: {
        fontFamily: 'dm-sans-b'
    },
    xBoldText: {
        fontFamily: 'dm-sans-xb'
    },
    semiBoldText: {
        fontFamily: 'dm-sans-sb'
    },
})
