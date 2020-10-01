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
import {
    useDispatch,
    useSelector
} from "react-redux";

const StoryList = () => {
    const loading = useSelector(state => state.story.loading);
    const stories = useSelector(state => state.story.stories);
    const currentStories = useSelector(state => state.story.currentStories);
    const currentPage = useSelector(state => state.story.currentPage);
    const storiesPerPage = useSelector(state => state.story.storiesPerPage);
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            fetchTopStories();
        }

        return () => {
            unmounted = true
        }
    }, [count]);

    setInterval(() => {
        setCount(count + 1);
    }, 30000);

    const fetchTopStories = async () => {
        dispatch({
            type: 'LOADING',
            payload: true
        });

        try {
            const {data} = await api.get('/topstories.json?print=pretty');

            dispatch({
                type: 'LOADING',
                payload: false
            });

            dispatch({
                type: 'STORIES_LIST',
                payload: data
            });

        } catch (e) {
            dispatch({
                type: 'LOADING',
                payload: false
            });

            console.log(e)
        }
    };

    const changePage = (type) => {
        if (type === 'decrement' && currentPage === 1 || type === 'increment' && currentPage === Math.ceil(stories.length / storiesPerPage)) {
            return;
        }

        if (type === 'decrement') {
            dispatch({
                type: 'CHANGE_PAGE',
                payload: -1
            });

            dispatch({
                type: 'CURRENT_STORIES_LIST',
            });
        } else {
            dispatch({
                type: 'CHANGE_PAGE',
                payload: 1
            });

            dispatch({
                type: 'CURRENT_STORIES_LIST',
            });
        }
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
                renderItem={({item, index}) => <Story storyId={item} index={index} page={currentPage} perPage={storiesPerPage}/>}
            />
            <View style={styles.footerButtonWrapper}>
                <TouchableOpacity
                    style={[styles.button, currentPage === 1 ? styles.buttonDisabled : null]}
                    onPress={() => !loading ? changePage('decrement'): null}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, currentPage === Math.ceil(stories.length / storiesPerPage) ? styles.buttonDisabled : null]}
                    onPress={() => !loading ? changePage('increment') : null }
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
