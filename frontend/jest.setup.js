import '@testing-library/jest-native/extend-expect';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@expo/vector-icons', () => {
    return {
        FontAwesome: 'FontAwesomeMock',
        // Add other icons or sets as needed
    };
});
