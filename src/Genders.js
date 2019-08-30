import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { http } from "./App";
import "./Genders.scss";
import Loader from "./Loader";
class Genders extends React.Component {
    constructor(props) {
        super(props);
        this.filter = this.filter.bind(this);
        this.state = { data: [], from: {}, filter: '' };
    }
    get movies() {
        return this.state.data.filter(item => item.title.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1)
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
            isCacheable: "true",
            node: `gen_${id}`,
            domain: "https://mfwkweb-api.clarovideo.net/",
            origin: "https://www.clarovideo.com/",
        }
        http.get('services/cms/level', { params: params }).then(response => http.get(`${response.data.response.modules.module.find(item => item.type === 'listadoinfinito').components.component.find(item => item.type === 'Listadoinfinito').properties.url}`, { params: response.data.entry }))
            .then(response => {
                this.setState({ data: response.data.response.groups })
            })
    }
    filter(event){
        this.setState({filter: event.target.value});        
    }
    render() {
        return (
            this.state.data.length > 0 ?
                <>
                    <Row className="pt-0 pl-5 pr-5 m-5">
                        <Col className="col-6 offset-3 ">
                            <FormControl
                                placeholder="Filtrar lista de películas"
                                aria-label="filter"
                                aria-describedby="filter-movies"
                                onChange={this.filter}
                            />
                        </Col>
                    </Row>
                    <Row className="pt-0 pl-5 pr-5 justify-content-center">
                        {this.movies.map(movie => <Col key={movie.id} className="col-auto p-0 m-1 mb-3"> <Link to={"/detalles/" + movie.id}> <img className="movie" src={movie.image_small} alt={movie.title} /></Link></Col>)}
                    </Row>
                </>
                : <Loader />

        );
    }
}
export default Genders