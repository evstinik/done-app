import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import store from 'react-native-simple-store';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar'
  }

  constructor(props) {
    super(props)
    this.state = {
      dates: {},
      isLoading: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    this.setState({ isLoading: true })
    store.get('dates').then((dates) => {
      this.setState({
        isLoading: false,
        dates: dates || {}
      })
    })
  }

  saveData = () => {
    this.setState({ isLoading: true })
    store.save('dates', this.state.dates).then(() => {
      this.setState({ isLoading: false })
    })
  }

  openDayDetail = (day) => {
    const { navigate } = this.props.navigation 
    const { dates } = this.state
    const text = dates[day.dateString]
    navigate('DayDetail', { day: day, text: text, onSaveText: this.saveText, onLeave: this.saveData })
  }

  saveText = (date, text) => {
    let { dates } = this.state
    dates[date] = text && text.length > 0 ? text : undefined
    this.setState({ dates })
  }

  render() {
    const { dates } = this.state
    let markedDates = {} 
    Object.keys(dates).forEach(key => {
      const text = dates[key]
      markedDates[key] = { 
        marked: text && text.length > 0
      }
    })
    return (
      <View style={styles.container}>
        <CalendarList
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => { console.log('now these months are visible', months); }}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={this.openDayDetail}
          {...calendarParams}
          markedDates={markedDates}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const calendarParams = {
  // Initially visible month. Default = Date()
  current: new Date(),
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate: undefined,
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate: undefined,
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress: (day) => { console.log('selected day', day) },
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat: 'MMM, yyyy',
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange: (month) => { console.log('month changed', month) },
  // Hide month navigation arrows. Default = false
  hideArrows: true,
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow: (direction) => (<Arrow />),
  // Do not show days of other months in month page. Default = false
  hideExtraDays: true,
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange: true,
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay: 1,
  // Hide day names. Default = false
  hideDayNames: false,
  // Show week numbers to the left. Default = false
  showWeekNumbers: false,
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft: substractMonth => substractMonth(),
  // Handler which gets executed when press arrow icon left. It receive a callback can go next month
  onPressArrowRight: addMonth => addMonth()
}