import React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import {createStore} from 'redux';
import rootReducer from "./store/reducers/rootReducer";
import {Provider} from 'react-redux';
import StoryList from './components/StoryList'

const store = createStore(rootReducer);

const App = () => {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StatusBar />
                <Text style={styles.title}>Hacker News - Topstories</Text>
                <StoryList />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        width: '100%',
        backgroundColor: '#ff6601',
        paddingVertical: 30,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default App;
