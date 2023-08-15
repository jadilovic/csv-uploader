require('dotenv').config();
const axios = require('axios');

const GO_REST_TOKEN = process.env.TOKEN;

const fetchingData = async () => {
	try {
		const response = await fetch('https://gorest.co.in/public/v2/users', {
			method: 'post',
			headers: {
				Authorization: `Bearer ${GO_REST_TOKEN}`,
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: JSON.stringify({
				email: 'hello@dot6.com',
				name: 'cuni',
				gender: 'male',
				status: 'active',
			}),
			mode: 'cors',
			cache: 'default',
		});
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error.message);
	}
};

const axiosData = async () => {
	const user = {
		email: 'hello@dot5.com',
		name: 'cuni',
		gender: 'male',
		status: 'active',
	};
	try {
		const response = await axios.post(
			'https://gorest.co.in/public/v2/users',
			user,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${GO_REST_TOKEN}`,
				},
			}
		);
		console.log(response.data);
	} catch (error) {
		console.log(error.message);
	}
};
fetchingData();
// axiosData();
