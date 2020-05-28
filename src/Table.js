import React from 'react'
// import {BootsdivapTable, TableHeaderColumn} from 'react-bootsdivap-table';
// import '../css/Table.css'; import
// '../../node_modules/react-bootsdivap-table/css/react-bootsdivap-table.css'
// import Table from 'react-bootsdivap/lib/Table'
import './Table.css'
const Tabl = ({
a,
b,
c,
foa,
fob,
foc,
diff
}) => {

return (
<div>
  {a[0]&& <div className="body">

    <div className="head">

      <div>a</div>
      <div>b</div>
      <div>f(a)</div>
      <div>f(b)</div>
      <div>c</div>
      <div>f(c)</div>
      <div>b-a</div>

    </div>
    <div className="baap">
      <div className="td">{
        a.map(a=><div>{a.toFixed(4)}</div>)
        }
      </div>
      <div className="td">
        {b.map(a=><div>{a.toFixed(4)}</div>)}
      </div>
      <div className="td">
        {foa.map(a=><div>{a.toFixed(4)}</div>)}
      </div>
      <div className="td">
        {fob.map(a=><div>{a.toFixed(4)}</div>)}
      </div>
      <div className="td">
        {c.map(a=><div>{a.toFixed(4)}</div>)}
      </div>
      <div className="td">
        {foc.map(a=><div>{a.toFixed(4)}</div>)}
      </div>
      <div className="td">
        {diff.map(a=><div>{a.toFixed(4)}</div>)}
      </div>

    </div>
  </div>
  }
</div>

)
}

export default Tabl