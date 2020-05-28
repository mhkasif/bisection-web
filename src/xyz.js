// import React from 'react';
// import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
// import * as math from 'mathjs'
// import {LineChart} from 'react-native-chart-kit'

// export default class App extends React.Component {

//   state = {
//     value: '',
//     xValues: [],
//     yValues: [],
//     equation: undefined,
//     a: undefined,
//     b: undefined,
//     answer: undefined,
//     tableA: [],
//     tableB: [],
//     tableFA: [],
//     tableFB: [],
//     tableC: [],
//     tableFC: [],
//     tableBDiffA: []

//   }

//   onButtonPress = async() => {
//     const expression = math.compile(this.state.value)
//     const xValues = math
//       .range(-10, 10, 0.5)
//       .toArray()
//     const yValues = xValues.map((x) => expression.eval({x: x}))
//     await this.setState({xValues, yValues})

//     let a = parseFloat(this.state.a);
//     let b = parseFloat(this.state.b);

//     let fOfA = expression.eval({x: a})
//     let fOfB = expression.eval({x: b})
//     let midValueC = ((a + b) / 2);
//     let fOfC = expression.eval({x: midValueC})
//     let difference = parseFloat((b - a))
//     this.setState((ps) => {
//       return {
//         tableA: ps
//           .tableA
//           .concat([a]),
//         tableB: ps
//           .tableB
//           .concat([b]),
//         tableC: ps
//           .tableC
//           .concat([midValueC]),
//         tableFA: ps
//           .tableFA
//           .concat([fOfA]),
//         tableFB: ps
//           .tableFB
//           .concat([fOfB]),
//         tableFC: ps
//           .tableFC
//           .concat([fOfC]),
//         tableBDiffA: ps
//           .tableBDiffA
//           .concat([difference])
//       }
//     })
//     console.log("a" + this.state.tableA)
//     console.log("b" + this.state.tableB)
//     console.log("c" + this.state.tableC)
//     console.log("fa" + this.state.tableFA)
//     console.log("fb" + this.state.tableFB)
//     console.log("fc" + this.state.tableFC)
//     console.log("b-a" + this.state.tableBDiffA)
//     while (difference >= 0.0001) {
//       if (fOfC > 0) {
//         b = midValueC;
//       } else {
//         a = midValueC;
//       }
//       // console.log("b" + b);

//       midValueC = (parseFloat(a) + parseFloat(b)) / 2;
//       // console.log("midValueC" + midValueC); console.log("a" + a); console.log("b" +
//       // b);
//       fOfC = expression.eval({x: midValueC})
//       fOfA = expression.eval({x: a})
//       fOfB = expression.eval({x: b})
//       // console.log("fofc" + fOfC);
//       difference = b - a;
//       this.setState((ps) => {
//         return {
//           tableA: ps
//             .tableA
//             .concat([a]),
//           tableB: ps
//             .tableB
//             .concat([b]),
//           tableC: ps
//             .tableC
//             .concat([midValueC]),
//           tableFA: ps
//             .tableFA
//             .concat([fOfA]),
//           tableFB: ps
//             .tableFB
//             .concat([fOfB]),
//           tableFC: ps
//             .tableFC
//             .concat([fOfC]),
//           tableBDiffA: ps
//             .tableBDiffA
//             .concat([difference])
//         }
//       })
//     }
//     this.setState({
//       answer: b.toFixed(4)
//     })
//     console.log("a " + this.state.tableA)
//     console.log("b " + this.state.tableB)
//     console.log("c " + this.state.tableC)
//     console.log("fa " + this.state.tableFA)
//     console.log("fb " + this.state.tableFB)
//     console.log("fc " + this.state.tableFC)
//     console.log("b-a " + this.state.tableBDiffA)
//     console.log("answer " + this.state.answer)

//   }

//   render() {
//     const data = {
//       labels: [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June'
//       ],
//       datasets: [
//         {
//           data: [
//             20,
//             45,
//             28,
//             80,
//             99,
//             43
//           ]
//         }
//       ]
//     }
//     const chartConfig = {
//       backgroundGradientFrom: '#1E2923',
//       backgroundGradientTo: '#08130D',
//       color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
//     }
//     const width = Dimensions
//       .get('window')
//       .width // from react-native
//     const height = 220
//     return (
//       <View style={styles.container}>

//         <TextInput
//           onChangeText={text => this.setState({value: text})}
//           placeholder="Enter degree of equation"/>
//         <TextInput
//           onChangeText={text => this.setState({a: text})}
//           placeholder="Enter value of a"/>
//         <TextInput
//           onChangeText={text => this.setState({b: text})}
//           placeholder="Enter value of b"/>
//         <Button title="next" onPress={this.onButtonPress}/>
//         {this.state.answer && <LineChart
//           data={data}
//           width={width}
//           height={height}
//           chartConfig={chartConfig}
//           bezier/>
// }
//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
