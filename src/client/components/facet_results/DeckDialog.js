import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { withStyles } from '@mui/styles'
import { Typography } from '@mui/material'
// import Typography from '@material-ui/core/Typography'
// import InstanceList from '../main_layout/InstanceList'
// import { Link } from 'react-router-dom'

const styles = () => ({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '60vh'
  }
})

const DeckDialog = props => {
  const {
    classes, onClose
  } = props

  const data = props.data[0]

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      open
      onClose={onClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogContent>
        <>
          <Typography>Label: {data.prefLabel}</Typography>
          <Typography>URI: {data.id}</Typography>
          <Typography>polygon source: {data.polygonSource}</Typography>
        </>
      </DialogContent>
    </Dialog>
  )
}

DeckDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default withStyles(styles)(DeckDialog)
