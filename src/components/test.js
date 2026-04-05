import React, { useState, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import * as XLSX from 'xlsx';

// Column offsets for each time period block — labels read from the file at runtime
const PERIOD_STRUCTURE = [
  { labelCol: 9,  typeCol: 0,  cntCol: 3,  cprCol: 9,  cdrCol: 10 },
  { labelCol: 21, typeCol: 12, cntCol: 15, cprCol: 21, cdrCol: 22 },
  { labelCol: 33, typeCol: 24, cntCol: 27, cprCol: 33, cdrCol: 34 },
];

function buildPeriods(headerRow) {
  return PERIOD_STRUCTURE.map(p => ({
    ...p,
    label: headerRow[p.labelCol] || `Period ${p.labelCol}`,
  }));
}

const COUPON_BUCKETS = [
  2000,2250,2500,2750,3000,3250,3500,3750,4000,4250,
  4500,4750,5000,5250,5500,5750,6000,6250,6500,6750,
  7000,7250,7500,7750,8000,8250,8500,9000,20000,
];

const WAM_BUCKETS = [
  5,6,7,8,9,10,12,14,16,18,20,24,30,36,
  42,48,54,60,72,84,96,108,120,144,168,192,216,240,320,360,
];

const PROGRAMS = ['All','F','V','R','N'];

const styles = {
  wrapper: {
    overflowX: 'auto',
    fontFamily: 'Calibri, Arial, sans-serif',
    fontSize: '11px',
    padding: '10px',
  },
  controls: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginRight: '4px',
  },
  select: {
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  input: {
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '60px',
  },
  table: {
    borderCollapse: 'collapse',
    whiteSpace: 'nowrap',
  },
  th: {
    border: '1px solid #b0b0b0',
    padding: '2px 6px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: '36px',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  thRow: {
    border: '1px solid #b0b0b0',
    padding: '2px 6px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'right',
    position: 'sticky',
    left: 0,
    zIndex: 2,
  },
  td: {
    border: '1px solid #d0d0d0',
    padding: '2px 6px',
    textAlign: 'right',
  },
  tdRowHeader: {
    border: '1px solid #b0b0b0',
    padding: '2px 6px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'right',
    position: 'sticky',
    left: 0,
  },
  sectionHeader: {
    backgroundColor: '#dce6f1',
    fontWeight: 'bold',
    fontSize: '12px',
    padding: '4px 8px',
    marginTop: '16px',
    marginBottom: '4px',
    borderLeft: '4px solid #4472c4',
  },
};

function fmt(val) {
  if (val === null || val === undefined || val === '') return '--';
  const n = Number(val);
  if (isNaN(n) || n === 0) return '--';
  return n.toFixed(1);
}

function fmtCount(val) {
  if (!val || val === 0) return '--';
  return Math.round(val).toLocaleString();
}

function calculateGrid(data, program, report, period, minCount) {
  const metric = report === 'CPR' ? period.cprCol : period.cdrCol;

  // Build lookup: { coupon_wam: { totalCount, weightedSum } }
  const buckets = {};

  data.forEach(row => {
    const type = row[period.typeCol];
    const coupon = row[period.typeCol + 1];
    const wam = row[period.typeCol + 2];
    const count = row[period.cntCol] || 0;
    const value = row[metric];

    if (!coupon || !wam || value === '' || value === null) return;
    if (program !== 'All' && type !== program) return;

    const key = `${coupon}_${wam}`;
    if (!buckets[key]) buckets[key] = { totalCount: 0, weightedSum: 0 };
    buckets[key].totalCount += count;
    buckets[key].weightedSum += count * value;
  });

  // Build grid: coupon rows x WAM cols
  const grid = {};
  COUPON_BUCKETS.forEach(c => {
    grid[c] = {};
    WAM_BUCKETS.forEach(w => {
      const key = `${c}_${w}`;
      const b = buckets[key];
      if (!b || b.totalCount < minCount) {
        grid[c][w] = null;
      } else {
        grid[c][w] = (b.weightedSum / b.totalCount) * 100;
      }
    });
  });

  return grid;
}

function GridTable({ grid, changeGrid, countGrid }) {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Expected</th>
          {WAM_BUCKETS.map(w => (
            <th key={w} style={styles.th}>{w}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* CPR Section */}
        <tr>
          <td colSpan={WAM_BUCKETS.length + 1} style={styles.sectionHeader}>
            Expected CPR
          </td>
        </tr>
        {COUPON_BUCKETS.map((c, ci) => (
          <tr key={c} style={{ backgroundColor: ci % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
            <td style={styles.tdRowHeader}>{c}</td>
            {WAM_BUCKETS.map(w => (
              <td key={w} style={styles.td}>{fmt(grid[c][w])}</td>
            ))}
          </tr>
        ))}

        {/* Change Section */}
        {changeGrid && (
          <>
            <tr>
              <td colSpan={WAM_BUCKETS.length + 1} style={{ ...styles.sectionHeader, backgroundColor: '#fce4d6', borderColor: '#e36c09' }}>
                Expected Change (Red = Faster)
              </td>
            </tr>
            {COUPON_BUCKETS.map((c, ci) => (
              <tr key={c} style={{ backgroundColor: ci % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                <td style={styles.tdRowHeader}>{c}</td>
                {WAM_BUCKETS.map(w => {
                  const val = changeGrid[c][w];
                  return (
                    <td key={w} style={{ ...styles.td, color: val !== null && val > 0 ? 'red' : 'inherit' }}>
                      {fmt(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </>
        )}

        {/* Count Section */}
        {countGrid && (
          <>
            <tr>
              <td colSpan={WAM_BUCKETS.length + 1} style={{ ...styles.sectionHeader, backgroundColor: '#e2efda', borderColor: '#375623' }}>
                Loan Count
              </td>
            </tr>
            {COUPON_BUCKETS.map((c, ci) => (
              <tr key={c} style={{ backgroundColor: ci % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                <td style={styles.tdRowHeader}>{c}</td>
                {WAM_BUCKETS.map(w => (
                  <td key={w} style={styles.td}>{fmtCount(countGrid[c][w])}</td>
                ))}
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
}

function PoolTable() {
  const [rawData, setRawData] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [error, setError] = useState(null);
  const [program, setProgram] = useState('F');
  const [report, setReport] = useState('CPR');
  const [periodIdx, setPeriodIdx] = useState(0);
  const [minCount, setMinCount] = useState(100);
  const [minCountInput, setMinCountInput] = useState('100');

  useEffect(() => {
    fetch('/data/grid.xlsx')
      .then(res => {
        if (!res.ok) throw new Error(`Could not load file: ${res.status}`);
        return res.arrayBuffer();
      })
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const ws = workbook.Sheets['Grid Data'];
        const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
        setPeriods(buildPeriods(rows[1]));
        const data = rows.slice(3).filter(r => r[0] !== '');
        setRawData(data);
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>;
  if (!rawData || periods.length === 0) return <div style={{ padding: '20px' }}>Loading...</div>;

  const currentPeriod = periods[periodIdx];
  const actualPeriod = periods[periods.length - 1];

  // Main grid: selected period
  const grid = calculateGrid(rawData, program, report, currentPeriod, minCount);

  // Change grid: diff between selected period and last period (Actual)
  const actualGrid = periodIdx !== periods.length - 1
    ? calculateGrid(rawData, program, report, actualPeriod, minCount)
    : null;

  const changeGrid = actualGrid
    ? Object.fromEntries(COUPON_BUCKETS.map(c => [
        c,
        Object.fromEntries(WAM_BUCKETS.map(w => [
          w,
          grid[c][w] !== null && actualGrid[c][w] !== null
            ? grid[c][w] - actualGrid[c][w]
            : null
        ]))
      ]))
    : null;

  // Count grid
  const countGrid = Object.fromEntries(
    COUPON_BUCKETS.map(c => {
      const period = periods[periodIdx];
      const row = {};
      WAM_BUCKETS.forEach(w => {
        let total = 0;
        rawData.forEach(r => {
          const type = r[period.typeCol];
          const coupon = r[period.typeCol + 1];
          const wam = r[period.typeCol + 2];
          const count = r[period.cntCol] || 0;
          if (coupon === c && wam === w && (program === 'All' || type === program)) {
            total += count;
          }
        });
        row[w] = total >= minCount ? total : null;
      });
      return [c, row];
    })
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.controls}>
        <div>
          <span style={styles.label}>Program:</span>
          <select style={styles.select} value={program} onChange={e => setProgram(e.target.value)}>
            {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <span style={styles.label}>Report:</span>
          <select style={styles.select} value={report} onChange={e => setReport(e.target.value)}>
            <option value="CPR">CPR</option>
            <option value="CDR">CDR</option>
          </select>
        </div>
        <div>
          <span style={styles.label}>Period:</span>
          <select style={styles.select} value={periodIdx} onChange={e => setPeriodIdx(Number(e.target.value))}>
            {periods.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <span style={styles.label}>Min Count:</span>
          <input
            style={styles.input}
            type="text"
            value={minCountInput}
            onChange={e => {
              setMinCountInput(e.target.value);
              const n = parseInt(e.target.value);
              if (!isNaN(n)) setMinCount(n);
            }}
          />
        </div>
      </div>
      <GridTable
        grid={grid}
        changeGrid={changeGrid}
        countGrid={countGrid}
        minCount={minCount}
      />
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(PoolTable);
