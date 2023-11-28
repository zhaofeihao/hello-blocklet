import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import GitHubIcon from '@mui/icons-material/GitHub';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import PropTypes from 'prop-types';

const styles = {
  details: {
    padding: '1rem',
    borderTop: '1px solid #e1e1e1',
  },
  value: {
    padding: '1rem 2rem',
    borderTop: '1px solid #e1e1e1',
    color: '#899499',
  },
};

ProfileCard.propTypes = {
  user: PropTypes.object,
  followers: PropTypes.string,
  following: PropTypes.string,
};

ProfileCard.defaultProps = {
  user: {
    name: '',
    title: '',
  },
  followers: '0',
  following: '0',
};

export default function ProfileCard(props) {
  return (
    <Card variant="outlined">
      <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item sx={{ p: '1.5rem 0rem', textAlign: 'center' }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: '5px solid white',
                  backgroundColor: '#ff558f',
                  borderRadius: '50%',
                  padding: '.2rem',
                  width: 35,
                  height: 35,
                }}
              />
            }>
            <Avatar sx={{ width: 100, height: 100, mb: 1.5 }} src="https://ik.imagekit.io/bayc/assets/ape1.png" />
          </Badge>

          <Typography variant="h6">{props.user.userName}</Typography>
          <Typography color="text.secondary">{props.user.title}</Typography>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Typography style={styles.details}>Followers</Typography>
            <Typography style={styles.details}>Following</Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'end' }}>
            <Typography style={styles.value}>{props.followers}</Typography>
            <Typography style={styles.value}>{props.following}</Typography>
          </Grid>
        </Grid>

        <Grid item style={styles.details} sx={{ width: '100%' }}>
          <Chip icon={<GitHubIcon />} label="Github" onClick={() => window.open('https://github.com/zhaofeihao')} />
        </Grid>
      </Grid>
    </Card>
  );
}
