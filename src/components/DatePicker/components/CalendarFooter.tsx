type CalendarFooterProps = {
  clearDateText?: string
  confirmText?: string
  onClearDateClick: () => void
  onConfirmClick: () => void
}

export const CalendarFooter = ({
  clearDateText,
  confirmText,
  onClearDateClick,
  onConfirmClick
}: CalendarFooterProps) => {
  return (
    <div className="datepicker__footer">
      <button
        className="datepicker__footer__clear-date-button datepicker__footer__button"
        onClick={onClearDateClick}
      >
        <span>{clearDateText ?? '날짜 지우기'}</span>
      </button>
      <button
        className="datepicker__footer__confirm-button datepicker__footer__button"
        onClick={onConfirmClick}
      >
        <span>{confirmText ?? '확인'}</span>
      </button>
    </div>
  )
}
