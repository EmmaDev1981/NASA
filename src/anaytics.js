import {app} from './firebase'

app.analytics()

const analitycsEvent = (event, params) => {
    return app.analytics().logEvent(event, params)
};

export {analitycsEvent};