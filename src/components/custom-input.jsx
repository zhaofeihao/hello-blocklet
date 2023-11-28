import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

CustomInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  dis: PropTypes.bool,
  req: PropTypes.bool,
  type: PropTypes.string,
  InputProps: PropTypes.object,
  select: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.array,
};

CustomInput.defaultProps = {
  id: '',
  name: '',
  value: '',
  onChange: () => {},
  dis: false,
  req: false,
  type: 'text',
  InputProps: {},
  select: false,
  title: '',
  content: [],
};

export default function CustomInput(props) {
  return (
    <Box>
      <label style={{ fontWeight: 'bold' }} htmlFor={props.id}>
        {props.title}
      </label>
      <TextField
        fullWidth
        margin="dense"
        size="small"
        autoComplete="off"
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={props.dis}
        required={props.req}
        type={props.type}
        InputProps={props.InputProps}
        select={props.select}>
        {props.content}
      </TextField>
    </Box>
  );
}
