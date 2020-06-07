import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import OneSignal from 'react-native-onesignal';

import { store, persistor } from './store';
import App from './App';

class Index extends Component {
  constructor(props) {
    super(props);

    OneSignal.init('fb8a910f-fbcc-4b21-bb9f-7368c24154d3');
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentDidMount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  // Disparado automaticamente quando receber uma notificação e o app estiver aberto
  onReceived = (data) => {};

  // Quando clica em uma notificação quando o app ta fechado
  onOpened = (notification) => {};

  // Quando um usuario faz um registro no serviço de notificação
  onIds = (id) => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={{ flex: 1, backgroundColor: '#2B3239' }}>
            <StatusBar barStyle="light-content" backgroundColor="#2B3239" />
            <App />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default Index;
