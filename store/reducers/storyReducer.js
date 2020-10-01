const initState = {
    stories: [],
    story: {},
    currentStories: [],
    currentPage: 1,
    storiesPerPage: 20,
    loading: false
};

const storyReducer = (state = initState, action) => {
    let currentStories = [];

    switch (action.type) {
        case 'STORIES_LIST':
            for (let i = (state.currentPage * state.storiesPerPage) - state.storiesPerPage; i <= Math.min(state.currentPage * state.storiesPerPage, action.payload.length) - 1; i++) {
                currentStories.push(action.payload[i])
            }

            return {
                ...state,
                stories: action.payload,
                currentStories
            };

        case 'CURRENT_STORIES_LIST':
            for (let i = (state.currentPage * state.storiesPerPage) - state.storiesPerPage; i <= Math.min(state.currentPage * state.storiesPerPage, state.stories.length) - 1; i++) {
                currentStories.push(state.stories[i])
            }
            return { ...state, currentStories };

        case 'CHANGE_PAGE':
            return { ...state, currentPage: state.currentPage + action.payload };

        case 'LOADING':
            return { ...state, loading: action.payload };

        default:
            return state
    }
};

export default storyReducer
