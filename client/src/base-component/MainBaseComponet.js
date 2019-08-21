import React, { Component } from 'react'

export default class MainBaseComponet extends Component {
    render() {
        const {base} = this.props.match.params
        console.log(base)
        return (
            <div className="flex-center" style={{height: "70vh"}}>
                <h1 className="display-1 text-info">
                    {
                        base + ' Coming Soon'
                    }
                </h1>
            </div>
        )
    }
}
