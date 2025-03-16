// components/common/ConfirmDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import React from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  content: string
  confirmButtonText: string
  cancelButtonText: string
  confirmButtonColor?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'neutral'
  onConfirm: () => void
  onCancel: () => void
  disabled?: boolean
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  content,
  confirmButtonText,
  cancelButtonText,
  confirmButtonColor = 'error',
  onConfirm,
  onCancel,
  disabled = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="neutral">
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmButtonColor}
          disabled={disabled}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
