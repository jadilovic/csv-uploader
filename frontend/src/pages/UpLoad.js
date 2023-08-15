import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Button } from '@mui/material';
import DataTable from '../components/DataTable';

export default function UpLoad() {
	const [file, setFile] = useState('');
	const [people, setPeople] = useState([]);
	const [loading, setLoading] = useState(true);
	const inputRef = useRef(null);

	useEffect(() => {
		getPeopleFromDatabase();
	}, [loading]);

	const handleOnChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (file) {
			try {
				const formData = new FormData();
				formData.append('file', file);
				await axios.post('http://localhost:8000/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});
				setFile('');
				resetFileInput();
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const getPeopleFromDatabase = async () => {
		try {
			const response = await axios.get('http://localhost:8000/people');
			setPeople(response.data);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const resetFileInput = () => {
		inputRef.current.value = null;
	};

	return (
		<Container component="main" maxWidth="lg">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<UploadFileIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Upload File
				</Typography>
				<form>
					<input
						ref={inputRef}
						style={{ marginTop: '3em', cursor: 'pointer' }}
						type={'file'}
						id={'csvFileInput'}
						accept={'.csv'}
						onChange={handleOnChange}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						onClick={(e) => {
							handleOnSubmit(e);
						}}
					>
						Import CSV File
					</Button>
				</form>
			</Box>
			{loading ? (
				<Alert>Loading...</Alert>
			) : (
				<DataTable
					rows={people}
					setLoading={setLoading}
					getPeopleFromDatabase={getPeopleFromDatabase}
				/>
			)}
		</Container>
	);
}
