import React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import StoryList from './components/StoryList'

const App = () => {
    return (
        <View style={styles.container}>
            <StatusBar />
            <Text style={styles.title}>Hacker News - Topstories</Text>
            <StoryList />
        </View>
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
