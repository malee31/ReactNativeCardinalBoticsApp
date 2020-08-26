const AboutRoutes = TabNavigator({
    aboutApp: {
        screen: AboutApp,
    },
    aboutDevs: {
        screen: AboutDevs,
    }
});

const Router = StackNavigator({
    home: {
        screen: HomePage,
        navigationOptions: {
            title: 'Start taking notes',
        }
    },
    about: {
        screen: AboutRoutes
    }
}, {
    mode: 'card'
});

export default Router;