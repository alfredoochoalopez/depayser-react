import React from "react";
import "./Genders.scss";
class Genders extends React.Component {
    render() {
        const { params } = this.props.match
        return (
            <div>
                <p>{params.id}</p>
            </div>
        )
    }
}
export default Genders