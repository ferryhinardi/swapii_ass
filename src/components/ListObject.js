import React, { Component } from 'react';
import { ListItem, ListItemContent } from 'react-mdl';

export default class ListObject extends Component {
	render() {
		this.fields = this.props.fields;
		this.data = this.props;
		const width = (100 / Object.keys(this.fields).length);
		const { onRowClick } = this.props;
		return (
			<ListItem style={{cursor: 'pointer'}} className="hover" onClick={onRowClick}>
				{Object.keys(this.fields).map((field, i) => {
						return (
							<ListItemContent style={{width: width}} key={i}>{this.data[field]}</ListItemContent>
						);
					})
				}
			</ListItem>
		);
	}
}