import Button from '@mui/material/Button'

// eslint-disable-next-line react/prop-types
const CustomButton = ({title, clickHandler, type}) => {

  const ConfirmButton = () => {
    return (
      <Button
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          height: 'fit-content',
          borderRadius: 2,
          fontSize: 10,
          ':hover': {
            backgroundColor: 'primary.light',
            boxShadow: 5
          }
        }}
        onClick={clickHandler}
      >
        {title}
      </Button>
    )
  }

  const CancelButton = () => {
    return (
      <Button
        sx={{
          backgroundColor: 'brown',
          color: 'primary.contrastText',
          height: 'fit-content',
          borderRadius: 2,
          fontSize: 10,
          ':hover': {
            backgroundColor: 'red',
            boxShadow: 5
          }
        }}
        onClick={clickHandler}
      >
        {title}
      </Button>
    )
  }

  const button = {
    confirm: <ConfirmButton/>,
    cancel: <CancelButton/>
  }[type]

  return button
}

export default CustomButton