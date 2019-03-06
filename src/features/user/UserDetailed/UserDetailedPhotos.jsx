import React from 'react';
import { Grid, Segment, Header, Image } from 'semantic-ui-react';

const UserDetailedPhotos = ({ photos }) => {
	return (
		<Grid.Column width={12}>
			<Segment attached>
				<Header icon="image" content="Photos" />

				<Image.Group size="small">
					{photos &&
						photos.map((photos) => (
							<Image key={photos.id} src={photos.url} />
						))}
				</Image.Group>
			</Segment>
		</Grid.Column>
	);
};

export default UserDetailedPhotos;
