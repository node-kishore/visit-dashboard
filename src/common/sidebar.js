import React, { Component } from 'react';
import IMAGE from './image';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

    render() {
        return (
            <div className="side_nav">
                <ul className="side_navigation">
                    <li className={"overview" + (window.location.pathname === '/dashboard' ? " active" : "")}>
                        <Link to="/dashboard">
                            <svg x="0px" y="0px"
                            	 width="611.997px" height="611.998px" viewBox="0 0 611.997 611.998" style={{enableBackground: "new 0 0 611.997 611.998"}}>
                                <g>
                                	<g>
                                		<path d="M511.114,300.251c-9.94,0-17.638,7.663-17.638,17.651v241.105H368.401v-98.453c0-9.236-7.697-17.31-17.002-17.31h-90.435
                                			c-9.948,0-17.96,8.073-17.96,17.31v98.453h-124.76v-233.1c0-9.306-7.69-17.036-17.638-17.036c-9.298,0-16.995,7.73-16.995,17.036
                                			v250.752c0,9.305,7.697,17.036,16.995,17.036h160.358c9.298,0,16.995-7.731,16.995-17.036v-98.454h55.801v98.454
                                			c0,9.305,7.697,17.036,17.639,17.036h159.715c9.299,0,16.995-7.731,16.995-17.036V317.903
                                			C528.109,307.915,520.413,300.251,511.114,300.251z"/>
                                		<path d="M607.003,314.003L467.819,174.225V78.919c0-9.921-8.019-17.583-17.96-17.583c-9.305,0-17.001,7.663-17.001,17.583v60.345
                                			L318.046,23.774c-3.518-3.558-7.697-5.474-11.864-5.474c-4.81,0-8.983,1.984-12.507,5.474L5.361,312.087
                                			c-6.917,6.91-7.375,17.994,0,24.357c6.411,7.389,17.454,6.91,24.371,0l276.45-275.793l275.807,278.393
                                			c2.873,2.874,7.054,4.516,12.507,4.516c4.81,0,8.976-1.642,12.507-4.516C613.42,332.613,613.899,320.982,607.003,314.003z"/>
                                	</g>
                                </g>
                            </svg>
                            Dashboard
                        </Link>
                    </li>
                    <li className={"overview" + (window.location.pathname === '/timeline' ? " active" : "")}>
                        <Link to="/timeline">
                            <svg version="1.1" id="Layer_1" x="0px" y="0px"
                            	 viewBox="0 0 512 512" style={{enableBackground: "new 0 0 512 512"}}>
                                <g>
                                	<g>
                                		<path d="M304.188,84.329V0h-96.376v84.329l30.118,30.118v357.575c-3.737,4.245-6.024,9.797-6.024,15.884
                                			C231.906,501.191,242.715,512,256,512c13.286,0,24.094-10.809,24.094-24.094c0-6.087-2.286-11.637-6.023-15.884V114.447
                                			L304.188,84.329z"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<rect x="310.212" y="192.753" width="114.447" height="72.282"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<rect x="15.059" y="192.753" width="186.729" height="72.282"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<rect x="310.212" y="337.318" width="186.729" height="72.282"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<rect x="15.059" y="337.318" width="186.729" height="72.282"/>
                                	</g>
                                </g>
                            </svg>
                            Timeline
                        </Link>
                    </li>
                    <li>
                        <Link to="/update-visits">
                            <svg version="1.1" id="Capa_1" x="0px" y="0px"
                            	 viewBox="0 0 477.867 477.867" style={{enableBackground: "new 0 0 477.867 477.867"}}>
                                <g>
                                	<g>
                                		<path d="M409.6,0c-9.426,0-17.067,7.641-17.067,17.067v62.344C304.667-5.656,164.478-3.386,79.411,84.479
                                			c-40.09,41.409-62.455,96.818-62.344,154.454c0,9.426,7.641,17.067,17.067,17.067S51.2,248.359,51.2,238.933
                                			c0.021-103.682,84.088-187.717,187.771-187.696c52.657,0.01,102.888,22.135,138.442,60.976l-75.605,25.207
                                			c-8.954,2.979-13.799,12.652-10.82,21.606s12.652,13.799,21.606,10.82l102.4-34.133c6.99-2.328,11.697-8.88,11.674-16.247v-102.4
                                			C426.667,7.641,419.026,0,409.6,0z"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<path d="M443.733,221.867c-9.426,0-17.067,7.641-17.067,17.067c-0.021,103.682-84.088,187.717-187.771,187.696
                                			c-52.657-0.01-102.888-22.135-138.442-60.976l75.605-25.207c8.954-2.979,13.799-12.652,10.82-21.606
                                			c-2.979-8.954-12.652-13.799-21.606-10.82l-102.4,34.133c-6.99,2.328-11.697,8.88-11.674,16.247v102.4
                                			c0,9.426,7.641,17.067,17.067,17.067s17.067-7.641,17.067-17.067v-62.345c87.866,85.067,228.056,82.798,313.122-5.068
                                			c40.09-41.409,62.455-96.818,62.344-154.454C460.8,229.508,453.159,221.867,443.733,221.867z"/>
                                	</g>
                                </g>
                            </svg>
                            Update Visits
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <svg version="1.1" id="Layer_1" x="0px" y="0px"
                            	 viewBox="0 0 511.999 511.999" style={{enableBackground: "new 0 0 511.999 511.999"}}>
                                <g>
                                	<g>
                                		<path d="M456.347,66.782c-78.946,0-133.478-25.577-191.087-63.978c-5.609-3.739-12.914-3.739-18.522,0
                                			c-57.597,38.401-112.14,63.978-191.086,63.978c-9.217,0-16.696,7.479-16.696,16.696v175.327
                                			c0,125.881,90.131,232.272,214.293,252.967c0.913,0.152,1.836,0.228,2.75,0.228c0.914,0,1.837-0.076,2.75-0.228
                                			c124.162-20.696,214.293-127.087,214.293-252.967V83.477C473.043,74.26,465.565,66.782,456.347,66.782z M256,400.695
                                			c-82.858,0-150.261-67.403-150.261-150.261S173.141,100.173,256,100.173S406.26,167.576,406.26,250.434
                                			S338.858,400.695,256,400.695z"/>
                                	</g>
                                </g>
                                <g>
                                	<g>
                                		<path d="M256,133.564c-64.445,0-116.87,52.424-116.87,116.87c0,26.769,9.141,51.387,24.334,71.111
                                			c16.63-13.115,35.611-22.511,55.911-27.656c-14.919-11.176-24.594-28.991-24.594-49.021c0-33.75,27.468-61.217,61.217-61.217
                                			c33.75,0,61.217,27.468,61.217,61.217c0,20.027-9.672,37.841-24.589,49.017c20.304,5.14,39.29,14.526,55.929,27.629
                                			c15.181-19.721,24.312-44.327,24.312-71.081C372.869,185.989,320.445,133.564,256,133.564z"/>
                                	</g>
                                </g>
                            </svg>
                            Accounts
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <svg version="1.1" id="Capa_1" x="0px" y="0px"
                            	 viewBox="0 0 213.275 213.275" style={{enableBackground: "new 0 0 213.275 213.275"}}>
                                <g>
                                	<path d="M183.743,0H29.532c-4.142,0-7.5,3.358-7.5,7.5v198.275c0,4.142,3.358,7.5,7.5,7.5h103.555c1.989,0,3.896-0.79,5.304-2.197
                                		l50.656-50.658c1.406-1.407,2.196-3.314,2.196-5.303V7.5C191.243,3.358,187.886,0,183.743,0z M37.032,15h139.211v132.615h-43.154
                                		c-4.143,0-7.5,3.358-7.5,7.5v8.275H73.562c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h52.027v19.885H37.032V15z
                                		 M140.589,162.615h25.051l-25.051,25.051V162.615z"/>
                                	<path d="M106.544,84.643c16.497,0,29.918-13.424,29.918-29.925c0-16.501-13.421-29.926-29.918-29.926
                                		c-16.498,0-29.921,13.425-29.921,29.926C76.623,71.219,90.046,84.643,106.544,84.643z M106.544,39.792
                                		c8.226,0,14.918,6.696,14.918,14.926c0,8.229-6.692,14.925-14.918,14.925c-8.228,0-14.921-6.695-14.921-14.925
                                		C91.623,46.488,98.316,39.792,106.544,39.792z"/>
                                	<path d="M73.562,138.528c4.143,0,7.5-3.358,7.5-7.5v-12.447c0-7.828,6.371-14.196,14.201-14.196h22.744
                                		c7.834,0,14.207,6.368,14.207,14.196v12.447c0,4.142,3.357,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5v-12.447
                                		c0-16.099-13.103-29.196-29.207-29.196H95.263c-16.102,0-29.201,13.097-29.201,29.196v12.447
                                		C66.062,135.17,69.419,138.528,73.562,138.528z"/>
                                </g>
                            </svg>
                            Campaign Accounts
                        </Link>
                    </li>
                    {/*<li><a href="/dashboard">Import Accounts</a></li>*/}
                    <li>
                        <Link to="#">
                            <svg version="1.1" id="Capa_1" x="0px" y="0px"
                            	 viewBox="0 0 32 32" style={{enableBackground: "new 0 0 32 32"}}>
                                <g>
                                	<g id="news">
                                		<path d="M29,0H7C5.343,0,4,1.342,4,3v2H3C1.343,5,0,6.342,0,8v20c0,2.209,1.791,4,4,4h24
                                			c2.209,0,4-1.791,4-4V3C32,1.342,30.656,0,29,0z M30,28c0,1.102-0.898,2-2,2H4c-1.103,0-2-0.898-2-2V8c0-0.552,0.448-1,1-1h1v20
                                			c0,0.553,0.447,1,1,1s1-0.447,1-1V3c0-0.552,0.448-1,1-1h22c0.551,0,1,0.448,1,1V28z"/>
                                		<path d="M19.498,13.005h8c0.277,0,0.5-0.224,0.5-0.5s-0.223-0.5-0.5-0.5h-8c-0.275,0-0.5,0.224-0.5,0.5
                                			S19.223,13.005,19.498,13.005z"/>
                                		<path d="M19.498,10.005h8c0.277,0,0.5-0.224,0.5-0.5s-0.223-0.5-0.5-0.5h-8c-0.275,0-0.5,0.224-0.5,0.5
                                			S19.223,10.005,19.498,10.005z"/>
                                		<path d="M19.498,7.005h8c0.277,0,0.5-0.224,0.5-0.5s-0.223-0.5-0.5-0.5h-8c-0.275,0-0.5,0.224-0.5,0.5
                                			S19.223,7.005,19.498,7.005z"/>
                                		<path d="M16.5,27.004h-8c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h8
                                			c0.275,0,0.5-0.223,0.5-0.5C17,27.229,16.776,27.004,16.5,27.004z"/>
                                		<path d="M16.5,24.004h-8c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h8
                                			c0.275,0,0.5-0.223,0.5-0.5C17,24.229,16.776,24.004,16.5,24.004z"/>
                                		<path d="M16.5,21.004h-8c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h8
                                			c0.275,0,0.5-0.223,0.5-0.5C17,21.229,16.776,21.004,16.5,21.004z"/>
                                		<path d="M27.5,27.004h-8c-0.277,0-0.5,0.225-0.5,0.5c0,0.277,0.223,0.5,0.5,0.5h8
                                			c0.275,0,0.5-0.223,0.5-0.5C28,27.229,27.775,27.004,27.5,27.004z"/>
                                		<path d="M27.5,24.004h-8c-0.277,0-0.5,0.225-0.5,0.5c0,0.277,0.223,0.5,0.5,0.5h8
                                			c0.275,0,0.5-0.223,0.5-0.5C28,24.229,27.775,24.004,27.5,24.004z"/>
                                		<path d="M27.5,21.004h-8c-0.277,0-0.5,0.225-0.5,0.5c0,0.277,0.223,0.5,0.5,0.5h8
                                			c0.275,0,0.5-0.223,0.5-0.5C28,21.229,27.775,21.004,27.5,21.004z"/>
                                		<path d="M27.5,15.004h-19c-0.276,0-0.5,0.224-0.5,0.5s0.224,0.5,0.5,0.5h19c0.275,0,0.5-0.224,0.5-0.5
                                			S27.775,15.004,27.5,15.004z"/>
                                		<path d="M27.5,18.004h-19c-0.276,0-0.5,0.225-0.5,0.5c0,0.277,0.224,0.5,0.5,0.5h19
                                			c0.275,0,0.5-0.223,0.5-0.5C28,18.229,27.775,18.004,27.5,18.004z"/>
                                		<path d="M9,13h7c0.553,0,1-0.447,1-1V5.004c0-0.553-0.447-1-1-1H9c-0.553,0-1,0.447-1,1V12
                                			C8,12.552,8.447,13,9,13z M10,6h5v5h-5V6z"/>
                                	</g>
                                </g>
                            </svg>
                            Reports
                        </Link>
                    </li>
                </ul>
                <div className="salesgo_logo">
                    <img src={IMAGE.salesgo_ico} alt="" />
                </div>
            </div>
        )
    }

}

export default Sidebar;
