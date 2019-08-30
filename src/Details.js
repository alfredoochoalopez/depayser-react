import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { http } from "./App";
import "./Details.scss";
import Loader from "./Loader";

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = { movie: {}, doneLoading: false, genders: '', talents: [] };
    }
    UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;
        const params = {
            api_version: "v5.86",
            authpn: "webclient",
            authpt: "tfg1h3j4k6fd7",
            format: "json",
            region: "mexico",
            device_id: "web",
            device_category: "web",
            device_model: "web",
            device_type: "web",
            device_manufacturer: "generic",
            HKS: "9s5qq76r3g6sg4jb90l38us52",
            user_id: "22822863",
            group_id: id
        }
        http.get('services/content/data', { params: params })
            .then(response => {
                const movie = response.data.response.group.common;
                const genders = movie.extendedcommon.genres.genre.map(item => item.desc).join(", ");
                const talents = movie.extendedcommon.roles.role.map(rol => rol.talents.talent.map(talent => ({id:talent.id+rol.id, rol: rol.desc, name: `${talent.name} ${talent.surname}` }))).reduce((prev, next) => prev.concat(next))

                this.setState({ movie: movie })
                this.setState({ genders: genders })
                this.setState({ talents: talents })
                this.setState({ doneLoading: true })
            })
    }
    render() {
        return (
            this.state.doneLoading ?
                <div className="details">
                    <img className="background" src={this.state.movie.image_background} alt="Background" />
                    <Row className="p-md-5 pl-5 pr-5 pt-5">
                        <Col className="align-self-center">
                        <Button onClick={this.props.history.goBack} variant="outline-dark">
                                <div className="back"  >
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAQAAABIkb+zAAAAw0lEQVR4Ae3bAQYCQRxG8dHFQlcJVECAUAB0g4AFA3TE/hkBKGut+Pi9E7y3i11jvob1AADULlt/X6+akvU/TNn6g56tP+jZ+oNem2T9wTMioQ71nVPI0097A/Tp0z/SnwN9+vTp06dP/0x/PejTp0+/h+u3H9Cnf83Wv9NfCv1bsP6gLjM+XH4dJEiQIEGCBAkSJDhalyBBggQJEiRIkODapQQJEuYOII6t5U9QjIDMsBYkhG/5wteUj5ZMbRsAAH/kDV0KbHkrxAFEAAAAAElFTkSuQmCC" alt="back icon" />
                                    <p>Regresar</p>
                                </div>
                                </Button>
                        </Col>
                    </Row>

                    <Row className="pl-5 pr-5 mt-md-5">
                        <Col md={4} xs={12}>
                            <img className="base" src={this.state.movie.image_base_horizontal} alt="Movie thumbnail" />
                        </Col>
                        <Col >
                            <Row>
                                <Col>
                                    <h3>{this.state.movie.title}</h3>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.state.movie.extendedcommon.media.originaltitle} ({this.state.movie.extendedcommon.media.publishyear}) {this.state.movie.extendedcommon.media.rating.code}

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong>Duración:</strong> {this.state.movie.extendedcommon.media.duration}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {this.state.movie.description_large}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <strong>Géneros:</strong> {this.state.genders}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="pl-5 pr-5 mt-3 mb-3">
                        {this.state.talents.map(talent => <Col key={talent.id} xs={3} md={2} className="text-center"><img className="talents-slide_image" width="80" height="80" src="data:image/png;base64,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" alt={"Talent: " + talent.name} /><br />{talent.name}<br /><small>{talent.rol}</small></Col>)}
                    </Row>
                </div >
                : <Loader />

        );
    }
}
export default Details