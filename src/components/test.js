import React, { useState, useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';

const styles = {
  wrapper: {
    overflowX: 'auto',
    fontFamily: 'Calibri, Arial, sans-serif',
    fontSize: '11px',
    padding: '10px',
  },
  table: {
    borderCollapse: 'collapse',
    marginBottom: '24px',
    whiteSpace: 'nowrap',
  },
  th: {
    border: '1px solid #b0b0b0',
    padding: '2px 6px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: '36px',
  },
  td: {
    border: '1px solid #d0d0d0',
    padding: '2px 6px',
    textAlign: 'right',
  },
  tdHeader: {
    border: '1px solid #b0b0b0',
    padding: '2px 6px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: '13px',
    marginBottom: '4px',
  },
};

function fmt(val) {
  if (val === '' || val === '--' || val == null) return val;
  const n = Number(val);
  if (isNaN(n)) return val;
  if (n === 0) return '--';
  return n.toFixed(1);
}

// Build a Set of style indices that use a red font, by parsing styles.xml directly
async function buildRedStyleIds(zip) {
  const stylesFile = zip.file('xl/styles.xml');
  if (!stylesFile) return new Set();

  const xml = await stylesFile.async('text');
  const doc = new DOMParser().parseFromString(xml, 'application/xml');

  // Find which font indices are red
  const redFontIds = new Set();
  const fontNodes = doc.querySelectorAll('fonts > font');
  fontNodes.forEach((font, idx) => {
    const color = font.querySelector('color');
    if (!color) return;
    const rgb = (color.getAttribute('rgb') || '').toUpperCase();
    const indexed = color.getAttribute('indexed');
    if (rgb.includes('FF0000') || indexed === '10') {
      redFontIds.add(idx);
    }
  });

  // Find which cell style indices (xf) reference a red font
  const redStyleIds = new Set();
  const xfNodes = doc.querySelectorAll('cellXfs > xf');
  xfNodes.forEach((xf, idx) => {
    const fontId = parseInt(xf.getAttribute('fontId') || '0', 10);
    if (redFontIds.has(fontId)) {
      redStyleIds.add(idx);
    }
  });

  return redStyleIds;
}

// Parse a worksheet into a 2D array of { value, red }
// cell.s is the raw style index when cellStyles is NOT set
function parseSheet(ws, redStyleIds) {
  if (!ws || !ws['!ref']) return [];
  const range = XLSX.utils.decode_range(ws['!ref']);
  const rows = [];

  for (let r = range.s.r; r <= range.e.r; r++) {
    const row = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = ws[addr];
      const value = cell ? (cell.v != null ? cell.v : '') : '';
      const red = cell && cell.s !== undefined ? redStyleIds.has(cell.s) : false;
      row.push({ value, red });
    }
    rows.push(row);
  }
  return rows;
}

function SheetTable({ sheet }) {
  if (!sheet || sheet.length === 0) return null;

  const headerRow = sheet[0];
  const dataRows = sheet.slice(1);

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          {headerRow.map((cell, i) => (
            <th key={i} style={styles.th}>{cell.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataRows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => {
              const isRowHeader = ci === 0 || ci === 1;
              return (
                <td
                  key={ci}
                  style={{
                    ...(isRowHeader ? styles.tdHeader : styles.td),
                    color: cell.red ? 'red' : 'inherit',
                  }}
                >
                  {fmt(cell.value)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PoolTable() {
  const [sheets, setSheets] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/Book2.xlsx')
      .then(res => {
        if (!res.ok) throw new Error(`Could not load file: ${res.status}`);
        return res.arrayBuffer();
      })
      .then(async buffer => {
        const zip = await JSZip.loadAsync(buffer);
        const redStyleIds = await buildRedStyleIds(zip);

        // Read without cellStyles so cell.s remains the raw style index
        const workbook = XLSX.read(buffer, { type: 'array' });

        const parsed = workbook.SheetNames.map(name => ({
          name,
          data: parseSheet(workbook.Sheets[name], redStyleIds),
        }));

        setSheets(parsed);
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div style={{ color: 'red', padding: '20px' }}>Error: {error}</div>;
  if (!sheets) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={styles.wrapper}>
      {sheets.map(sheet => (
        <div key={sheet.name}>
          <div style={styles.sectionLabel}>{sheet.name}</div>
          <SheetTable sheet={sheet.data} />
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, null)(PoolTable);
