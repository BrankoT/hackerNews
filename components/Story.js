import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import api from '../api/api';
import moment from "moment";

const Story = ({storyId, index, page, perPage}) => {
    const [topStory, setTopStory] = useState({});

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            fetchTopStory(storyId);
        }

        return () => {
            unmounted = true
        }
    }, []);

    const fetchTopStory = async (storyId) => {
        const {data} = await api.get(`/item/${storyId}.json?print=pretty`);
        setTopStory(data);
    };

    return (
        <View style={styles.story}>
            <Text style={[styles.storyIndex, styles.storyTitle]}>{(index + 1) + (page * perPage) - perPage}.</Text>
            <View>
                <Text style={styles.storyTitle}>{topStory.title ? topStory.title : 'Title'}</Text>
                <Text style={styles.storyInfo}>By: {topStory ? topStory.by : 'Author' } - {topStory.time ? moment.unix(topStory.time).fromNow() : 0}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    story: {
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    storyIndex: {
        marginRight: 10
    },
    storyTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    storyInfo: {
        fontStyle: 'italic'
    }
});

export default Story;
