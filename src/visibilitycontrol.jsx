import React from 'react';
export class VisibilityControl extends React.Component{
    render=()=>
    <div className="form-check">
        <input type="checkbox" className="form-check-input"
        onChange={(e)=>this.props.callback(e.target.checked)}/>
        <label className="form-check-label">
            Show {this.props.description}
        </label>
    </div>
}