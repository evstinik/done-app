import React from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import store from 'react-native-simple-store';

export default class DayDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.day.dateString
  })

  constructor(props) {
    super(props)
    const { navigation } = this.props
    const day = navigation.getParam('day')
    const text = navigation.getParam('text')
    this.onSaveText = navigation.getParam('onSaveText')
    this.onLeave = navigation.getParam('onLeave')
    this.state = {
      text: text,
      day: day,
      isLoading: false
    }
  }

  onChangeText = (text) => {
    const { day } = this.state
    this.setState({ text })
    this.onSaveText(day.dateString, text)
  }

  componentWillUnmount() {
    this.onLeave()
  }
  
  render() {
    return (
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView>
            <TextInput
              multiline={true}
              editable={true}
              onChangeText={this.onChangeText}
              value={this.state.text}
              placeholder='Write here what you have done this day...'
              style={styles.textarea}
              scrollEnabled={false}
            />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </TouchableOpacity>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 20,
  },
  textarea: {
    flex: 1
  }
});