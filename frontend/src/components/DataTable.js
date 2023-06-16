import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

export default function DataTable({ rows, setLoading, getPeopleFromDatabase }) {
	const deletePerson = async (id) => {
		setLoading(true);
		try {
			await axios.delete('http://localhost:8000/people/' + id);
			getPeopleFromDatabase();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Index</TableCell>
						<TableCell>First name</TableCell>
						<TableCell>Last name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Job Title</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row._id}>
							<TableCell>{row.index}</TableCell>
							<TableCell>{row.firstName}</TableCell>
							<TableCell>{row.lastName}</TableCell>
							<TableCell>{row.email}</TableCell>
							<TableCell>{row.phone}</TableCell>
							<TableCell>{row.jobTitle}</TableCell>
							<TableCell>
								<Button
									onClick={() => deletePerson(row._id)}
									color="error"
									variant="contained"
								>
									delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
