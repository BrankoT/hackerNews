import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native';
import api from '../api/api';
import Story from './Story'

const StoryList = () => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [topStories, setTopStories] = useState([]);
    const [currentStories, setCurrentStories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const STORY_PER_PAGE = 20;

    useEffect(() => {
        fetchTopStories();
    }, [count]);

    setInterval(() => {
        setCount(count + 1);
    }, 30000);

    const fetchTopStories = async () => {
        setLoading(true);
        try {
            const {data} = await api.get('/topstories.json?print=pretty');
            setLoading(false);
            await setTopStories(data);
            storiesPagination(currentPage);
        } catch (e) {
            console.log(e)
        }
    };

    const storiesPagination = (page) => {
        let stories = [];

        for (let i = (page * STORY_PER_PAGE) - STORY_PER_PAGE; i <= Math.min(STORY_PER_PAGE * page, topStories.length) - 1; i++) {
            stories.push(topStories[i])
        }

        setCurrentPage(page);
        setCurrentStories(stories);
    };

    const changePage = (type) => {
        if (type === 'decrement' && currentPage === 1 || type === 'increment' && currentPage === Math.ceil(topStories.length / STORY_PER_PAGE)) {
            return;
        }
        return type === 'decrement' ? storiesPagination(currentPage - 1) : storiesPagination(currentPage + 1);
    };

    if (loading) {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}>

                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#ff6601"/>
                </View>
            </Modal>
        )
    }

    return (
        currentStories && <View style={styles.storyList}>
            <View style={[styles.headerButtonWrapper]}>
                <TouchableOpacity
                    style={[styles.button, styles.buttonHeader]}
                    onPress={() => fetchTopStories()}
                >
                    <Text style={styles.buttonText}>Refresh Stories</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={(story) => story.toString()}
                data={currentStories}
                renderItem={({item, index}) => <Story storyId={item} index={index} page={currentPage} perPage={STORY_PER_PAGE}/>}
            />
            <View style={styles.footerButtonWrapper}>
                <TouchableOpacity
                    style={[styles.button, currentPage === 1 ? styles.buttonDisabled : null]}
                    onPress={() => changePage('decrement')}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, currentPage === Math.ceil(topStories.length / STORY_PER_PAGE) ? styles.buttonDisabled : null]}
                    onPress={() => changePage('increment')}
                >
                    <Text style={styles.buttonText}>Show More</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    storyList: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    headerButtonWrapper: {
        paddingBottom: 10
    },
    footerButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingTop: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: '#ff6601',
        padding: 10,
        width: '45%',
    },
    buttonHeader: {
        width: '100%'
    },
    buttonDisabled: {
        backgroundColor: "#ffc7a2",
    },
    buttonText: {
        fontWeight: 'bold'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    }
});

export default StoryList;
