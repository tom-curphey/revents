import React from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Segment, Button, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import { Label } from 'semantic-ui-react';
import SocialLogin from '../SocialLogin/SocialLogin';

const actions = {
	registerUser
};

const validate = combineValidators({
	displayName: isRequired('displayName'),
	email: isRequired({ message: 'Please add yoru email' }),
	password: isRequired('password')
});

const RegisterForm = ({
	handleSubmit,
	registerUser,
	error,
	invalid,
	submitting
}) => {
	return (
		<div>
			<Form size="large" onSubmit={handleSubmit(registerUser)}>
				<Segment>
					<Field
						name="displayName"
						type="text"
						component={TextInput}
						placeholder="Known As"
					/>
					<Field
						name="email"
						type="text"
						component={TextInput}
						placeholder="Email"
					/>
					<Field
						name="password"
						type="password"
						component={TextInput}
						placeholder="Password"
					/>
					{error && (
						<Label basic color="red">
							{error}
						</Label>
					)}
					<Button
						disabled={invalid || submitting}
						fluid
						size="large"
						color="teal"
					>
						Register
					</Button>
					<Divider horizontal>or</Divider>
					<SocialLogin />
				</Segment>
			</Form>
		</div>
	);
};

export default connect(null, actions)(
	reduxForm({ form: 'registerForm', validate })(RegisterForm)
);
