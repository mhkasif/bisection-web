import React, {Component} from 'react';
import './App.css';
import * as math from 'mathjs'
import Plot from 'react-plotly.js';
import Tabl from './Table';
import { Button, Dimmer, Loader,Modal,Header,Icon } from 'semantic-ui-react';
var initialState={
  xValues: [],
  yValues: [],
  equation: undefined,
  a: undefined,
  b: undefined,
  answer:undefined,
  tableA:[],
  tableB:[],
  tableFA:[],
  tableFB:[],
  tableC:[],
  tableFC:[],
  tableBDiffA:[],
  showGraph:false,
  showTable:false,
  loaded:true,
  submitDisabled:false,
  modalOpen:true,
  IA:'',
  IB:''

}
class App extends Component {
  state = initialState;
  onChangeA=(e)=>{
    const re = /^([-])?([0-9])*([.]){0,1}([0-9])*$/;
    console.log(e.target)

    if (e
      .target
      .value === '' || re.test(e
        .target

        .value)) {
      this.setState({IA: e
        .target

        .value})
   }
}
onChangeB=(e)=>{
  const re = /^([-])?([0-9])*([.]){0,1}([0-9])*$/;


  if (e
    .target

    .value === '' || re.test(e
      .target

      .value)) {
    this.setState({IB: e
      .target

      .value})
 }
}
componentDidMount() {
  setTimeout(() => {
    this.setState({
      loaded:false
    })

  }, 3000);
}

handleGraph=()=>{
  console.log("graph clicked")
  this.setState((ps)=>({
    showGraph:!ps.showGraph
  }))
}
handleTable=()=>{
  console.log("table clicked")

  this.setState((ps)=>({
    showTable:!ps.showTable
  }))
}
handleClear=()=>{
  this.refs.a.value = '';
  this.refs.b.value = '';
  this.refs.c.value = '';
this.setState(
 {...initialState,loaded:false,modalOpen:false}
)


}
  submitHandler = async(e) => {
  console.log("submitted")

    e.preventDefault();
    // try {
    const equation = e
      .target
      .elements
      .eq
      .value
      .trim();
    let a = parseFloat(e.target.elements.a.value.trim());
    let b = parseFloat(e.target.elements.b.value.trim());
console.log(a+"a hai")
console.log(b+"b hai")
    const expression = math.compile(equation)
    const xValues = math
      .range(-200,200,5)
      .toArray()

    const yValues = xValues.map((x) => expression.eval({x: x}))
    await this.setState({xValues, yValues, equation})
    console.log(xValues+"xvalues")
    // calculaion part start

    let fOfA = expression.eval({x: a})
    let fOfB = expression.eval({x: b})
    let midValueC = ((a + b) / 2);

    let fOfC = expression.eval({x: midValueC})
    let difference = parseFloat(Math.abs(b - a))
     this.setState((ps)=>{
      return{
        tableA:ps.tableA.concat([a]),
        tableB:ps.tableB.concat([b]),
        tableC:ps.tableC.concat([midValueC]),
        tableFA:ps.tableFA.concat([fOfA]),
        tableFB:ps.tableFB.concat([fOfB]),
        tableFC:ps.tableFC.concat([fOfC]),
        tableBDiffA:ps.tableBDiffA.concat([difference])
      }
    })
    // console.log("fofc" + fOfC)

    while (difference >= 0.0001) {
      //  eslint-disable-next-line
      if (fOfC*fOfA<0) {
        b = midValueC;
      } else {
        a = midValueC;
      }
      // console.log("b" + b);

      midValueC = (parseFloat(a) + parseFloat(b)) / 2;
      // console.log("midValueC" + midValueC);
      // console.log("a" + a);
      // console.log("b" + b);
      fOfC = expression.eval({x: midValueC})
      fOfA = expression.eval({x: a})
      fOfB = expression.eval({x: b})
      // console.log("fofc" + fOfC);
      difference = Math.abs(b - a);
      // eslint-disable-next-line
       this.setState((ps)=>{
        return{
          tableA:ps.tableA.concat([a]),
          tableB:ps.tableB.concat([b]),
          tableC:ps.tableC.concat([midValueC]),
          tableFA:ps.tableFA.concat([fOfA]),
          tableFB:ps.tableFB.concat([fOfB]),
          tableFC:ps.tableFC.concat([fOfC]),
          tableBDiffA:ps.tableBDiffA.concat([difference])
        }
      })
    }

    this.setState({
      answer: b.toFixed(4),
      submitDisabled:true
    })
    // console.log(this.state.tableA)


    // calculaion part end

  }
  render() {
    var  annotations=[

      {
        x: this.state.answer,
        y: 0,
        showarrow: true,
        yref: 'y', xref: 'x',
        text:`answer = ${this.state.answer}`,
        font:{
          family: 'Arial',
          size: 20,
          color: '#0000ff'
        },

      },
      {
        x: this.state.tableA[0],
        y: this.state.tableFA[0],
        showarrow: true,
        yref: 'y', xref: 'x',
        text:`f(a) = ${this.state.tableFA[0]}`,
        font:{
          family: 'Arial',
          size: 20,
          color: '#00ff00'
        },

      },
      {
        x: this.state.tableB[0],
        y: this.state.tableFB[0],
        showarrow: true,
        yref: 'y', xref: 'x',
        text:`f(b) = ${this.state.tableFB[0]}`,
        font:{
          family: 'Arial',
          size: 20,
          color: '#ff0000'
        },

      },
    ]
    return (
      <div>

      {this.state.loaded ? <div className="load">
        <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>


      </div>
      :
      <div>
      <Modal open={this.state.modalOpen} dimmer="blurring" closeOnDimmerClick={false}  size='small' >
    <Header icon='info circle' color="red" content='Note:' />
    <Modal.Content>
      <p>
     Equation must be written in the form of x and should be lowerCased
     </p>
    <p>
    Select a and b such that f(a) and f(b) have opposite signs.
    </p>
      </Modal.Content>
      <Modal.Actions>
      <Button color='green' onClick={() => this.setState({ modalOpen: false })} inverted>
      <Icon name='checkmark' /> Got it
    </Button>

    </Modal.Actions>
  </Modal>

        <div className="nav">
        <div>Bisection Method</div>
        </div>
        <form onSubmit={this.submitHandler}>
        <div className="initialInputs">

        <div>     <input ref="a" className="input" name="eq" placeholder="Enter an equation in the form of x"  /></div>
        <div>
        <input ref="b" type="text" className="input" name="a" placeholder="value of a"  value={this.state.IA} onChange={this.onChangeA}/>
        </div>
        <div> <input type='text' ref="c" className="input" name="b" placeholder="value of b" value={this.state.IB} onChange={this.onChangeB}  /></div>
        {this.state.answer &&<p>answer is <b> {
          this.state.answer
        } </b></p>}
        <div className="but">   <Button disabled={!(this.state.IA&&this.state.IB&&!this.state.submitDisabled)} positive content="Submit" /></div>

        </div>
        </form>
        {
          this.state.equation &&<div className="buttonsDiv">
          <div> <Button onClick={this.handleGraph} color={this.state.showGraph?"red":"teal"} content={this.state.showGraph ? "Close Graph" : "Show Graph"}/></div>
          <div>  <Button onClick={this.handleTable} color={this.state.showTable?"red":"teal"} content={this.state.showTable ? "Close Table" : "Show Table"}/></div>
          <div>  <Button onClick={this.handleClear} color="olive" content="Clear" /></div>

          </div>
        }
        {this.state.showGraph && <Plot
          data={[{
            x: this.state.xValues,
            y: this.state.yValues,
            type: 'scatter',
            mode: 'lines+markers',
            line: {shape: 'spline'},
          }
        ]}
        layout={{
          title: 'Bisection Method',
          autosize: true,
          annotations:annotations,
          dragmode:'pan'

        }}

        config={{
          scrollZoom:true,
          showLink:true,
        }}
        // useResizeHandler={true}
        style={{

          width: "100%",
          height: "70%"
        }}
        />
      }
      { this.state.showTable &&
        <Tabl a={this.state.tableA} b={this.state.tableB} c={this.state.tableC} foa={this.state.tableFA} fob={this.state.tableFB} foc={this.state.tableFC} diff={this.state.tableBDiffA}
        />
      }


      </div>}
      </div>
      );
    }
  }

  export default App;
