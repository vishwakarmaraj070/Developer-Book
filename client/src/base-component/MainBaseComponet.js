import React, { Component } from 'react'

export default class MainBaseComponet extends Component {
    render() {
        const {base} = this.props.match.params
        return (
            <div>
                {
                    base
                }
            </div>
        )
    }
}
