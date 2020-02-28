import React, { Component } from "react";
import TechItem from "./TechItem";

export default class TechList extends Component {
	state = {
		newTech: "",
		techs: []
	};

	componentDidMount() {
		const techs = localStorage.getItem("techs");

		if (techs) {
			this.setState({ techs: JSON.parse(techs) });
		}
	}

	componentDidUpdate(_, prevState) {
		if (prevState.techs !== this.state.techs) {
			localStorage.setItem("techs", JSON.stringify(this.state.techs));
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.setState({
			techs: [...this.state.techs, this.state.newTech],
			newTech: ""
		});
	};

	handleChange = e => {
		this.setState({ newTech: e.target.value });
	};

	handleDelete = tech => {
		this.setState({ techs: this.state.techs.filter(t => t !== tech) });
	};

	render() {
		return (
			<>
				<form onSubmit={this.handleSubmit}>
					<ul>
						{this.state.techs.map(tech => (
							<TechItem
								key={tech}
								tech={tech}
								onDelete={() => this.handleDelete(tech)}
							/>
						))}
					</ul>

					<input
						type="text"
						value={this.state.newTech}
						onChange={this.handleChange}
					/>

					<button type="submit">Salvar</button>
				</form>
			</>
		);
	}
}
