import React, { Component } from 'react';
import { Grid, Cell } from 'react-mdl';
import { Link } from 'react-router';
import StringHelper from '../utils/stringHelper';

export default class DetialObject extends Component {
	render() {
		return (
			<div>
					{
						Object.keys(this.props.fields).map((field, index) => {
							return (
								<Grid key={index}>
									<Cell col={12} key={index} className="header-detail-object">
										{this.props.fields[field]}
									</Cell>

									<Grid>
										{
											typeof(this.props[field]) === 'object' ?
												Object.keys(this.props[field]).map((subField, i) => {
													return (
														<Cell col={6} className="hover" key={i}>
															<Link key={i} to={`/${StringHelper.getFullRoutes(this.props[field][subField])}`}>
																{this.props[field][subField]}
															</Link>
														</Cell>
													)
												}) :
											<Cell col={12}>{this.props[field]}</Cell>
										}
									</Grid>
								</Grid>
							)
						})
					}
			</div>
		)
	};
}