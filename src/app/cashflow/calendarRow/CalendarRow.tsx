import { useDispatch, useSelector } from 'react-redux';
import {
  selectCalendar,
  updateCalendarCost,
} from '../lib/reducers/calendarSlice';
import NumberInput from 'app/components/NumberInput';

export default function CalendarRow({ id }: { id: string }) {
  const dispatch = useDispatch();
  const calendarDates = useSelector(selectCalendar);
  return (
    <div className="gridRow">
      {Object.keys(calendarDates).map((date, idx) => {
        return (
          <span className="gridCol" key={idx}>
            <NumberInput
              id={`${id}_${date}`}
              value={calendarDates[date]?.[id] || ''}
              setValue={(e) => {
                dispatch(
                  updateCalendarCost({
                    date,
                    id: id,
                    value: e.target.value,
                  }),
                );
              }}
            />
          </span>
        );
      })}
    </div>
  );
}
