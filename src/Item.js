import React, { useState, useRef } from "react";
import soundTask from "./audio.mp3";
import { FormControlLabel, Checkbox, withStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const RedCheckbox = withStyles({
	root: {
		color: red[400],
		"&$checked": {
			color: red[600],
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

function Item({
	id,
	toDo,
	checked,
	handleRemove,
	handleEdit,
	handleChecked,
	handleValue,
}) {
	const [isDisabled, setIsDisabled] = useState(false);
	const [edit, setEdit] = useState(toDo);
	const [isEditing, setIsEditing] = useState(true);
	const [isChecked, setIsChecked] = useState(checked);
	const [isRemoved, setIsRemoved] = useState(false);
	const audio = useRef();
	const focus = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (edit) {
			handleEdit(id, edit);
			setIsDisabled(false);
			setIsEditing(true);
		} else handleValue();
	};
	const buttonRemove = () => {
		setIsRemoved(true);
		setTimeout(() => handleRemove(id), 900);
	};
	const handleChange = () => {
		setIsChecked((prevState) => !prevState);
		handleChecked(id, !isChecked);
		if (!isChecked) audio.current.play();
	};
	const buttonEdit = () => {
		setIsDisabled(true);
		setIsEditing(false);
		focus.current.focus();
	};

	return (
		<div className={`item ${isRemoved && "item__removed"}`}>
			<div>
				<FormControlLabel
					control={
						<RedCheckbox
							checked={isChecked}
							onChange={handleChange}
							name="checkedB"
							color="primary"
							style={{ display: isDisabled && "none" }}
						/>
					}
				/>
				<h4 hidden={isDisabled}>{edit}</h4>
				<audio ref={audio}>
					<source src={soundTask} />
				</audio>
				<form onSubmit={handleSubmit} className="item__form">
					<input
						type="text"
						value={edit}
						ref={focus}
						placeholder="Edit Her..."
						onChange={(e) => setEdit(e.target.value)}
						hidden={isEditing}
					/>
				</form>
			</div>
			<div>
				{isEditing ? (
					<button className="btn" onClick={buttonEdit}>
						<i class="fas fa-edit"></i>
					</button>
				) : (
					<button
						className="btn"
						onClick={() => {
							setIsDisabled(false);
							setIsEditing(true);
						}}
					>
						<i class="fas fa-window-close"></i>
					</button>
				)}
				<button className="btn" onClick={buttonRemove}>
					<i class="fas fa-trash-alt"></i>
				</button>
			</div>
		</div>
	);
}

export default Item;
