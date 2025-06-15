import { useDispatch, useSelector } from 'react-redux';
import { selectCalendar } from '../reducers/calendarSlice';
import { useEffect, useState } from 'react';
import { selectCost } from '../reducers/costSlice';
import { CostHeadFields, CostHeadType } from '../types/cost';

export default function TotalCostRow() {
  const calendarDates = useSelector(selectCalendar);
  const costHeads = useSelector(selectCost);

  const [totalMap, setTotalMap] = useState<{ [key: string]: number }>({});
  const [totalBuilderMap, setTotalBuilderMap] = useState<{
    [key: string]: number;
  }>({});
  const [tdsMap, setTdsMap] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const costTds: { [key: string]: CostHeadType } = {};
    costHeads.forEach((cost) => {
      costTds[cost.id] = cost;
    });
    const dates = Object.keys(calendarDates);
    const localTotalMap: { [key: string]: number } = {};
    const localBuilderMap: { [key: string]: number } = {};
    const localTdsMap: { [key: string]: number } = {};
    dates.forEach((date) => {
      const dateCost = calendarDates[date];
      const [total, totalBuilder, totalTds] = Object.keys(dateCost).reduce(
        (sum, key) => {
          if (costTds[key]) {
            const tdsApplicable = costTds[key][CostHeadFields.TDS_APPLICABLE];
            const gst = costTds[key][CostHeadFields.GST];
            const value = dateCost[key];
            const valueWithoutGst = (+value * 100) / (100 + (gst || 0));
            const tds = tdsApplicable ? valueWithoutGst / 100 : 0;
            const remaining = +value - tds;

            return [sum[0] + +value, sum[1] + remaining, sum[2] + tds];
          }
          return sum;
        },
        [0, 0, 0],
      );
      localTotalMap[date] = total;
      localBuilderMap[date] = totalBuilder;
      localTdsMap[date] = totalTds;
    });
    setTotalMap(localTotalMap);
    setTotalBuilderMap(localBuilderMap);
    setTdsMap(localTdsMap);
  }, [calendarDates, costHeads]);

  return (
    <>
      <div className="costHeadRow">
        {Object.values(totalMap).map((total, idx) => (
          <span className="rowCell" key={idx}>
            {total.toFixed(2)}
          </span>
        ))}
      </div>
      <div className="costHeadRow">
        {Object.values(totalBuilderMap).map((total, idx) => (
          <span className="rowCell" key={idx}>
            {total.toFixed(2)}
          </span>
        ))}
      </div>
      <div className="costHeadRow">
        {Object.values(tdsMap).map((total, idx) => (
          <span className="rowCell" key={idx}>
            {total.toFixed(2)}
          </span>
        ))}
      </div>
    </>
  );
}
